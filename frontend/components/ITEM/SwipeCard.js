import React from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import Color from '../../Constants/Color';
// const data = {
//   role: 'Sr. Backend Developer',
//   company: 'Google',
//   location: 'California',
//   description: {
//     minExperience: 3,
//     skills: ['Java', 'JavaScript', 'ML'],
//     about:
//       'Looking for a Sr. UI/UX Designer having overall 1-2 years of experience to join our team. The ideal person for this position has an excellent design sense, an eye for detail, and creativity to bring out the best of design',
//   },
// },
const SwipeCard = ({job}) => {
  if (!job) {
    return (
      <View style={styles.screen}>
        <View style={styles.card}>
          <View style={styles.showMessage}>
            <Text style={styles.role}>No more Jobs are matching</Text>
            <Text style={styles.emoji}>😢</Text>
          </View>
        </View>
      </View>
    );
  }
  return (
    <View style={styles.screen}>
      <View style={styles.card}>
        <View style={styles.mainiconContainer}>
          <View style={styles.imageConatiner}>
            <Image
              source={require('../../assests/Google.png')}
              style={styles.image}
            />
          </View>
          <View style={styles.jobdetails}>
            <Text style={styles.role}>{job.role}</Text>
            <Text style={styles.company}>Company Name:{job.company}</Text>
            <Text style={styles.company}>Location:{job.location}</Text>
          </View>
        </View>
        <View style={styles.line}></View>
        <View style={styles.description}>
          <Text style={styles.desText}>
            Minmum Experience: {job.description.minExperience} Years
          </Text>
          <View style={styles.skills}>
            <Text style={styles.requireMent}>Skills:</Text>
            <Text style={styles.skill}>JavaScript, Python, C++</Text>
          </View>

          <Text style={styles.requireMent}>Requirements:</Text>
          <Text style={styles.reqText}>{job.description.about}</Text>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  card: {
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'rgba(0, 119, 181, 0.7)',
    backgroundColor: '#F5F5F5',
    height: '70%',
  },
  text: {
    textAlign: 'center',
    fontSize: 50,
    backgroundColor: 'transparent',
  },
  mainiconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: '4%',
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
    width: 40,
    height: 40,
  },
  jobdetails: {
    margin: '5%',
  },
  role: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#27374F',
    opacity: 0.9,
    marginVertical: 2,
  },
  company: {
    color: '#27374F',
    opacity: 0.7,
    marginVertical: 2,
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: '#27374F',
    width: '100%',
  },
  showMessage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emoji: {
    fontSize: 50,
  },
  description: {
    margin: '5%',
  },
  desText: {
    color: '#27374F',
  },
  requireMent: {
    color: '#27374F',
    fontWeight: '500',
    marginTop: '3%',
    marginBottom: '2%',
  },
  skills: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  skill: {
    margin: '3%',
  },
});

export default SwipeCard;
