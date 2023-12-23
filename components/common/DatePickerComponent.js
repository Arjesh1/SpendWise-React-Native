import React, { useState } from 'react';
import { View, Button, Platform, Pressable } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AntDesign from 'react-native-vector-icons/AntDesign';

const DatePickerComponent = () => {
    const [date, setDate] = useState(Date.now());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    console.log(date, new Date(date).toDateString())

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

  return (
      <View>
          <View>
              {Platform.OS === 'ios' && !show ?
                  <Pressable onPress={showDatepicker}>
                      <AntDesign name='calendar' size={30} />
                  </Pressable>: 
                  Platform.OS === 'android'?
                      <Pressable onPress={showDatepicker}>
                          <AntDesign name='calendar' size={30} />
                      </Pressable>:
                  null}
          </View>
          {show && (
              <DateTimePicker
                  testID="datePicker"
                  value={new Date(date)}
                  mode={mode}
                  display="default"
                  onChange={onChange}
              />
          )}
      </View>
  )
}

export default DatePickerComponent
