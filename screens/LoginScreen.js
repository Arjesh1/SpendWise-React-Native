import React, { useState } from 'react'
import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { GlobalStyles } from '../constants/styles'
import ButtonComponent from '../components/common/ButtonComponent'

const LoginScreen = () => {
    const [loginActive, setLoginActive] = useState(false)

    const handleOnLogin=()=>{

    }
  return (
      
    <View style={styles.loginWrapper}>
        <View style={styles.loginTopBanner}>
            <View style={styles.logoWrapper}>
                <SafeAreaView>
                      <Image source={require('../assets/images/logo.png')} style={styles.logoImage} />
                </SafeAreaView>
            </View>
            <View style={styles.authWrapper}>
                  <Text style={loginActive ? [styles.activeAuth, styles.authText] :styles.authText}> Login </Text>
                  <Text style={!loginActive ? [styles.activeAuth, styles.authText] : styles.authText}> Register </Text>
            </View>
        </View>
      
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
    authWrapper:{
        flexDirection:'row',
        gap:20
    },
    authText:{
        color: GlobalStyles.colors.white,
        fontSize: 20,
        fontWeight: 'bold',
        paddingBottom: 5,
    },
    activeAuth:{
        borderBottomWidth: 2,
        borderBottomColor: GlobalStyles.colors.white,
    },

})

