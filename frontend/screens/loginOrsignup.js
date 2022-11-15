// import {StyleSheet, TouchableOpacity, View, Text, Button} from 'react-native';
import React,{useState,useRef} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
 Animated,
  View,
  FlatList,
  TouchableOpacity
} from 'react-native';
import Color from '../Constants/Color';
import Eliipse2 from '../assestsJSX/LoginOrSignup/Ellipse2';
import Eliipse1 from '../assestsJSX/LoginOrSignup/Ellipse1';
import SearchIcon from '../assestsJSX/LoginOrSignup/JobIcon';
import JobText from '../assestsJSX/LoginOrSignup/JobFinder';
import BoxIcon from '../assestsJSX/LoginOrSignup/BoxIcon';
import * as isCandidateAction from '../store/action/candidateorrecruiter';
import {useDispatch} from 'react-redux'

import NextButton from '../components/UI/indroduction/NextButton';
import Onboard from '../components/UI/indroduction/Onboard';
import Paginator from '../components/UI/indroduction/paginator';

const DATA=[{
  id:'1',
  image:require('../assests/Intro/intro1.png'), 
   title:'Swipe The World',
  description:'swipe your screen and get your job and candidate',
},
{
  id:'2',
  title:'Easy contact',
  image:require('../assests/Intro/intro2.png'), 
  description:'Grow your connection with HR',
},
{
  id:'3',
  title:'Appoint your Interview',
  image:require('../assests/Intro/intro3.png'), 
  description:'Grow your business by accepting card payment',
}]

const LoginOrSignup = props => {
  // console.log(props.navigation);
const dispatch = useDispatch();
const [currentIndex ,setcurrentIndex]=useState(0)
const scrollX=useRef(new Animated.Value(0)).current;
const slideRef=useRef(null)
const [showFirstTime,setShowFirstTime]=useState(true);
const viewableItemsChanged = useRef(({viewableItems})=> {
  setcurrentIndex(viewableItems[0].index)
  // Use viewable items in state or as intended
}).current
const viewConfigRef =useRef({ viewAreaCoveragePercentThreshold: 50 }).current

const onScrollTo=()=>{
   if(currentIndex<DATA.length-1){
      slideRef.current.scrollToIndex({index:currentIndex+1})
   }else{
    setShowFirstTime(false);
   }
}

  const onRecruiter=()=>{
    dispatch(isCandidateAction.candidateorrecruiter(false));
    props.navigation.navigate('login', {candidate: false})
  }
  const onCandidate=()=>{
    dispatch(isCandidateAction.candidateorrecruiter(true));
    props.navigation.navigate('login', {candidate: true})
  }

  const showFirstTimeScreen=(  <SafeAreaView style={styles.screen1}>
    <View  style={{flex:3}}>
    <FlatList
    data={DATA}
    horizontal
    bounces={false}
    pagingEnabled
    keyExtractor={(item)=>item.id}
    onScroll={Animated.event(
      // scrollX = e.nativeEvent.contentOffset.x
      [{ nativeEvent: {
           contentOffset: {
             x: scrollX
           }
         }
       }],{
         useNativeDriver:false
       }
    )}
    viewabilityConfig={viewConfigRef}
    onViewableItemsChanged={viewableItemsChanged}
    renderItem={({item})=><Onboard item={item}/>}
    ref={slideRef}
    showsHorizontalScrollIndicator={false}
    />
    </View>
    <Paginator scrollX={scrollX} data={DATA}/>
    <NextButton scrollTo={onScrollTo} percentage={(currentIndex+1)*(100/DATA.length)} />
    </SafeAreaView>);

if(showFirstTime){
  return showFirstTimeScreen;
}

  return (
    <View style={styles.screen}>
      <View style={styles.mainTop}>
        <View style={styles.ellipse}>
          <Eliipse2 />
        </View>

        <View style={styles.jobIcon}>
          <SearchIcon />
        </View>
        <View style={styles.jobText}>
          <JobText />
        </View>
        <View style={styles.boxIcon}>
          <BoxIcon />
        </View>
      </View>

      <View style={styles.buttons}>
        <TouchableOpacity
          style={styles.buttonStyle}
          activeOpacity={0.6}
          onPress={onRecruiter}>
          <Text style={styles.text}>As a Recrcuiter</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.6}
          style={styles.buttonStyle}
          onPress={onCandidate}>
          <Text style={styles.text}>As a Candidate</Text>
        </TouchableOpacity>
      </View>
      <Eliipse1 />
    </View>
  );
};


export const LoginOrSignUpScreenOptions = navData => {
  return {
    headerTitle: 'Login',
  };
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  buttons: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ellipse: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },

  jobIcon: {
    position: 'absolute',
    left: ' 52%',
    right: '17.22%',
    top: '15.19%',
    bottom: '75.47%',
  },
  boxIcon: {
    position: 'absolute',
    left: ' 60.83%',
    right: '32.22%',
    top: '27.34%',
    bottom: '84.24%',
  },
  jobText: {
    position: 'absolute',
    width: 120,
    height: 29,
    left: 126,
    top: 157,
  },
  buttonStyle: {
    paddingVertical: 13,
    width: '70%',
    backgroundColor: Color.accent,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Color.accent,
    marginBottom: '3%',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontWeight: '500',
  },
  mainTop: {
    justifyContent: 'flex-start',
  },
  icon: {
    color: '#ccc',
    fontSize: 24,
    alignSelf: 'center',
  },
  screen1:{
    flex:1,
    alignItems:'center',
    backgroundColor:'white'
      },
      sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
      },
      sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
      },
      sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
      },
      highlight: {
        fontWeight: '700',
      },
});

export default LoginOrSignup;
