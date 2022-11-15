import React from 'react';
import {Text, View, StyleSheet, ScrollView} from 'react-native';
import AllSkillsItem from '../components/ITEM/AllSkillsItem';
import DetailsHead from '../components/ITEM/DetailsHead';
import Color from '../Constants/Color';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const AllSkills = props => {
  return (
    <View style={styles.screen}>
      <DetailsHead head="Certificates" props={props} />
      <View style={styles.edit}>
        <Text style={styles.editText}>Edit</Text>
      </View>
      <ScrollView>
        <View style={styles.topSkillsBox}>
          <Icon name="star" size={25} />
          <Text style={styles.text}>Top Skills</Text>
        </View>
        <View style={styles.skillItem}>
          <AllSkillsItem skill="Java" />
          <AllSkillsItem skill="React-Native" />
          <AllSkillsItem skill="Machine Learning" />
          <AllSkillsItem skill="AWS" />
        </View>

        <View style={styles.topSkillsBox}>
          <Icon name="cloud-question" size={25} />
          <Text style={styles.text}>Other Skills</Text>
        </View>
        <View style={styles.skillItem}>
          <AllSkillsItem skill="JavaScript" />
          <AllSkillsItem skill="SQL" />
          <AllSkillsItem skill="Machine Learning" />
          <AllSkillsItem skill="MongoDB" />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  edit: {
    paddingVertical: '4%',
    borderBottomColor: Color.grey,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  editText: {
    fontSize: 20,
  },

  topSkillsBox: {
    flexDirection: 'row',
    paddingVertical: '3%',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingHorizontal: '4%',
    marginBottom: '5%',
    backgroundColor: '#E1E6EE',
  },
  skillItem: {
    width: '80%',
    marginHorizontal: '10%',
  },
  text: {
    color: 'black',
    fontSize: 19,
    marginHorizontal: '3%',
  },
});

export default AllSkills;
