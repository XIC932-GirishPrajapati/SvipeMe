import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  TextInput,
} from 'react-native';
import Color from '../Constants/Color';
import React, {useState} from 'react';
import AuthHead from '../components/ITEM/AuthHead';

const ForgotPassword = props => {
  const [email, setemail] = useState('');

  return (
    <View style={styles.screen}>
      <AuthHead forgot props={props} />
      <View style={styles.inputContainer}>
        <View>
          <Text style={styles.headText}>Reset Password</Text>
        </View>
        <View style={styles.description}>
          <Text style={styles.descriptionText}>
            An email with password reset instructions would be sent to the
            following email address.
          </Text>
        </View>
        <View style={styles.inputs}>
          <TextInput
            autoCapitalize="none"
            keyboardType="email-address"
            errorText="Please enter a Valid email adress."
            initialValue=""
            value={email}
            placeholder="Email"
            style={styles.input}
            onChangeText={email => setemail(email)}
          />
          <TouchableOpacity
            activeOpacity={0.6}
            style={styles.buttonStyle}
            onPress={() => {}}>
            <Text style={styles.text}>Reset Password</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  headText: {
    fontSize: 20,
    fontWeight: '700',
    marginHorizontal: '4%',
    color: '#27374F',
  },
  description: {
    marginTop: '10%',
    width: '80%',

    marginHorizontal: '10%',
  },
  descriptionText: {
    color: '#000',
    textAlign: 'center',
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: '#27374F',
    borderBottomWidth: 1,
  },
  inputs: {
    width: '80%',
    marginTop: '10%',
    marginHorizontal: '10%',
    justifyContent: 'center',
  },
  buttonStyle: {
    paddingVertical: 10,
    width: '90%',
    backgroundColor: Color.grey,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Color.grey,
    alignItems: 'center',
    marginTop: '10%',
    marginHorizontal: '5%',
  },
  text: {
    color: Color.white,
    fontWeight: '600',
  },
});

export default ForgotPassword;
