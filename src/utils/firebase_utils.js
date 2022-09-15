import { db } from "../firebase/firebase";
import {
  doc,
  setDoc,
  updateDoc,
  getDoc,
  deleteDoc,
  getDocs,
  collection,
  query,
  where,
} from "firebase/firestore";

/**
 *
 * @param {string} roomToCreate, {Object} payload
 * @returns {}
 * @function firebase setDoc
 */
const writeFirebase = async (roomToCreate, payload) => {
  try {
    const roomRef = doc(db, "rooms", roomToCreate);
    await setDoc(roomRef, payload);
  } catch (e) {
    console.log("Error writing document: " + e);
  }
};

/**
 *
 * @param {string} roomID, {Object} payload
 * @returns {}
 * @function firebase updateDoc
 */
const updateFirebase = async (roomID, payload) => {
  try {
    const roomRef = doc(db, "rooms", roomID);
    await updateDoc(roomRef, payload, { merge: true });
    //console.log("Document written with ID: ", roomID);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

/**
 *
 * @param {string} roomID
 * @returns {docSnap} firebase document
 * @function firebase getDoc
 */
const readFirebase = async (roomID) => {
  try {
    const roomRef = doc(db, "rooms", roomID);
    const docSnap = await getDoc(roomRef);
    //console.log(docSnap.data(), roomID);
    return docSnap;
  } catch (e) {
    console.log("Error adding document", e);
  }
};

/**
 *
 * @param {string} roomID
 * @returns {}
 * @function firebase deleteDoc
 */
const deleteFirebase = async (roomID) => {
  try {
    const roomRef = doc(db, "rooms", roomID);
    await deleteDoc(roomRef);
    //console.log("Document written with ID: ", roomID);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

/**
 *
 * @param {string} name
 * @returns {collection} firebase collection
 * @function firebase getDocs (get whole collection)
 */
const readCollection = async (name) => {
  try {
    const querySnapshot = await getDocs(collection(db, name));
    return querySnapshot;
  } catch (e) {
    console.log(e);
  }
};

const queryFirebase = async (name, conName, conOperator, conValue) => {
  try {
    const q = query(
      collection(db, name),
      where(conName, conOperator, conValue)
    );
    return await getDocs(q);
  } catch (e) {
    console.log(e);
  }
};

export {
  writeFirebase,
  updateFirebase,
  readFirebase,
  deleteFirebase,
  readCollection,
  queryFirebase,
};
