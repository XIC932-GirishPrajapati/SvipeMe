import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import Color from '../../Constants/Color';

const CustomSubmitButton = props => {
  let showText = props.title;
  if (props.isLoading) {
    showText = <ActivityIndicator size="small" color={Color.white} />;
  }
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      disabled={props.disable}
      style={!props.disable ? styles.buttonStyle : styles.buttonStyleDisable}
      onPress={props.onClick}>
      <Text style={styles.text}>{showText}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  buttonStyle: {
    paddingVertical: 10,
    width: '95%',
    backgroundColor: Color.primary,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Color.primary,
    alignItems: 'center',
  },
  buttonStyleDisable: {
    paddingVertical: 10,
    width: '95%',
    backgroundColor: Color.grey,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Color.primary,
    alignItems: 'center',
  },
  text: {
    color: Color.white,
    fontWeight: '700',
  },
});

export default CustomSubmitButton;
