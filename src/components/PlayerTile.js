/**
 *
 * @props {string} sign, {string} text, {string} next, {string} turn
 * @function used to display sign of player and whos turn it is
 */

import { View, Text, StyleSheet } from "react-native";
import SVGX from "./SVGX";
import SVGO from "./SVGO";

import { scale } from "../utils/scaling_utils";

const PlayerTile = (props) => {
  return (
    <View style={styles.playerTile}>
      <View style={styles.player}>
        <Text style={styles.h2}>{props.text}</Text>
        {props.sign == "X" ? <SVGX /> : <SVGO />}
      </View>
      {props.sign == props.next ? (
        <Text style={styles.text}>{props.turn}</Text>
      ) : (
        <Text style={styles.textDisabled}>{props.turn}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
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
  h2: {
    fontSize: scale(20),
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
});

export default PlayerTile;
