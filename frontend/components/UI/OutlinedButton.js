/** @format */

import React from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';
function OutLinedButton(props) {
  return (
    <TouchableOpacity
      style={{...props.style, ...styles.outLinedButton}}
      onPress={props.onClick}>
      <Text style={styles.text}>{props.title}</Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  outLinedButton: {
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'black',
    alignItems: 'center',
  },
  text: {
    color: 'black',
    fontWeight: '700',
  },
});
export default OutLinedButton;
