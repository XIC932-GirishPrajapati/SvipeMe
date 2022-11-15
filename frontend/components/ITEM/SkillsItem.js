import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const SkillsItem = props => {
  let coloredStar = [];
  let withoutColorStar = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= props.star) coloredStar.push(i);
    else withoutColorStar.push(i);
  }
  return (
    <View style={styles.conatiner}>
      <View>
        <Text style={styles.text}>{props.skill}</Text>
      </View>
      <View style={styles.stars}>
        {coloredStar.map(star => (
          <Icon name="star" key={star} color="#DFB300" size={20}></Icon>
        ))}
        {withoutColorStar.map(star => (
          <Icon name="star" key={star} size={20}></Icon>
        ))}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  conatiner: {
    marginBottom: '10%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  text: {color: 'black'},
  stars: {flexDirection: 'row'},
});

export default SkillsItem;
