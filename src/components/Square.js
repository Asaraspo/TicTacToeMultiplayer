/**
 *
 * @props {bool} disabled, {function} clickHandler, {num} index, {string} state
 * @function used to create the squares of the board, a svg gets assigned dynamically
 */

import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import SVGX from "./SVGX";
import SVGO from "./SVGO";

const Square = (props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={props.disabled}
      style={styles.square}
      onPress={() => props.clickHandler(props.index)}
    >
      <View style={styles.view}>
        {!props.state ? null : props.state == "X" ? <SVGX /> : <SVGO />}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  square: {
    width: "29%",
    height: "29%",
    margin: "1.5%",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
  },
  view: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 40,
    color: "#000000",
  },
});

export default Square;
