import * as React from 'react';
import {View, Text, Platform} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import LoginOrSignup, {
  LoginOrSignUpScreenOptions,
} from '../screens/loginOrsignup';
import Color from '../Constants/Color';
import Signup from '../screens/SignUp';
import Login from '../screens/Login';
import ForgotPassword from '../screens/ForgotPassword';
import UserDetails from '../screens/UserDetails';
import AllCertificate from '../screens/Allcertificate';
import AllSkills from '../screens/AllSkills';
import JobList from '../screens/recruiter/JobList';
import JobDetails from '../screens/JobDetails';
import MainScreen from '../screens/MainScreen';
import FavoriteScreen from '../screens/favorite';
import MessageScreen from '../screens/Message';
import FilterScreen from '../screens/FilterScreen';
import Icon, {Icons} from '../components/Icons/icon';
import Chat from '../components/ITEM/Message/Chat';
import {useSelector} from 'react-redux';
import RecSwipeSCreen from '../screens/recruiter/swipescreen';


const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();

const MainScreenNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="mainscreen"
        options={{headerShown: false}}
        component={MainScreen}
      />
      <Stack.Screen
        name="filter"
        options={{headerShown: false}}
        component={FilterScreen}
      />
      <Stack.Screen
        name="jobdetails"
        component={JobDetails}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const ProfileScreenNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="userdetails"
        options={{headerShown: false}}
        component={UserDetails}
      />
      <Stack.Screen
        name="allcerticate"
        component={AllCertificate}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="allskill"
        component={AllSkills}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const FavoriteNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="favoritescreen"
        component={FavoriteScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const MessageNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="messagescreen"
        component={MessageScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="chat"
        component={Chat}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const TabArr = [
  {
    route: 'Home',
    label: 'Home',
    type: Icons.MaterialCommunityIcons,
    icon: 'content-copy',
    component: MainScreenNavigator,
    tabBarColor: Color.primary,
  },
  {
    route: 'Favorite',
    label: 'Favorite',
    type: Icons.MaterialCommunityIcons,
    icon: 'heart',
    component: FavoriteNavigator,
    tabBarColor: Color.green,
  },
  {
    route: 'Message',
    label: 'Message',
    type: Icons.AntDesign,
    icon: 'message1',
    count: 3,
    component: MessageNavigator,
    tabBarColor: Color.red,
  },

  {
    route: 'Profile',
    label: 'Profile',
    type: Icons.FontAwesome,
    icon: 'user',
    component: ProfileScreenNavigator,
    tabBarColor: Color.purple,
  },
];
const Tab = createBottomTabNavigator();
const Tab4 = () => {
  return (
    <Tab.Navigator>
      {TabArr.map((_, index) => {
        return (
          <Tab.Screen
            key={index}
            name={_.route}
            component={_.component}
            options={{
              headerShown: false,
              tabBarBadge: _.count,
              tabBarShowLabel: false,
              tabBarColor: _.tabBarColor,
              tabBarIcon: ({color, size}) => (
                <Icon name={_.icon} type={_.type} size={size} color={color} />
              ),
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
};

///for the recruiter navigation
const RecStackNavigator=()=>{
  return(
    <Stack.Navigator>
      <Stack.Screen
      component={JobList}
      name='joblist'
      options={{headerShown: false}}
      />
      <Stack.Screen
      component={MessageNavigator}
      name='message'
      options={{headerShown: false}}
      />
      <Stack.Screen
      component={RecSwipeSCreen}
      name='swipescreen'
      options={{headerShown: false}}
      
      />

    </Stack.Navigator>
  )
}
     

const AllNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="loginorsignup"
        component={LoginOrSignup}
        options={{headerShown: false}}
      />
  
      <Stack.Screen
        name="afterauthscreencandidate"
        component={Tab4}
        options={{headerShown: false}}
      />
      <Stack.Screen 
      name="afterauthscreenrecruiter"
      component={RecStackNavigator}
      options={{headerShown: false}}
    />
   
      <Stack.Screen
        name="forgotpassword"
        component={ForgotPassword}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="signup"
        component={Signup}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
const MainNavigator = () => {
  return (
    <NavigationContainer>
      <AllNavigator />
    </NavigationContainer>
  );
};

export default MainNavigator;
