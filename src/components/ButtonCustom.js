/**
 *
 * @props {string} text, {function} onPress, {style} buttonStyle, {style} textStyle, {bool} isDisabled, {bool} isLoading
 * @function custom button component
 */

import {
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

const ButtonCustom = (props) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        props.buttonStyle,
        props.isDisabled && !props.isLoading ? styles.buttonDisabled : null,
      ]}
      onPress={() => {
        props.onPress();
      }}
      disabled={props.isDisabled}
    >
      {props.isLoading && <ActivityIndicator size="large" color="#FFFFFF" />}
      <Text style={[styles.text, props.textStyle]}>{props.text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
    height: 50,
    backgroundColor: "#FC997C",
  },
  buttonDisabled: {
    backgroundColor: "#C6C9D7",
  },
  text: {
    fontSize: 15,
    fontWeight: "700",
    color: "#FFFFFF",
    textAlign: "center",
    lineHeight: 28,
  },
});

export default ButtonCustom;
