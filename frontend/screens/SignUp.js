import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  ImageBackground,
  Dimensions,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Color from '../Constants/Color';
import React, {useReducer, useState, useCallback, useEffect} from 'react';
import AuthHead from '../components/ITEM/AuthHead';
import Input from '../components/UI/input';
import Footer from '../components/ITEM/FooterAuth';
import CustomSubmitButton from '../components/ITEM/CutsomSubmitButton';
import * as authAction from '../store/action/auth';
import {useDispatch} from 'react-redux';
const REDUCER_UPDATE = 'UPDATE';
const fromReducer = (state, action) => {
  if (action.type === REDUCER_UPDATE) {
    const updateValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };

    const updateValidiies = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };
    let updatedformIsValid = true;
    for (const key in updateValidiies) {
      updatedformIsValid = updatedformIsValid && updateValidiies[key];
    }
    return {
      // ...state,
      formIsValid: updatedformIsValid,
      inputValidities: updateValidiies,
      inputValues: updateValues,
    };
  }
  return state;
};

const Signup = props => {
  const [error, seterror] = useState('');
  const [loading, setloading] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const dispatch = useDispatch();
  const routeParams = props.route.params ? props.route.params : null;
  const candidate = routeParams.candidate;
  // console.log(candidate, 'candidate');
  const [formState, dispatchFormState] = useReducer(fromReducer, {
    inputValues: {
      firstName: '',
      secondName: '',
      emailorphone: '',
      password: '',
      confirmpassword: '',
    },
    inputValidities: {
      firstName: false,
      secondName: false,
      emailorphone: false,
      password: false,
      confirmpassword: false,
    },
    formIsValid: false,
  });

  useEffect(() => {
    if (error) {
      Alert.alert('An Error Occurred!', error, [{text: 'Okay'}]);
    }
  }, [error]);

  // console.log('errr', error);
  const inputChangeHandler = useCallback(
    (inputIdentifier, value, isValid) => {
      // console.log(formState);
      dispatchFormState({
        type: REDUCER_UPDATE,
        value: value,
        isValid: isValid,
        input: inputIdentifier,
      });
    },
    [dispatchFormState],
  );

  // console.log(loading);

  const authHandler = async () => {
    // console.log(
    //   formState.inputValues.firstName,
    //   formState.inputValues.secondName,
    //   formState.inputValues.emailorphone,
    //   formState.inputValues.password,
    //   formState.inputValues.confirmpassword,
    // );

    setloading(true);
    seterror(null);

    const dispfun = authAction.signup(
      formState.inputValues.firstName,
      formState.inputValues.secondName,
      formState.inputValues.emailorphone,
      formState.inputValues.password,
      formState.inputValues.confirmpassword,
      candidate,
    );
    try {
      await dispatch(dispfun);
      if(candidate)
      props.navigation.replace('afterauthscreencandidate');
      else
      props.navigation.replace('afterauthscreenrecruiter');
      setloading(false);
    } catch (err) {
      // console.log(err);
      console.log(err);
      seterror(err);
      setloading(false);
    }
  };
  const loadingHandler = loading => {
    setisLoading(loading);
    setisLoading(loading);
  };
  if (isLoading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={Color.primary} />
      </View>
    );
  }
  // console.log(isLoading);
  return (
    <ScrollView style={styles.screen}>
      <AuthHead props={props} />

      <View style={styles.bottomHead}>
        <ImageBackground
          style={styles.image}
          resizeMethod="scale"
          source={require('../assests/BigEllipse.png')}>
          <View style={styles.scroll}>
            <View style={styles.inputContainer}>
              <View style={styles.name}>
                <View style={styles.firstName}>
                  <Input
                    isName
                    errorText="Please Enter a valid Place "
                    autoCapitalize="sentences"
                    autoCorrect
                    returnKeyType="next"
                    required
                    // minLength={5}
                    // numberOfLines={3}
                    initailValue=""
                    initailValidity={false}
                    onInputChange={inputChangeHandler}
                    placeholderTextColor={Color.white}
                    placeholder="First Name"
                    id="firstName"
                  />
                </View>

                <View style={styles.firstName}>
                  <Input
                    isName
                    errorText="Please Enter a valid Place "
                    autoCapitalize="sentences"
                    autoCorrect
                    returnKeyType="next"
                    required
                    // minLength={5}
                    // numberOfLines={3}
                    initailValue=""
                    initailValidity={false}
                    onInputChange={inputChangeHandler}
                    placeholderTextColor={Color.white}
                    placeholder="Second name"
                    id="secondName"
                  />
                </View>
              </View>
              <View style={styles.exceptName}>
                <Input
                  errorText="Please Enter a valid Place "
                  autoCapitalize="sentences"
                  autoCorrect
                  returnKeyType="next"
                  required
                  // minLength={5}
                  // numberOfLines={3}
                  initailValue=""
                  initailValidity={false}
                  onInputChange={inputChangeHandler}
                  placeholderTextColor={Color.white}
                  placeholder="Enter Email or Mobile Number"
                  id="emailorphone"
                />
                <Input
                  errorText="Please Enter a valid Place "
                  autoCapitalize="sentences"
                  autoCorrect
                  returnKeyType="next"
                  required
                  // minLength={5}
                  // numberOfLines={3}
                  initailValue=""
                  initailValidity={false}
                  onInputChange={inputChangeHandler}
                  placeholderTextColor={Color.white}
                  placeholder="Enter Password"
                  id="password"
                />
                <Input
                  errorText="Please Enter a valid Place "
                  autoCapitalize="sentences"
                  autoCorrect
                  returnKeyType="next"
                  required
                  // minLength={5}
                  // numberOfLines={3}
                  initailValue=""
                  initailValidity={false}
                  onInputChange={inputChangeHandler}
                  placeholderTextColor={Color.white}
                  placeholder="Confirm Password"
                  id="confirmpassword"
                />
                <CustomSubmitButton
                  // disable
                  title="Register"
                  isLoading={loading}
                  onClick={authHandler}
                />
                <Footer
                  props={props}
                  candidate={candidate}
                  onLoadingChange={loadingHandler}
                />
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
    </ScrollView>
  );
};

export const SignupScreenOptions = navData => {
  return {
    headerTitle: 'Login',
  };
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },

  loading: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // marginVertical: '40%',
  },
  bottomHead: {
    marginTop: '30%',
  },

  image: {
    // position: 'absolute',
    // left: 0,
    // top: 0,
    // width: Dimensions.get('window').width,
    // height: Dimensions.get('window').height,
  },
  inputContainer: {
    marginTop: '15%',
    width: '100%',
    marginHorizontal: '9%',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  name: {
    width: '90%',
    flexDirection: 'row',
  },
  exceptName: {
    width: '83%',
    height: '90%',
  },
  firstName: {
    width: '45%',
    display: 'flex',
    flexDirection: 'row',
    height: '100%',
  },
  TextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  scroll: {
    height: '100%',
  },
});

export default Signup;
