import React, { useState } from 'react';
import { View, Platform, Pressable } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AntDesign from 'react-native-vector-icons/AntDesign';

const DatePickerComponent = ({onDateSelected }) => {
    const [date, setDate] = useState(Date.now());
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
        onDateSelected(currentDate)
    };

  return (
      <View>
          <View>
              {Platform.OS === 'ios' && !show ?
                  <Pressable onPress={()=> setShow(true)}>
                      <AntDesign name='calendar' size={30} />
                  </Pressable>: 
                  Platform.OS === 'android'?
                      <Pressable onPress={()=> setShow(true)}>
                          <AntDesign name='calendar' size={30} />
                      </Pressable>:
                  null}
          </View>
          {show && (
              <DateTimePicker
                  testID="datePicker"
                  value={new Date(date)}
                  mode='date'
                  display="default"
                  onChange={onChange}
              />
          )}
      </View>
  )
}

export default DatePickerComponent
