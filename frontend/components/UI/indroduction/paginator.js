import React from 'react'
import { StyleSheet, Animated,useWindowDimensions, View } from 'react-native'

const Paginator = ({data,scrollX}) => {
    const {width}=useWindowDimensions()
    // console.log(scrollX)
    return (
        <View style={{flexDirection:'row',height:64,justifyContent:'center'}}> 
          {data.map((_,i)=>{
              const inputRange=[(i-1)*width,(i)*width,(i+1)*width]
              const dotWidth=scrollX.interpolate({
                  inputRange,
                  outputRange:[10,20,10],
                  extrapolate:'clamp'
              })
              const opacity=scrollX.interpolate({
                inputRange,
                outputRange:[0.3,1,0.3],
                extrapolate:'clamp'
            })
              return (<Animated.View key={i} style={[styles.dot,{width:dotWidth,opacity:opacity}]} />)
            })}
        </View>
    )
}

export default Paginator

const styles = StyleSheet.create({
    dot:{
        height:10,
        borderRadius:5,
        backgroundColor:'#493d8a',
        marginHorizontal:8,
   
    }
})
