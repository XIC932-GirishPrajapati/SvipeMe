import React from 'react'
import { View, Text ,Image,useWindowDimensions,StyleSheet} from 'react-native'

const Onboard = (props) => {
    const {width}=useWindowDimensions()
    // console.log(props.item.id)
    return (
        <View style={[styles.container,{width}]}>
         <Image source={props.item.image} style={[styles.image,{width,resizeMode:'contain'}]}/>
        <View style={{flex:0.7, justifyContent:'center'}}>
         <Text style={styles.title}>{props.item.title}</Text>
         <Text style={styles.description}>{props.item.description}</Text>
        </View>
        </View>
    )
}

export default Onboard
const styles = StyleSheet.create({
    container:{
    flex:1
    },
    image:{
       flex:0.7,
       justifyContent:'center'

    }
    ,
    title:{
        fontWeight:'800',
        fontSize:28,
        marginBottom:10,
        color:'#493d8a',
        textAlign:'center'
    },
    description:{
        fontWeight:'300',
        marginBottom:10,
        color:'#493d8a',
        textAlign:'center',
        paddingBottom:64
    }
})
