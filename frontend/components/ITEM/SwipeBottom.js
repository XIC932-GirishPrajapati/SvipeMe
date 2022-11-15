import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Color from '../../Constants/Color';
import Icon, {Icons} from '../Icons/icon';

const SwipeBottom = props => {
  return (
    <View style={styles.screen}>
      <TouchableOpacity style={styles.iconContainer} onPress={props.onCross}>
        <Icon name="cross" type={Icons.Entypo} size={35} color="#27374F" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.mainiconContainer}
        onPress={props.onHeart}>
        <Icon
          name="heart"
          type={Icons.MaterialCommunityIcons}
          size={40}
          color={Color.white}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconContainer} onPress={props.onRefresh}>
        <Icon
          name="refresh"
          type={Icons.MaterialCommunityIcons}
          size={35}
          color="#27374F"
        />
      </TouchableOpacity>
    </View>
  );
};

export default SwipeBottom;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 30,
  },
  iconContainer: {
    width: 60,
    height: 60,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 25,
    elevation: 5,
    borderRadius: 30,
    backgroundColor: 'white',
  },
  mainiconContainer: {
    width: 75,
    height: 75,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 25,
    elevation: 5,
    borderRadius: 37.5,
    backgroundColor: Color.primary,
  },
});
