import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { GlobalStyles } from '../constants/styles'

const LoginScreen = () => {
  return (
    <View style={styles.loginWrapper}>
        <View style={styles.loginTopBanner}>
            <Text> hello</Text>

        </View>
        <Text>Login Screen</Text>
      
    </View>
  )
}

export default LoginScreen
const styles = StyleSheet.create({
    loginWrapper:{
        flex: 1,
    },
    loginTopBanner:{
        backgroundColor: GlobalStyles.colors.primary600,
        height:'22%',
        borderBottomLeftRadius: 99,
        borderBottomRightRadius: 99,
    }

})

