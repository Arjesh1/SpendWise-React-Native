import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import { GlobalStyles } from '../../constants/styles';

const data = [
    { label: 'Income', value: 'income' },
    { label: 'Expenses', value: 'expenses' },
];

const DropdownComponent = ({ label, selectedType }) => {
    const [value, setValue] = useState();
    const [isFocus, setIsFocus] = useState(false);
    const handleOnTypeSelected =(type) =>{
        selectedType(type)
    }

    return (
        <>
            <Text style={styles.labelText}>{label}:</Text>
            <Dropdown
                style={[styles.dropdown, isFocus && { borderColor: GlobalStyles.colors.primary500 }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                data={data}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? 'Select type' : ''}
                searchPlaceholder="Search..."
                value={value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                    handleOnTypeSelected(item.value)
                    setValue(item.value);
                    setIsFocus(false);
                }}
            />
        </>
    );
};

export default DropdownComponent;

const styles = StyleSheet.create({
    labelText: {
        fontSize: 18,
        color: GlobalStyles.colors.gray500,
    },
    dropdown: {
        borderColor: GlobalStyles.colors.gray400,
        borderBottomWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    icon: {
        marginRight: 5,
    },
    placeholderStyle: {
        fontSize: 20,
        color: GlobalStyles.colors.gray500,
        textAlign: 'center'
    },
    selectedTextStyle: {
        fontSize: 20,
        textAlign: 'center'
    },

});
