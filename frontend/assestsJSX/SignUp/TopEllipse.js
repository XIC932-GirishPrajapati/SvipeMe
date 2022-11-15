import React from 'react';
import Svg, {Circle} from 'react-native-svg';

function TopEllipse(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="207"
      height="145"
      fill="none"
      viewBox="0 0 207 145">
      <Circle
        cx="144.5"
        cy="0.5"
        r="144.5"
        fill={props.forgot ? '#c0d4f0' : '#0B449A'}></Circle>
    </Svg>
  );
}

export default TopEllipse;
