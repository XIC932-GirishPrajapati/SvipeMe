import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Color from '../../Constants/Color';

const AllSkillsItem = props => {
  return (
    <View style={styles.conatiner}>
      <View>
        <Text style={styles.text}>{props.skill}</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  conatiner: {
    marginBottom: '10%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    borderBottomColor: Color.grey,
    borderBottomWidth: 1,
  },
  text: {color: 'black'},
});

export default AllSkillsItem;
