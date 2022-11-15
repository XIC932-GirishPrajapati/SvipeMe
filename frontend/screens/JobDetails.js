import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AIcon from 'react-native-vector-icons/AntDesign';
import JoblistItem from '../components/ITEM/JoblistItem';
import Color from '../Constants/Color';
import BackGroundSvg from '../assestsJSX/BackGround';
import DetailsHead from '../components/ITEM/DetailsHead';

const JobDetails = props => {
  return (
    <View style={styles.screen}>
      <DetailsHead props={props} />
      <ScrollView>
        <View style={styles.background}>
          <Image source={require('../assests/background.png')} />
        </View>
        <View style={styles.mainData}>
          <View>
            <Text style={styles.boldText}>Sr. UI/UX Designer</Text>
            <Text style={styles.text}>Company:Google</Text>
            <Text style={styles.text}>Posted:7 days ago</Text>
            <Text style={styles.text}>Rs 14,00,000 to 32,00,000 a year</Text>
          </View>
          <View>
            <Image
              source={require('../assests/Google.png')}
              style={styles.img}
            />
          </View>
        </View>
        <View style={styles.line}></View>
        <View style={styles.descriptionText}>
          <Text style={styles.boldText}>Job Description</Text>
          <View style={styles.description}>
            <Text style={styles.dtext}>
              Looking for a Sr. UI/UX Designer having overall 1-2 years of
              experience to join our team
            </Text>
            <Text style={styles.dtext}>
              The ideal person for this position has an excellent design sense,
              an eye for detail, and creativity to bring out the best of designs
            </Text>
            <Text style={styles.dtext}>
              You love to collaborate with designers, engineers, projecct
              managers, and bring out the design experience that delights.
            </Text>
          </View>
        </View>
        <TouchableOpacity
          activeOpacity={0.6}
          style={styles.buttonStyle}
          onPress={() => {}}>
          <Text style={styles.texts}>Apply</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'white',
  },
  background: {
    width: '100%',
    marginRight: '50%',
  },
  mainData: {
    flexDirection: 'row',
    margin: '5%',
  },
  boldText: {
    fontSize: 16,
    fontWeight: '500',
    color: 'black',
  },
  text: {
    marginTop: '2%',
  },
  img: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginTop: '5%',
  },
  line: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  descriptionText: {
    margin: '5%',
  },
  description: {
    marginVertical: '10%',
  },
  dtext: {
    marginVertical: '5%',
    textAlign: 'center',
  },
  buttonStyle: {
    paddingVertical: 10,
    width: '80%',
    backgroundColor: Color.primary,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Color.primary,
    alignItems: 'center',
    marginVertical: '5%',
    marginHorizontal: '10%',
  },
  texts: {
    color: Color.white,
    fontWeight: '600',
  },
  back: {
    borderColor: 'black',
    borderWidth: 1,
    width: '25%',
    height: '4%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    position: 'relative',
    marginLeft: '70%',
  },
});
export default JobDetails;
