import React from 'react';
import {Text, View, StyleSheet, ScrollView} from 'react-native';
import AllcertificateItem from '../components/ITEM/AllcertificatesItem';
import DetailsHead from '../components/ITEM/DetailsHead';
import Color from '../Constants/Color';

const AllCertificate = props => {
  return (
    <View style={styles.screen}>
      <DetailsHead head="Certificates" props={props} />
      <View style={styles.edit}>
        <Text style={styles.editText}>Edit</Text>
      </View>
      <ScrollView>
        <AllcertificateItem />
        <AllcertificateItem />
        <AllcertificateItem />
        <AllcertificateItem />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  edit: {
    paddingVertical: '5%',
    borderBottomColor: Color.grey,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  editText: {
    fontSize: 20,
  },
});

export default AllCertificate;
