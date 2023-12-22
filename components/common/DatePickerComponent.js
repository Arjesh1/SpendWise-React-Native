import React, { useState } from 'react';
import { View, Button, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

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
              <Button onPress={showDatepicker} title="Date" />
          </View>
          {show && (
              <DateTimePicker
                  testID="dateTimePicker"
                  value={new Date(date)}
                  mode={mode}
                  is24Hour={true}
                  display="default"
                  onChange={onChange}
              />
          )}
      </View>
  )
}

export default DatePickerComponent
