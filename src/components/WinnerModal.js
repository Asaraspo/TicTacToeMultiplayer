/**
 *
 * @props {bool} modalVisible, {function} setModalVisible, {function} leaveGame, {function} resetGame, {string} winner
 * @function gets displayed on game over, displayes winner
 */

import {
  StyleSheet,
  View,
  Modal,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";

import ButtonCustom from "./ButtonCustom";
import SVGTrophy from "./SVGTrophy";

const WinnerModal = (props) => {
  return (
    <Modal
      transparent={true}
      visible={props.modalVisible}
      onRequestClose={() => {
        props.setModalVisible(false);
      }}
    >
      <SafeAreaView style={styles.savModal}>
        <View style={styles.modalView}>
          <View style={styles.icon}>
            <SVGTrophy />
          </View>
          <Text style={styles.modalText}>{props.winner}</Text>
          <View style={styles.buttonContainer}>
            <ButtonCustom
              onPress={async () => {
                props.toggleLoading("leave", 0);
                await props.leaveGame();
                props.toggleLoading("leave", 1);
              }}
              text={"Leave"}
              buttonStyle={styles.buttonNotFilled}
              textStyle={styles.textNotFilled}
              isLoading={props.isLLoading}
              isDisabled={props.lDisabled}
            />
            <ButtonCustom
              onPress={async () => {
                props.toggleLoading("restart", 0);
                await props.resetGame();
                props.toggleLoading("restart", 1);
              }}
              text={"Rematch"}
              buttonStyle={styles.buttonFilled}
              isLoading={props.isRLoading}
              isDisabled={props.rDisabled}
            />
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  savModal: {
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
  icon: {
    width: 85,
    height: 85,
    borderRadius: 42.5,
    backgroundColor: "#FC997C",
    marginTop: -50,
    justifyContent: "center",
    alignItems: "center",
  },
  modalText: {
    fontSize: 50,
    fontWeight: "700",
    textAlign: "center",
    marginVertical: 40,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
  },
  buttonFilled: {
    width: "40%",
    backgroundColor: "#274261",
  },
  buttonNotFilled: {
    borderColor: "#274261",
    backgroundColor: "#FFFFFF",
    width: "40%",
    borderWidth: 3,
  },
  textNotFilled: {
    color: "#274261",
  },
});

export default WinnerModal;
