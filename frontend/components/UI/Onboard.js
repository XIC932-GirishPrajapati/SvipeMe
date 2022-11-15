import React from 'react'
import { View, Text ,Image,useWindowDimensions,StyleSheet, ScrollView} from 'react-native';
import MyDatePicker from './DatePicker';
import Input from './inputWithLabel';
const Onboard = (props) => {
    const {width}=useWindowDimensions()

    return (
        <View style={[styles.container,{width}]}>
         <Image source={props.item.image} style={[styles.image,{width,resizeMode:'contain'}]}/>
        <ScrollView style={{flex:0.7}}>
         <View style={{flex:0.6,width:width*0.9,justifyContent:'center'}}>
             {props.item.inputs&&props.item.inputs.map((item)=>
           {  
            // console.log(item.date)
            return(
            <View key={item.id}>
             {!item.date?<Input
                  id={item.id}
                  label={item.label}
                  required={item.required}
                  placeholder={item.placeholder}
                  errorText={item.errorText}
                  initialValue={item.initialValue}
                  multiline={item.multiline}
                  onInputChange={props.jobInputChangeHandler}
                />:<MyDatePicker
                 id={item.id}
                label={item.label} 
                onInputChange={props.jobInputChangeHandler} />}
             </View>
            )
             })

             }
        
        </View>  
             
        </ScrollView>
        </View>
    )
}

export default Onboard
const styles = StyleSheet.create({
    container:{
    flex:1,
    alignItems:'center'
    },
    image:{
       flex:0.6,
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
