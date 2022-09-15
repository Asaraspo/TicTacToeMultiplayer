import * as React from "react";
import Svg, { Circle, Line } from "react-native-svg";

const SVGLogo = (props) => (
  <Svg
    width={85}
    height={85}
    viewBox="0 0 85 85"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Circle cx={42.5} cy={42.5} r={42.5} fill="#274261" />
    <Line
      x1={47.6096}
      y1={36.2055}
      x2={62.4436}
      y2={21.3714}
      stroke="#FC997C"
      strokeWidth={5}
      strokeLinecap="round"
    />
    <Line
      x1={47.7451}
      y1={21.3715}
      x2={62.5792}
      y2={36.2055}
      stroke="#FC997C"
      strokeWidth={5}
      strokeLinecap="round"
    />
    <Circle
      cx={29.6381}
      cy={28.6571}
      r={8.67143}
      stroke="#DADDFC"
      strokeWidth={5}
    />
    <Line
      x1={36.8268}
      y1={48.3748}
      x2={21.9927}
      y2={63.2089}
      stroke="#FC997C"
      strokeWidth={5}
      strokeLinecap="round"
    />
    <Line
      x1={36.6912}
      y1={63.2089}
      x2={21.8571}
      y2={48.3748}
      stroke="#FC997C"
      strokeWidth={5}
      strokeLinecap="round"
    />
    <Circle
      cx={54.8076}
      cy={55.7926}
      r={8.67143}
      transform="rotate(180 54.8076 55.7926)"
      stroke="#DADDFC"
      strokeWidth={5}
    />
  </Svg>
);

export default SVGLogo;
