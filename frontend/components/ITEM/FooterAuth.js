import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import GoogleIcon from '../../assestsJSX/SignUp/googleIcon';
import Lines from '../../assestsJSX/SignUp/Line';
import Color from '../../Constants/Color';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import React, {useEffect} from 'react';
import {LoginManager, AccessToken} from 'react-native-fbsdk';
import * as authAction from '../../store/action/auth';
import {useDispatch,useSelector} from 'react-redux';

const Footer = props => {
  const dispatch = useDispatch();
  const candidate=useSelector(state=>state.candidate.isCandidate)
  useEffect(() => {
    GoogleSignin.configure();
  }, []);

  const onFacebookButtonPress = async () => {
    // Attempt login with permissions
    props.onLoadingChange(true, null);
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);

    if (result.isCancelled) {
      props.onLoadingChange(false, 'User cancelled the login process');
      throw 'User cancelled the login process';
    }

    // Once signed in, get the users AccesToken
    const data = await AccessToken.getCurrentAccessToken();
    // console.log(data);
    // props.props.props.navigation.navigate("")
    if (!data) {
      props.onLoadingChange(true, 'Something went wrong!');
      throw 'Something went wrong obtaining access token';
    }

    // Create a Firebase credential with the AccessToken
    const facebookCredential = auth.FacebookAuthProvider.credential(
      data.accessToken,
    );

    // Sign-in the user with the credential
    fetch(
      'https://graph.facebook.com/v2.5/me?fields=email,name,friends&access_token=' +
        data.accessToken,
    )
      .then(response => response.json())
      .then(async json => {
        // Some user object has been set up somewhere, build that user here
        console.log(json);
        const name = json.name.split(' ');
        // console.log(name);
        try {
          await dispatch(
            authAction.authWithSSO(
              name[0],
              name[1],
              json.email,
              json.id,
              props.candidate,
            ),
          );
          // props.onLoadingChange(false, null);
        } catch (e) {
          props.onLoadingChange(false, 'something went wrong');
        }
      })
      .catch(error => {
        console.log(error);
        props.onLoadingChange(true, 'Something went wrong!');
      });

    const response = await auth().signInWithCredential(facebookCredential);
    if(candidate)
    props.props.navigation.navigate('afterauthscreencandidate');
    else
    props.props.navigation.navigate('afterauthscreenrecruiter');
  };

  // const getToken = async () => {
  //   try {
  //     const userInfo = await GoogleSignin.getTokens();
  //     console.log('token:', userInfo);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const googleSignIn = async () => {
    props.onLoadingChange(true, null);
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo.user);
      const user = userInfo.user;
      await dispatch(
        authAction.authWithSSO(
          user.givenName,
          user.familyName,
          user.email,
          user.id,
          props.candidate,
        ),
      );
      // props.onLoadingChange(false, null);
      if(candidate)
      props.props.navigation.replace('afterauthscreencandidate');
      else
      props.props.navigation.replace('afterauthscreenrecruiter');
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        console.log('user cancelled the login flow');
        props.onLoadingChange(false, 'user cancelled the login flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (f.e. sign in) is in progress already
        console.log('operation (f.e. sign in) is in progress already');
        props.onLoadingChange(false, 'user cancelled the login flow');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
        console.log('play services not available or outdated');
        props.onLoadingChange(false, 'user cancelled the login flow');
      } else {
        // some other error happened
        console.log('Something is going wrong');
        props.onLoadingChange(false, 'Something is going wrong');
      }
    }
  };

  return (
    <View style={styles.screen}>
      <View style={styles.footerTextContainer}>
        <View style={styles.lines}>
          <Lines />
        </View>
        <View>
          <Text style={styles.footerText}> or signin with</Text>
        </View>
        <View style={styles.lines}>
          <Lines />
        </View>
      </View>
      <View style={styles.iconContainer}>
        <TouchableOpacity style={styles.icon} onPress={onFacebookButtonPress}>
          <Icon name="facebook" size={45} color="#0077B5"></Icon>
        </TouchableOpacity>
        <TouchableOpacity style={styles.gicon} onPress={googleSignIn}>
          <GoogleIcon />
        </TouchableOpacity>
        <View style={styles.icon}>
          <Icon name="linkedin" size={45} color="#0077B5"></Icon>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    marginTop: '5%',
  },
  footerText: {
    color: Color.white,
    marginHorizontal: '1%',
  },
  footerTextContainer: {
    flexDirection: 'row',
  },
  lines: {
    justifyContent: 'center',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: '2%',
  },
  icon: {
    height: 45,
    width: 45,
    borderRadius: 22.5,
    // backgroundColor: '#0077B5',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  gicon: {
    height: 35,
    width: 35,
    borderColor: 'white',
    marginTop: '2%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
});

export default Footer;
