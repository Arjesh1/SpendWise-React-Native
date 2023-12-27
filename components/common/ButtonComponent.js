import React from 'react'
import { Pressable, Text, StyleSheet } from 'react-native'
import { GlobalStyles } from '../../constants/styles'

const ButtonComponent = ({ name, onPress }) => {
    const handleOnButtonPressed =()=>{

    }
  return (
      <Pressable>
          <Text style={styles.buttonText}>{name}</Text>
      </Pressable>
  )
}

export default ButtonComponent

const styles = StyleSheet.create({
    buttonText: {
        backgroundColor: GlobalStyles.colors.primary600,
        textAlign: 'center',
        paddingVertical: 6,
        borderRadius: 5,
        color: GlobalStyles.colors.white,
        fontSize: 18,
        fontWeight: 'bold'
    }
})
