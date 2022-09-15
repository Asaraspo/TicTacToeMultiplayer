import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
} from "react-native";
import { useState, useEffect } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/firebase";

import Board from "../../components/Board";
import WinnerModal from "../../components/WinnerModal";
import RoomModal from "../../components/RoomModal";
import ConnectionModal from "../../components/ConnectionModal";
import PlayerTile from "../../components/PlayerTile";
import SVGX from "../../components/SVGX";

import { checkWinner } from "./game_utils";
import {
  deleteFirebase,
  readFirebase,
  updateFirebase,
} from "../../utils/firebase_utils";

import NetInfo from "@react-native-community/netinfo";

export default function App({ route, navigation }) {
  const { roomID, sign } = route.params;
  const [creator, setCreator] = useState(route.params.creator);
  const [roomModalVisible, setRoomModalVisible] = useState(true);
  const [winnerModalVisible, setWinnerModalVisible] = useState(false);
  const [state, setState] = useState(["", "", "", "", "", "", "", "", ""]);
  const [full, setFull] = useState(false);
  const [current, setCurrent] = useState();
  const [next, setNext] = useState();
  const [running, setRunning] = useState(false);
  const [round, setRound] = useState(0);
  const [winner, setWinner] = useState(undefined);
  const [displayWinner, setDisplayWinner] = useState(undefined);
  const [playerNum, setPlayerNum] = useState(0);
  const [lastInteraction, setLastInteraction] = useState("");
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [countdownInterval, setCountdownInterval] = useState();
  const [getWinner, setGetWinner] = useState(false);
  const [signInGame, setSignInGame] = useState([]);
  const turnTime = 15000;

  const [isLLoading, setIsLLoading] = useState(false);
  const [isRLoading, setIsRLoading] = useState(false);
  const [lDisabled, setLDisabled] = useState(false);
  const [rDisabled, setRDisabled] = useState(false);

  const [isConnected, setIsConnected] = useState(true);
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      const online = state.isConnected && state.isInternetReachable;
      setIsConnected(online);
    });

    return () => unsubscribe();
  }, []);
  const tryAgain = () => {
    setIsConnected(false);
  };

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "rooms", roomID), (doc) => {
      //console.log("Snapshot data: ", doc.data());
      let data = doc.data();
      if (data) {
        setState(data.state);
        setRound(data.round);
        setCurrent(data.current);
        setNext(data.next);
        setPlayerNum(data.playerNum);
        setLastInteraction(data.lastInteraction);
        setGetWinner(data.getWinner);
        setFull(data.full);
        setSignInGame(data.signInGame);
      }
    });

    return () => unsub();
  }, []);

  /**
   *
   * @function listens for state changes to detect a winner, winner gets written to firebase
   */
  useEffect(async () => {
    let mounted = true;
    if (mounted && state) {
      setWinner(checkWinner(state));
      if (winner) {
        const payload = { winner: winner };
        updateFirebase(roomID, payload);
      }
    }
    return () => (mounted = false);
  }, [state]);

  useEffect(() => {
    let mounted = true;
    if (winner && mounted) {
      setRunning(false);
      setWinnerModalVisible(true);
    }
    return () => (mounted = false);
  }, [winner]);

  useEffect(() => {
    let mounted = true;
    if (round >= 9 && mounted) {
      setRunning(false);
      setWinnerModalVisible(true);
    }
    return () => (mounted = false);
  }, [round]);

  /**
   *
   * @function detect changes of player number to start the game
   */
  useEffect(() => {
    let mounted = true;
    if (playerNum == 2 && round < 9 && !winner && mounted) {
      setRunning(true);
      //TODO: Maybe change condition of modal to less than 2 players, so that even the joining player can get the modal if there are less than 2 players in room
      setRoomModalVisible(false);
    }
    return () => (mounted = false);
  }, [playerNum]);

  useEffect(() => {
    clearInterval(countdownInterval);
    if (lastInteraction != "" && running) {
      const intervalId = setInterval(() => {
        countdown();
      }, 1000);
      setCountdownInterval(intervalId);
    }
    return () => {
      clearInterval(countdownInterval);
    };
  }, [lastInteraction, running]);

  /**
   *
   * @function helper function to stop any winner updates from firebase, used to display correct winner even on restart or leave
   */
  useEffect(async () => {
    if (getWinner) {
      const docSnap = await readFirebase(roomID);
      if (docSnap.exists()) {
        setWinner(docSnap.data().winner);
        setDisplayWinner(
          docSnap.data().winner == sign ? "You won" : "You lost"
        );
      }
    }
  }, [getWinner]);

  const changeUser = () => {
    setNext(next == "X" ? "O" : "X");
    setCurrent(current == "X" ? "O" : "X");
  };

  const toggleLoading = (type, i) => {
    if (type == "restart" && i == 0) {
      setIsRLoading(true);
      setRDisabled(true);
    }
    if (type == "restart" && i == 1) {
      setIsRLoading(false);
      setRDisabled(false);
    }
    if (type == "leave" && i == 0) {
      setIsLLoading(true);
      setLDisabled(true);
    }
    if (type == "leave" && i == 1) {
      setIsLLoading(false);
      setLDisabled(false);
    }
  };

  /**
   *
   * @param {}
   * @returns {}
   * @function countdown to prevent idling, on countdown end: player loses and firebase gets updated
   */
  const countdown = async () => {
    let timeLeft;
    if (round === 0) {
      timeLeft = lastInteraction + turnTime * 2 - Date.now();
    } else {
      timeLeft = lastInteraction + turnTime - Date.now();
    }
    timeLeft = timeLeft < 0 ? 0 : timeLeft;
    setTimeRemaining(timeLeft);
    if (timeLeft <= 0) {
      clearInterval(countdownInterval);
      if (next == sign) {
        const payload = {
          winner: sign == "X" ? "O" : "X",
          getWinner: true,
        };
        updateFirebase(roomID, payload);
      }
    }
  };

  /**
   *
   * @param {num} index
   * @returns {}
   * @function handles tic tac toe interactions
   */
  const clickHandler = (index) => {
    clearInterval(countdownInterval);
    if (running) {
      let newState = [...state];
      newState[index] = next;
      changeUser();
      const payload = {
        state: newState,
        next: current,
        current: next,
        round: round + 1,
        lastInteraction: Date.now(),
      };
      updateFirebase(roomID, payload);
      setState(newState);
      setRound(round + 1);
    }
  };

  /**
   *
   * @param {}
   * @returns {}
   * @function handles game leaving, updates firebase to keep track of players in a room
   */
  const leaveGame = async () => {
    if (full) {
      let payload = {
        full: false,
        signInGame: signInGame.filter((item) => item != sign),
      };
      if (!winner && running) {
        payload.winner = sign == "X" ? "O" : "X";
        payload.getWinner = true;
      }
      updateFirebase(roomID, payload);
      navigation.navigate("LobbyScreen");
    } else {
      deleteFirebase(roomID);
      navigation.navigate("LobbyScreen");
    }
  };

  /**
   *
   * @param {}
   * @returns {}
   * @function handles restarting of game, first player to restart gets the waiting modal, both players update state
   */
  const resetGame = async () => {
    setCreator(false);
    setWinnerModalVisible(false);
    setDisplayWinner(undefined);
    const list = ["X", "O"].sort(() => Math.random() - 0.5);
    let payload = {
      state: ["", "", "", "", "", "", "", "", ""],
      round: 0,
      current: list[1],
      next: list[0],
      winner: "",
      getWinner: false,
      lastInteraction: Date.now(),
      playerNum: 2,
    };
    if (playerNum == 2) {
      payload.lastInteraction = "";
      payload.playerNum = 1;
      payload.getWinner = false;
      delete payload.state;
      delete payload.getWinner;
      setCreator(true);
      setRoomModalVisible(true);
    }
    updateFirebase(roomID, payload);
    setWinnerModalVisible(false);
  };

  return (
    <ImageBackground
      source={require("../../assets/GameBackgroundPatternGradient.png")}
      style={{
        flex: 1,
        width: "100%",
        height: "100%",
        backgroundColor: "#274261",
      }}
    >
      <SafeAreaView style={styles.container}>
        <RoomModal
          roomID={roomID}
          modalVisible={roomModalVisible}
          creator={creator}
          setModalVisible={(value) => setRoomModalVisible(value)}
          leaveGame={leaveGame}
          toggleLoading={toggleLoading}
          isLoading={isLLoading}
          isDisabled={lDisabled}
        />
        <WinnerModal
          modalVisible={winnerModalVisible}
          setModalVisible={setWinnerModalVisible}
          winner={
            displayWinner
              ? displayWinner
              : !winner
              ? "It's a tie"
              : winner == sign
              ? "You won"
              : "You lost"
          }
          leaveGame={leaveGame}
          resetGame={resetGame}
          toggleLoading={toggleLoading}
          isLLoading={isLLoading}
          isRLoading={isRLoading}
          lDisabled={lDisabled}
          rDisabled={rDisabled}
        />
        <ConnectionModal modalVisible={!isConnected} tryAgain={tryAgain} />
        <View style={styles.topContainer}>
          <View style={styles.leave}>
            <TouchableOpacity
              onPress={() => {
                leaveGame();
              }}
            >
              <SVGX stroke="#FFFFFF" width={50} height={50} strokeWidth={4} />
            </TouchableOpacity>
            <Text style={styles.playerNum}>Room ID: {roomID}</Text>
            <View style={{ width: 50, height: 50 }}></View>
          </View>
        </View>
        <View style={styles.playerContainer}>
          <PlayerTile sign={sign} next={next} text={"You"} turn={"Your turn"} />
          <Text style={styles.text}>
            {running ? Math.round(timeRemaining / 1000) : null}
          </Text>
          <PlayerTile
            sign={sign == "X" ? "O" : "X"}
            next={next}
            text={"Enemy"}
            turn={"Enemys turn"}
          />
        </View>
        <View style={styles.gameContainer}>
          <Board
            state={state}
            clickHandler={clickHandler}
            disabled={state.map((cur) => {
              if (!running || next != sign) {
                return true;
              }
              return cur !== "";
            })}
          />
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 20,
    paddingTop: 20,
    justifyContent: "space-around",
    alignItems: "center",
    color: "#FFFFFF",
  },
  playerContainer: {
    flex: 7,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "80%",
  },
  gameContainer: {
    flex: 9,
    width: "80%",
  },
  topContainer: {
    flex: 2,
    width: "90%",
    marginTop: "5%",
  },
  h2: {
    fontSize: 24,
    fontWeight: "700",
    color: "#274261",
    textAlign: "center",
    lineHeight: 28,
  },
  text: {
    fontSize: 15,
    fontWeight: "500",
    color: "#FFFFFF",
    textAlign: "center",
    lineHeight: 28,
  },
  textDisabled: {
    fontSize: 15,
    fontWeight: "500",
    color: "transparent",
    textAlign: "center",
    lineHeight: 28,
  },
  playerTile: {
    width: "40%",
    justifyContent: "center",
    alignItems: "center",
  },
  player: {
    textAlign: "center",
    width: "80%",
    height: 120,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 10,
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginBottom: 20,
  },
  sign: {
    fontSize: 60,
  },
  leave: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  playerNum: {
    width: "70%",
    fontSize: 25,
    color: "#FFFFFF",
    textAlign: "center",
  },
});
