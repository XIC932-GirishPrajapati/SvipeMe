/** @format */

import React from 'react';
import {View, StyleSheet} from 'react-native';
import Color from '../../Constants/Color';

function CustomButton(props) {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      style={styles.CustomButtonStyle}
      onPress={props.onClick}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  CustomButtonStyle: {
    paddingVertical: 10,
    width: '95%',
    backgroundColor: '#0B449A',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#0B449A',
    alignItems: 'center',
  },
  text: {
    color: 'red',
    fontWeight: '600',
  },
});
export default CustomButton;
