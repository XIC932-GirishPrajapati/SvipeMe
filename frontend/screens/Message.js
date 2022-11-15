import React from 'react';
import {ScrollView} from 'react-native';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon, {Icons} from '../components/Icons/icon';
import MessageItem from '../components/ITEM/Message/MessageItem';
import Color from '../Constants/Color';
const MessageScreen = props => {
  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => props.navigation.goBack()}>
          <Icon
            name="arrow-left"
            type={Icons.MaterialCommunityIcons}
            size={25}
            color="#27374F"
          />
        </TouchableOpacity>
        <Text style={styles.heading}>Messages</Text>
      </View>
      <View style={styles.line}></View>
      <ScrollView style={styles.messageList}>
        <MessageItem props={props} />
        <MessageItem props={props} />
        <MessageItem props={props} />
        <MessageItem props={props} />
        <MessageItem props={props} />
        <MessageItem props={props} />
        <MessageItem props={props} />
        <MessageItem props={props} />
        <MessageItem props={props} />
        <MessageItem props={props} />
        <MessageItem props={props} />
      </ScrollView>
    </View>
  );
};
export default MessageScreen;
const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  header: {
    margin: '4%',
    width: '100%',
    flexDirection: 'row',
  },
  iconContainer: {
    width: 50,
    height: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E8E6EA',
    borderRadius: 10,
  },
  icon: {
    width: 30,
    height: 30,
  },
  heading: {
    fontSize: 20,
    color: '#27374F',
    fontWeight: '500',
    marginHorizontal: '18%',
  },
  line: {
    borderBottomColor: Color.grey,
    borderBottomWidth: 1,
  },
  messageList: {
    flex: 1,
    // backgroundColor: '#E1E6EE',
  },
});
