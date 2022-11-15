import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
} from 'react-native';
import Color from '../../../Constants/Color';
import Icon, {Icons} from '../../Icons/icon';
import ChatItem from './chatItem';
const Chat = props => {
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
        <Text style={styles.heading}>Rahul Yadav</Text>
      </View>
      <View style={styles.line}></View>
      <ScrollView>
        <View style={styles.otherProfile}>
          <View style={styles.imageConatiner}>
            <Image
              source={require('../../../assests/Quora.png')}
              style={styles.image}
            />
          </View>
          <Text style={styles.name}>Rahul Yadav</Text>
        </View>
        <View style={styles.line}></View>
        <View style={styles.messageList}>
          <ChatItem user={true} />
          <ChatItem />
          <ChatItem user={true} />
          <ChatItem />
          <ChatItem user={true} />
          <ChatItem />
          <ChatItem user={true} />
          <ChatItem />
          <ChatItem user={true} />
          <ChatItem />
          <ChatItem user={true} />
          <ChatItem />
          <ChatItem user={true} />
          <ChatItem />
          <ChatItem user={true} />
          <ChatItem />
          <ChatItem user={true} />
          <ChatItem />
          <ChatItem user={true} />
          <ChatItem />
          <ChatItem user={true} />
          <ChatItem />
        </View>
      </ScrollView>
      <View style={styles.inputContainer}>
        <View style={styles.inputs}>
          <TextInput />
        </View>
        <TouchableOpacity style={styles.send}>
          <Text style={styles.sendText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Chat;

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
    marginHorizontal: '5%',
  },
  line: {
    borderBottomColor: Color.grey,
    borderBottomWidth: 1,
  },
  imageConatiner: {
    width: 80,
    height: 80,
    backgroundColor: Color.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40,
    overflow: 'hidden',
  },
  image: {
    width: 80,
    height: 80,
  },
  otherProfile: {
    margin: '7%',
  },
  name: {
    marginVertical: '5%',
    color: 'black',
    opacity: 0.6,
    marginLeft: '-2%',
  },
  messageList: {
    padding: '5%',
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
  },
  inputs: {
    borderRadius: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    width: '75%',
    marginTop: 5,
    marginHorizontal: 5,
    marginBottom: 5,
    borderColor: Color.grey,
  },
  input: {
    width: '100%',
  },
  send: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  sendText: {
    color: Color.primary,
    fontWeight: '600',
    fontSize: 17,
  },
});
