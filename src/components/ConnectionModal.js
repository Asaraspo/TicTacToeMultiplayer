/**
 *
 * @props {bool} modalVisible, {function} tryAgain
 * @function displayed when only one player is in the room, or only one player has restartet so far
 * @function creator detects whether the player is the first in the room
 */

import { StyleSheet, View, Modal, Text, SafeAreaView } from "react-native";

import ButtonCustom from "./ButtonCustom";

const ConnectionModal = (props) => {
  return (
    <Modal
      transparent={true}
      visible={props.modalVisible}
      /* onRequestClose={() => {
        props.setModalVisible(false);
      }} */
    >
      <SafeAreaView style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.h1}>No Connection</Text>
          <Text style={styles.text}>
            Please check your internet connection and try again.
          </Text>
          <ButtonCustom
            onPress={() => {
              props.tryAgain();
            }}
            text={"Try Again"}
            buttonStyle={styles.button}
            textStyle={styles.textButton}
          />
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  modalView: {
    borderColor: "#DADDFC",
    borderWidth: 10,
    margin: 10,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 15,
    alignItems: "center",
    justifyContent: "space-evenly",
    width: "90%",
  },
  h1: {
    fontSize: 35,
    fontWeight: "700",
    lineHeight: 48,
    textAlign: "center",
    color: "#274261",
    marginVertical: 10,
  },
  h2: {
    fontSize: 24,
    fontWeight: "600",
    color: "#274261",
    textAlign: "center",
    lineHeight: 28,
    marginVertical: 10,
  },
  text: {
    fontSize: 15,
    fontWeight: "500",
    color: "#274261",
    textAlign: "center",
    lineHeight: 20,
    marginVertical: 10,
  },
  button: {
    width: "90%",
    backgroundColor: "#FFFFFF",
    borderColor: "#274261",
    borderWidth: 3,
    marginVertical: 10,
  },
  textButton: {
    color: "#274261",
  },
});

export default ConnectionModal;
