import React from 'react';
import Svg, {Line} from 'react-native-svg';

function BoldLines() {
  return (
    <Svg
      width="360"
      height="3"
      viewBox="0 0 360 3"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Line y1="1.5" x2="360" y2="1.5" stroke="#27374F" stroke-width="3" />
    </Svg>
  );
}

export default BoldLines;
