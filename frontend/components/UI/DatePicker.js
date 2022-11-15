import React, { useState ,useEffect} from 'react'
import DatePicker from 'react-native-datepicker'
 import {View,StyleSheet,Text} from 'react-native'
const  MyDatePicker=(props)=>{
  const [date,setDate]=useState("2022-01-15");
  const {onInputChange, id} = props;

  useEffect(() => {
      props.onInputChange(id, date,true);
  }, [date, onInputChange, id]);

    return (
        <View style={styles.formCtrl}>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>{props.label}</Text>
        </View>
        <DatePicker
        style={styles.input}
        date={date}
        mode="date"
        placeholder="select date"
        format="YYYY-MM-DD"
        minDate="2022-01-01"
        maxDate="2030-06-01"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0
          },
          dateInput: {
            marginLeft: 36
          }
          // ... You can check the source to find the other keys.
        }}
        onDateChange={(date) => setDate(date)}
      />
      </View>

    )
  }
const styles = StyleSheet.create({
  formCtrl: {
    width: '100%',
    marginBottom: '2%',
  },
  label: {
    fontWeight: '500',
    marginHorizontal: 8,
    marginTop: 8,
    color: '#393b3d',
  },
  input: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginTop: '1%',
    width:'100%',
  },
  errorContainer: {
    marginVertical: 5,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
  },
  labelContainer: {
    flexDirection: 'row',
  },
  star: {
    color: 'red',
  },
});
  export default MyDatePicker