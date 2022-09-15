import { ToastAndroid } from "react-native";
import {
  updateFirebase,
  readFirebase,
  writeFirebase,
  readCollection,
  queryFirebase,
  deleteFirebase,
} from "../../utils/firebase_utils";
import { nextId } from "../../utils/roomId_utils";

/**
 *
 * @param {string} roomID
 * @returns {bool} room is existing, {doc/null} document with that room id or null
 * @function determine wheter a room can be joined or data written to
 */
const checkExisting = async (roomID) => {
  const docSnap = await readFirebase(roomID);
  if (docSnap.exists()) {
    return [true, docSnap];
  } else {
    return [false, null];
  }
};

/**
 *
 * @param {navigation} navigation
 * @returns {null}
 * @function create rooms automatically with last roomID in firebase, instantiate the room
 */
const createRoom = async (navigation) => {
  let roomToCreate = nextId(await lastRoom());
  while (await checkExisting(roomToCreate)[0]) {
    roomToCreate = nextId(await lastRoom());
  }

  //TODO: check for randomnes
  let sign = "X";
  let list = ["X", "O"].sort(() => Math.random() - 0.5);
  const payload = {
    created: Date.now(),
    current: list[1],
    full: false,
    lastInteraction: "",
    getWinner: false,
    next: list[0],
    playerNum: 1,
    round: 0,
    state: ["", "", "", "", "", "", "", "", ""],
    winner: "",
    signInGame: [sign],
  };

  writeFirebase(roomToCreate, payload);

  navigation.navigate("GameScreen", {
    roomID: roomToCreate,
    sign: sign,
    creator: true,
    getWinner: false,
  });
};

/**
 *
 * @param {string} roomID, {navigation} navigation
 * @returns {null}
 * @function join room with id and update firebase, checks for existance
 */
const joinRoom = async (roomID, navigation) => {
  if (roomID == "" || roomID.length < 5) {
    return;
  }

  const [exists, docSnap] = await checkExisting(roomID);

  if (!exists) {
    /* Snackbar.show({
      text: `Room does not exist. ${"\n"}Try another ID or create a Room.`,
      duration: Snackbar.LENGTH_SHORT,
    }); */
    return `Room does not exist. ${"\n"}Try another ID or create a Room.`;
  }

  if (docSnap.data().playerNum >= 2) {
    /* Snackbar.show({
      text: `Room already full. ${"\n"}Try another ID or create a Room.`,
      duration: Snackbar.LENGTH_SHORT,
    }); */
    return `Room already full. ${"\n"}Try another ID or create a Room.`;
  }

  const signInGame = docSnap.data().signInGame;
  const sign = signInGame[0] == "X" ? "O" : "X";
  const payload = {
    full: true,
    playerNum: 2,
    lastInteraction: Date.now(),
    state: ["", "", "", "", "", "", "", "", ""],
    signInGame: [...signInGame, sign],
  };

  updateFirebase(roomID, payload);

  navigation.navigate("GameScreen", {
    roomID: roomID,
    sign: sign,
    creator: false,
  });
};

/**
 *
 * @param {}
 * @returns {string}
 * @function get last element of collection to increment it and return a new room
 */
const lastRoom = async () => {
  try {
    const querySnapshot = await readCollection("rooms");
    return querySnapshot.docs[querySnapshot.size - 1]?.id;
  } catch (e) {
    console.log(e);
  }
};

const cleanDatabase = async () => {
  const expiredTimestamp = Date.now() - 21600000;
  const querySnapshot = await queryFirebase(
    "rooms",
    "created",
    "<",
    expiredTimestamp
  );
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    deleteFirebase(doc.id);
  });
};

export { joinRoom, createRoom, cleanDatabase };
