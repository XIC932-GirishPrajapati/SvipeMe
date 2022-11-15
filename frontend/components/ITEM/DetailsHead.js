import React from 'react';
import {Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Color from '../../Constants/Color';
import { useSelector } from 'react-redux';
const DetailsHead = props => {
  //   console.log(props.props);
  const isCandidate=useSelector(state=>state.candidate.isCandidate)
  console.log("DETAILS HEAD",isCandidate);
  return (
    <View>
      <View style={styles.head}>
        {/* <TouchableOpacity
          onPress={() => props.props.navigation.navigate('afterauthscreen')}
          style={styles.topHomeContainer}>
          <Icon name="home" size={25} color="#273B4A"></Icon>
        </TouchableOpacity> */}
        <View>
          <Text style={styles.text}>{props.head}</Text>
        </View>
        <TouchableOpacity
          style={styles.backContainer}
          onPress={() => props.props.navigation.goBack()}>
          <View>
            <Icon name="arrow-left" size={25} style={styles.icon}></Icon>
          </View>
          <View>
            <Text style={styles.backText}>Back</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.boldLines}></View>
    </View>
  );
};
const styles = StyleSheet.create({
  head: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: '5%',
  },
  topHomeContainer: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Color.accent,
    backgroundColor: '#E1E6EE',
    width: '10%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: '500',
    color: 'black',
  },

  backText: {
    fontSize: 14,
    fontWeight: '700',
    zIndex: 200,
    color: 'black',
  },
  boldLines: {
    borderBottomColor: 'black',
    borderBottomWidth: 1.3,
  },
  backContainer: {
    flexDirection: 'row',
  },
  icon: {
    color: 'black',
  },
});

export default DetailsHead;
