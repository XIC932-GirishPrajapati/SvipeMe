import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const BoxIcon = props => (
  <Svg
    width={25}
    height={22}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="M15.625 14.844c0 .431-.35.781-.781.781h-4.688a.781.781 0 0 1-.781-.781V12.5H0v7.031c0 1.25 1.094 2.344 2.344 2.344h20.312c1.25 0 2.344-1.094 2.344-2.344V12.5h-9.375v2.344Zm7.031-10.156H18.75V2.344C18.75 1.094 17.656 0 16.406 0H8.594C7.344 0 6.25 1.094 6.25 2.344v2.344H2.344C1.094 4.688 0 5.78 0 7.03v3.907h25V7.03c0-1.25-1.094-2.343-2.344-2.343Zm-7.031 0h-6.25V3.125h6.25v1.563Z"
      fill="#fff"
    />
  </Svg>
);

export default BoxIcon;
