/** @format */

import React, {useEffect, useReducer} from 'react';
import {StyleSheet, TextInput} from 'react-native';
import Color from '../../Constants/Color';
const INPUT_CAHNGE = 'INPUT_CAHNGE';
const INPUT_BLUR = 'INPUT_BLUR';

const inputReducer = (state, action) => {
  switch (action.type) {
    case INPUT_BLUR: {
      return {
        ...state,
        touched: true,
      };
    }

    case INPUT_CAHNGE:
      return {
        ...state,
        value: action.value,
        isValid: action.isValid,
      };

    default:
      return state;
  }
};

function Input(props) {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initailValue,
    isValid: props.initailValidity,
    touched: false,
  });
  // console.log(inputState);
  const {onInputChange, id} = props;
  useEffect(() => {
    if (inputState.touched) {
      props.onInputChange(id, inputState.value, inputState.isValid);
    }
  }, [inputState, onInputChange, id]);

  const textChangeHandler = text => {
    const emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let isValid = true;
    if (props.required && text.trim().length === 0) {
      isValid = false;
    }
    if (props.email && !emailRegex.test(text.toLowerCase())) {
      isValid = false;
    }
    if (props.min != null && +text < props.min) {
      isValid = false;
    }
    if (props.max != null && +text > props.max) {
      isValid = false;
    }
    if (props.minLength != null && text.length < props.minLength) {
      isValid = false;
    }

    dispatch({type: INPUT_CAHNGE, value: text, isValid: isValid});
  };
  const lostFocusHandler = () => {
    dispatch({type: INPUT_BLUR});
  };
  return (
    <TextInput
      {...props}
      style={props.isName ? styles.nameInput : styles.input}
      value={inputState.value}
      onFocus={lostFocusHandler}
      onChangeText={textChangeHandler}
    />
  );
}
const styles = StyleSheet.create({
  input: {
    borderColor: Color.grey, //'#27374F',
    width: '95%',
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    // paddingVertical: '9%'
    height: '8%',
    paddingHorizontal: '10%',
    color: Color.white,
    backgroundColor: Color.grey,
    marginBottom: '8%',
  },
  nameInput: {
    borderColor: Color.grey, //'#27374F',
    width: '95%',
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    // paddingVertical: '9%'
    height: '60%',
    paddingHorizontal: '10%',
    color: Color.white,
    backgroundColor: Color.grey,
    marginBottom: '18%',
  },
});

export default Input;
