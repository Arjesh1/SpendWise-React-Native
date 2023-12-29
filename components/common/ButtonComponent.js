import React, { useEffect, useState } from 'react'
import { Pressable, Text, StyleSheet } from 'react-native'
import { GlobalStyles } from '../../constants/styles'

const ButtonComponent = ({ name, onPress, type }) => {
    const [buttonType, setButtonType] = useState()
    useEffect(()=>{
        if(type === 'positiveBg'){
            setButtonType(styles.positiveBackground)
        } else if (type === 'negativeBg'){
            setButtonType(styles.errorBackground)
        } else if (type === 'errorText') {
            setButtonType(styles.errorText)
        } else if (type === 'positiveText') {
            setButtonType(styles.positiveText)
        }
    },[])

    const handleOnButtonPressed =()=>{
        onPress()
    }
  return (
      <Pressable onPress={handleOnButtonPressed}>
          {/* <Text style={name === 'Delete' ? [styles.buttonText, styles.errorBackground] :[styles.buttonText, styles.positiveBackground]}>{name}</Text> */}
          <Text style={ [styles.buttonText, buttonType]}>{name}</Text>
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
        fontSize: 18,
        fontWeight: 'bold'
    },

    positiveBackground:{
        backgroundColor: GlobalStyles.colors.primary600,
        color: GlobalStyles.colors.white,
    },
    errorBackground:{
        backgroundColor: GlobalStyles.colors.error700,
        color: GlobalStyles.colors.white,
    },
    positiveText:{
        color: GlobalStyles.colors.primary700,
        backgroundColor: GlobalStyles.colors.gray100,

    }, 
    errorText:{
        color: GlobalStyles.colors.error700,
        backgroundColor: GlobalStyles.colors.white,
    }
})
