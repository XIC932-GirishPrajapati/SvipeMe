import React from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';

const AllcertificateItem = props => {
  return (
    <View style={styles.main}>
      <View style={styles.conatiner}>
        <View>
          <Image
            source={require('../../assests/coursera.png')}
            style={styles.icon}
          />
        </View>
        <View>
          <Text style={styles.text}>
            Foundation of user experience in (UX) Design
          </Text>
          <Text style={styles.smallText}>coursera</Text>
          <Text style={styles.smallText}>Issued On Jan 2021</Text>
          <Text style={styles.smallText}>No Expiry Date</Text>
        </View>
      </View>
      <TouchableOpacity>
        <Text style={styles.cred}>see credentail</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  main: {
    width: '95%',
    height: '20%',
    backgroundColor: '#E1E6EE',
    marginHorizontal: '2.5%',
    marginVertical: '2%',
    borderRadius: 10,
    paddingVertical: '4%',
    paddingHorizontal: '4%',
  },
  conatiner: {
    flexDirection: 'row',
  },
  text: {
    color: 'black',
    fontSize: 11,
    fontWeight: '700',
    marginHorizontal: '1%',
    marginTop: '2%',
  },
  icon: {
    width: 35,
    height: 35,
    marginRight: '3%',
  },
  smallText: {
    fontSize: 12,
  },
  cred: {
    marginVertical: '3%',
  },
});

export default AllcertificateItem;
