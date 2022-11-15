import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Color from '../../../Constants/Color';

const chatItem = props => {
  return (
    <View style={props.user ? styles.screen : styles.screenUser}>
      <View
        style={
          props.user
            ? styles.messageContaineruser
            : styles.messageContainerfalseother
        }>
        <Text style={props.user ? styles.message : styles.messageUser}>
          This is a Testing Message
        </Text>
      </View>
    </View>
  );
};

export default chatItem;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  screenUser: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  messageContaineruser: {
    marginVertical: '4%',
  },

  message: {
    color: 'black',
    backgroundColor: Color.grey,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  messageUser: {
    color: 'black',
    backgroundColor: '#6495ed',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
});
