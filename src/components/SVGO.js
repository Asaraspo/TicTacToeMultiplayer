import React from "react";
import Svg, { Path, Circle } from "react-native-svg";

const SVGO = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    className="icon icon-tabler icon-tabler-circle"
    width={60}
    height={60}
    viewBox="0 0 24 24"
    strokeWidth={5}
    stroke="#396EB0"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <Path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <Circle cx={12} cy={12} r={9} />
  </Svg>
);

export default SVGO;
