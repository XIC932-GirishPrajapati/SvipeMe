/** @format */

import React, {useEffect, useReducer} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
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
    <View style={styles.formCtrl}>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>{props.label}</Text>
      </View>
      <TextInput
        {...props}
        style={styles.input}
        value={inputState.value}
        onFocus={lostFocusHandler}
        onChangeText={textChangeHandler}
      />
      {!inputState.isValid && inputState.touched && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}> {props.errorText}</Text>
        </View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  formCtrl: {
    width: '100%',
    marginBottom: '2%',
  },
  label: {
    fontWeight: '500',
    marginHorizontal: 8,
    marginTop: 8,
    color: '#393b3d',
  },
  input: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderColor: '#9499a1',
    borderWidth: 1,
    borderRadius: 5,
    textAlignVertical: "top",
    marginTop: '1%',
  },
  errorContainer: {
    marginVertical: 5,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
  },
  labelContainer: {
    flexDirection: 'row',
  },
  star: {
    color: 'red',
  },
});

export default Input;
