import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import Icon, {Icons} from '../../Icons/icon';
const AddJobHead = (props) => {
  return (
    <View style={styles.screen}>
      <TouchableOpacity onPress={props.onPress} style={styles.iconContainer}>
     <Icon
          name="arrowleft"
          type={Icons.AntDesign}
          size={25}
          color="#27374F"
        />
      </TouchableOpacity>
      <View style={styles.textContainer}>
        <Text style={styles.text}>SwipeMe</Text>
      </View>
      <TouchableOpacity onPress={props.onClick} style={styles.iconContainer}>
      <Icon
          name="leftcircleo"
          type={Icons.AntDesign}
          size={25}
          color="#27374F"
        />
      </TouchableOpacity>
    </View>
  );
};

export default AddJobHead;

const styles = StyleSheet.create({
  screen: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: '5%',
    marginVertical: '6%',
  },
  text: {
    color: 'black',
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
  text: {
    fontSize: 24,
    color: 'black',
    fontWeight: '500',
    opacity: 0.8,
  },
});
