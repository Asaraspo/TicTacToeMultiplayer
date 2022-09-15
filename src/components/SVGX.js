import React from "react";
import Svg, { Path, Line } from "react-native-svg";

const SVGX = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    className="icon icon-tabler icon-tabler-x"
    width={60}
    height={60}
    viewBox="0 0 24 24"
    strokeWidth={5}
    stroke="#FC997C"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <Path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <Line x1={18} y1={6} x2={6} y2={18} />
    <Line x1={6} y1={6} x2={18} y2={18} />
  </Svg>
);

export default SVGX;
