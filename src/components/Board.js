/**
 *
 * @props {array} state, {function} clickHandler, {bool} disabled
 * @function container for every square
 */

import { StyleSheet, View, Dimensions } from "react-native";
import Square from "./Square";

const Board = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.board}>
        <Square
          state={props.state[0]}
          clickHandler={props.clickHandler}
          index={0}
          disabled={props.disabled[0]}
        />
        <Square
          state={props.state[1]}
          clickHandler={props.clickHandler}
          index={1}
          disabled={props.disabled[1]}
        />
        <Square
          state={props.state[2]}
          clickHandler={props.clickHandler}
          index={2}
          disabled={props.disabled[2]}
        />
        <Square
          state={props.state[3]}
          clickHandler={props.clickHandler}
          index={3}
          disabled={props.disabled[3]}
        />
        <Square
          state={props.state[4]}
          clickHandler={props.clickHandler}
          index={4}
          disabled={props.disabled[4]}
        />
        <Square
          state={props.state[5]}
          clickHandler={props.clickHandler}
          index={5}
          disabled={props.disabled[5]}
        />
        <Square
          state={props.state[6]}
          clickHandler={props.clickHandler}
          index={6}
          disabled={props.disabled[6]}
        />
        <Square
          state={props.state[7]}
          clickHandler={props.clickHandler}
          index={7}
          disabled={props.disabled[7]}
        />
        <Square
          state={props.state[8]}
          clickHandler={props.clickHandler}
          index={8}
          disabled={props.disabled[8]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("window").width * 0.8,
    height: Dimensions.get("window").width * 0.8,
  },
  board: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    flexDirection: "row",
  },
});

export default Board;
