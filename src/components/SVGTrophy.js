import Svg, { Path, Line, Circle } from "react-native-svg";

const SVGTrophy = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    className="icon icon-tabler icon-tabler-trophy"
    width={60}
    height={60}
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="#274261"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <Path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <Line x1={8} y1={21} x2={16} y2={21} />
    <Line x1={12} y1={17} x2={12} y2={21} />
    <Line x1={7} y1={4} x2={17} y2={4} />
    <Path d="M17 4v8a5 5 0 0 1 -10 0v-8" />
    <Circle cx={5} cy={9} r={2} />
    <Circle cx={19} cy={9} r={2} />
  </Svg>
);

export default SVGTrophy;
