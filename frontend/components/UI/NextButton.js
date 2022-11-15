import React ,{useEffect,useRef}from 'react'
import { Animated, StyleSheet, ActivityIndicator, TouchableOpacity, View } from 'react-native'
import Icon,{Icons} from '../Icons/icon'
import Svg, {Circle,G} from 'react-native-svg'
import Color from '../../Constants/Color'
const NextButton = ({percentage,scrollTo,loading}) => {

    const size=80;
    const strokeWidth=2;
    const center=size/2;
    const radius=size/2-strokeWidth/2; 
    const circumference=2*Math.PI*radius;

    const progressAnimation=useRef(new Animated.Value(0)).current;
    const progressRef=useRef(null);

    const animation=(toValue)=>{
        return Animated.timing(progressAnimation,{
            toValue,
            duration:3000,
            useNativeDriver:true
        }).start()
    }
    useEffect(()=>{
         animation(percentage)
    },[percentage])

    useEffect(()=>{
        progressAnimation.addListener((value)=>{
         const   strokeDashoffset=circumference-(circumference*value.value)/100;
            
            if(progressRef?.current){
                progressRef.current.setNativeProps({
                    strokeDashoffset
                })
            }
        })

    },[percentage])
 


    return (
        <View style={styles.buttonContainer}>
          <Svg width={size} height={size}>
             <Circle 
              stroke="#E6E7E8"
               cx={center}
               cy={center}
               r={radius} 
                strokeWidth={strokeWidth}
                 />
                 <Circle 
                 ref={progressRef}
              stroke={Color.primary}
               cx={center}
               cy={center}
               r={radius} 
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
            //   strokeDashoffset={circumference-(circumference*percentage)/100}
                 />
             
          </Svg>
          <TouchableOpacity onPress={scrollTo} style={styles.button}>
          {loading?<ActivityIndicator color="white"/>:
          <Icon
          name="arrowright"
          type={Icons.AntDesign}
          size={25}
          color="white"
        />}
          </TouchableOpacity>
        </View>
    )
}

export default NextButton

const styles = StyleSheet.create({
    button:{
        position:'absolute',
        backgroundColor:Color.primary,
        padding:20,
        borderRadius:50
    },
    buttonContainer:{
     flexDirection:'row',
     justifyContent:'center',
     alignItems:'center',
     marginBottom:'5%'
    }
})
