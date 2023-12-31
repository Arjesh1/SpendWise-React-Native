import React from 'react'
import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { GlobalStyles } from '../constants/styles'

const LoginScreen = () => {
  return (
      
    <View style={styles.loginWrapper}>
        <View style={styles.loginTopBanner}>
            <View style={styles.logoWrapper}>
                <SafeAreaView>
                      <Image source={require('../assets/images/logo.png')} style={styles.logoImage} />
                </SafeAreaView>
            </View>
            <View>
                <Text> hello</Text>
            </View>
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
        minHeight: '33%',
        borderBottomLeftRadius: 99,
        borderBottomRightRadius: 99,
        justifyContent: 'flex-end',
        alignItems:'center',
        padding: 10
    },
    logoWrapper:{
        flex: 1,
    },
    logoImage:{
        resizeMode: 'contain'
    },

})

