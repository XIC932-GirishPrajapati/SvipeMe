import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Button,
  Image,
  ImageBackground,
  Alert,
  Dimensions,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import Color from '../Constants/Color';
import React, {useState, useCallback, useReducer, useEffect} from 'react';
import AuthHead from '../components/ITEM/AuthHead';
import Input from '../components/UI/input';
import Footer from '../components/ITEM/FooterAuth';
import ThirdElipse from '../assestsJSX/SignUp/ThirdLast';
import SecondElipse from '../assestsJSX/SignUp/SecondLast';
import CheckBox from '@react-native-community/checkbox';
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

const Login = props => {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [error, seterror] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [loading, setloading] = useState(false);
  const routeParams = props.route.params ? props.route.params : null;
  const candidate = routeParams.candidate;

  console.log(candidate, 'candidateLo');
  const dispatch = useDispatch();
 

  const [formState, dispatchFormState] = useReducer(fromReducer, {
    inputValues: {
      emailorphone: '',
      password: '',
    },
    inputValidities: {
      emailorphone: false,
      password: false,
    },
    formIsValid: false,
  });
  useEffect(() => {
    if (error) {
      Alert.alert('An Error Occurred!', error, [{text: 'Okay'}]);
    }
  }, [error]);
  const inputChangeHandler = useCallback(
    (inputIdentifier, value, isValid) => {
      dispatchFormState({
        type: REDUCER_UPDATE,
        value: value,
        isValid: isValid,
        input: inputIdentifier,
      });
    },
    [dispatchFormState],
  );

  const authHandler = async () => {
    setloading(true);
    seterror(null);
    // console.log(
    //   formState.inputValues.emailorphone,
    //   formState.inputValues.password,
    // );

    const dispfun = authAction.login(
      formState.inputValues.emailorphone,
      formState.inputValues.password,
      candidate,
    );
    try {
      await dispatch(dispfun);
      setloading(false);
      if(candidate)
      props.navigation.replace('afterauthscreencandidate');
      else
      props.navigation.replace('afterauthscreenrecruiter');
    } catch (err) {
      console.log(err);
      seterror(err);
      setloading(false);
    }
  };
  const loadingHandler = (loading, err) => {
    setisLoading(loading);
    seterror(err);
  };
  if (isLoading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={Color.primary} />
      </View>
    );
  }
  return (
    <ScrollView style={styles.screen}>
      <AuthHead text="Login" props={props} />
      <View style={styles.secondthirdEllipse}>
        <View style={styles.thirdElipse}>
          <ThirdElipse />
        </View>
      </View>
      <View style={styles.bottomHead}>
        <ImageBackground
          style={styles.image}
          resizeMethod="scale"
          source={require('../assests/BigEllipse.png')}>
          <View style={styles.inputContainer}>
            <View style={styles.exceptName}>
              <Input
                errorText="Please Enter a valid Email or Phone "
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
                errorText="Please Enter a valid Password"
                autoCapitalize="sentences"
                autoCorrect
                returnKeyType="next"
                required
                secureTextEntry
                // minLength={5}
                // numberOfLines={3}
                initailValue=""
                initailValidity={false}
                onInputChange={inputChangeHandler}
                placeholderTextColor={Color.white}
                placeholder="Enter Password"
                id="password"
              />
              <View style={styles.rememberme}>
                <View style={styles.checkbox}>
                  <CheckBox
                    disabled={false}
                    value={toggleCheckBox}
                    tintColors={toggleCheckBox ? 'white' : 'white'}
                    onValueChange={newValue => setToggleCheckBox(newValue)}
                  />
                </View>
                <View>
                  <Text style={styles.remText}>Remember me</Text>
                </View>
              </View>
              <TouchableOpacity
                style={styles.forgotpass}
                onPress={() => props.navigation.navigate('forgotpassword')}
                activeOpacity={0.6}>
                <Text style={styles.remText}>Forgot password?</Text>
              </TouchableOpacity>

              <CustomSubmitButton
                // disable
                title="Login"
                isLoading={loading}
                onClick={authHandler}
              />
              <TouchableOpacity
                style={styles.signup}
                onPress={() =>
                  props.navigation.navigate('signup', {candidate: candidate})
                }>
                <Text style={styles.signupText}>Or Create a new account</Text>
              </TouchableOpacity>
              <Footer
                props={props}
                candidate={candidate}
                onLoadingChange={loadingHandler}
              />
            </View>
          </View>
        </ImageBackground>
      </View>
    </ScrollView>
  );
};

export const LoginScreenOptions = navData => {
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

  image: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  inputContainer: {
    marginTop: '10%',
    width: '100%',
    marginHorizontal: '9%',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },

  exceptName: {
    width: '83%',
    height: '90%',
    marginTop: '5%',
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

  thirdElipse: {
    height: '5%',
  },
  secondthirdEllipse: {
    marginTop: '20%',
  },
  checkbox: {
    borderColor: Color.white,
  },
  remText: {
    color: Color.white,
    marginHorizontal: '5%',
    marginTop: '2%',
  },
  rememberme: {
    flexDirection: 'row',
    marginTop: '-4%',
  },
  forgotpass: {
    flexDirection: 'row-reverse',
    marginBottom: '12%',
  },
  bottomHead: {
    marginTop: '10%',
  },
  signupText: {
    color: Color.white,
  },
  signup: {
    flexDirection: 'row-reverse',
    marginTop: '3%',
  },
});

export default Login;
