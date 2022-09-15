/**
 *
 * @props {navigation} navigation
 * @to GameScreen
 * @from GameScreen
 * @function Join and Create Lobby
 */

import { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  ImageBackground,
} from "react-native";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import ButtonCustom from "../../components/ButtonCustom";
import ConnectionModal from "../../components/ConnectionModal";
import SVGLogo from "../../components/SVGLogo";

import { scale } from "../../utils/scaling_utils";
import { joinRoom, createRoom, cleanDatabase } from "./lobby_utils";

import NetInfo from "@react-native-community/netinfo";
import Snackbar from "react-native-snackbar-component";

const LobbyScreen = ({ navigation }) => {
  const [roomID, setRoomID] = useState("");
  const [isCLoading, setIsCLoading] = useState(false);
  const [isJLoading, setIsJLoading] = useState(false);
  const [cDisabled, setCDisabled] = useState(false);
  const [jDisabled, setJDisabled] = useState(true);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarText, setSnackbarText] = useState("");

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
    if (roomID.length >= 5) {
      setJDisabled(false);
    } else {
      setJDisabled(true);
    }
  }, [roomID]);

  const toggleLoading = (type, i) => {
    if (type == "join" && i == 0) {
      setIsJLoading(true);
      setJDisabled(true);
    }
    if (type == "join" && i == 1) {
      setIsJLoading(false);
      setJDisabled(false);
    }
    if (type == "create" && i == 0) {
      setIsCLoading(true);
      setCDisabled(true);
    }
    if (type == "create" && i == 1) {
      setIsCLoading(false);
      setCDisabled(false);
    }
  };

  const joinRoomHandler = async () => {
    toggleLoading("join", 0);
    const i = await joinRoom(roomID, navigation);
    if (i) {
      setSnackbarText(i);
      setSnackbarVisible(true);
      setTimeout(() => {
        setSnackbarVisible(false);
      }, 1500);
    }
    toggleLoading("join", 1);
    setRoomID("");
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <Snackbar
        visible={snackbarVisible}
        textMessage={snackbarText}
        backgroundColor="#EDEDED"
        messageColor="#000000"
      />
      <ImageBackground
        source={require("../../assets/StartBackgroundPatternGradient.png")}
        style={styles.backgroundImage}
      >
        <ConnectionModal modalVisible={!isConnected} tryAgain={tryAgain} />
        <View style={styles.container1}>
          <View style={styles.icon}>
            <SVGLogo />
          </View>
          <Text style={styles.h1}>Tic Tac Toe</Text>
          <Text style={styles.h2}>
            Play Tic Tac Toe online together with your freinds.
          </Text>
        </View>
        <View style={styles.ellipse}></View>
        <View style={styles.container2}>
          <Text style={styles.text}>
            Create a game room or join an existing room with your friends lobby
            id.
          </Text>
          <ButtonCustom
            onPress={async () => {
              joinRoomHandler();
            }}
            text={"Join Game"}
            isLoading={isJLoading}
            isDisabled={jDisabled}
          />
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Lobby ID</Text>
            <TextInput
              placeholder="e.g G23A2"
              placeholderTextColor="#C9C9D7"
              maxLength={5}
              value={roomID}
              style={styles.input}
              onChangeText={(value) => {
                setRoomID(value);
              }}
            />
          </View>
          <View style={styles.line}></View>
          <ButtonCustom
            onPress={async () => {
              toggleLoading("create", 0);
              await cleanDatabase();
              await createRoom(navigation);
              toggleLoading("create", 1);
              setRoomID("");
            }}
            text={"+ Create Room"}
            isLoading={isCLoading}
            isDisabled={cDisabled}
          />
        </View>
      </ImageBackground>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#DADDFC",
  },
  container1: {
    width: "100%",
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  container2: {
    width: "100%",
    backgroundColor: "#274261",
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    width: 85,
    height: 85,
    borderRadius: 42.5,
    backgroundColor: "#274261",
  },
  ellipse: {
    width: 100,
    height: 50,
    borderTopEndRadius: 100,
    borderTopStartRadius: 100,
    backgroundColor: "#274261",
    transform: [{ scaleX: scale(3.6) }],
  },
  button: {
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
    height: 50,
    backgroundColor: "#FC997C",
  },
  inputContainer: {
    width: "80%",
    height: 50,
  },
  input: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 15,
    textAlign: "center",
    borderColor: "#DADDFC",
    color: "#C9C9D7",
  },
  inputLabel: {
    marginTop: "-6%",
    top: 10,
    marginRight: "70%",
    marginLeft: "5%",
    width: "auto",
    color: "#FFFFFF",
    backgroundColor: "#274261",
    zIndex: 1,
    fontWeight: "700",
    textAlign: "center",
  },
  h1: {
    fontSize: 42,
    fontWeight: "700",
    color: "#274261",
  },
  h2: {
    fontSize: 24,
    fontWeight: "700",
    color: "#274261",
    textAlign: "center",
    width: "90%",
    lineHeight: 28,
  },
  text: {
    fontSize: 15,
    fontWeight: "500",
    color: "#FFFFFF",
    textAlign: "center",
    width: "80%",
    lineHeight: 28,
  },
  line: {
    height: 1,
    backgroundColor: "#DADDFC",
    width: "80%",
  },
});

export default LobbyScreen;
