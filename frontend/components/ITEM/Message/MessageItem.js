import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import Color from '../../../Constants/Color';

const MessageItem = props => {
  return (
    <TouchableOpacity
      style={styles.conatiner}
      onPress={() => props.props.navigation.navigate('chat')}>
      <View style={styles.info}>
        <View style={styles.imageConatiner}>
          <Image
            source={require('../../../assests/github.png')}
            style={styles.image}
          />
        </View>
        <Text style={styles.name}>Rahul Yadav</Text>
      </View>

      <Text style={styles.date}>jan 23, 2016</Text>
    </TouchableOpacity>
  );
};

export default MessageItem;

const styles = StyleSheet.create({
  conatiner: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingHorizontal: '2%',
    paddingVertical: '4%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageConatiner: {
    width: 40,
    height: 40,
    backgroundColor: Color.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    overflow: 'hidden',
  },
  image: {
    width: 30,
    height: 30,
  },
  name: {
    color: 'black',
    fontSize: 16,
    marginLeft: '4%',
    opacity: 0.7,
  },
  date: {
    color: 'black',
    opacity: 0.6,
    marginRight: '4%',
  },
});
