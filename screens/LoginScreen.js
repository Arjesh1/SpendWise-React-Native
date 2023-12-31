import React, { useState } from 'react'
import { Image, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { GlobalStyles } from '../constants/styles'
import ButtonComponent from '../components/common/ButtonComponent'
import TransactionInput from '../components/common/TransactionInput'
import Foundation from 'react-native-vector-icons/Foundation';

const LoginScreen = () => {
    const [loginActive, setLoginActive] = useState(true)

    function emailChangeHandler(){

    }

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
                <Pressable onPress={()=>setLoginActive(true)}>
                      <Text style={loginActive ? [styles.activeAuth, styles.authText] : styles.authText}> Login </Text>
                </Pressable>
                  <Pressable onPress={() => setLoginActive(false)}>
                      <Text style={!loginActive ? [styles.activeAuth, styles.authText] : styles.authText}> Register </Text>
                </Pressable>
            </View>
        </View>
          <View style={styles.formWrapper}>
            <View style={styles.formComponentWrapper}>
                <Foundation name='mail' size={30}/>
                <TransactionInput textInputConfig={{ placeholder: 'Email', keyboardType: 'default', onChangeText: emailChangeHandler }} />

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
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
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
        marginTop: 10,
        flexDirection:'row',
        width: '100%',
        justifyContent: 'space-evenly'
    },
    authText:{
        color: GlobalStyles.colors.white,
        fontSize: 20,
        fontWeight: 'bold',
        paddingBottom: 5,
    },
    activeAuth:{
        borderBottomWidth: 2,
        borderBottomColor: GlobalStyles.colors.gray200,
    },
    formWrapper:{
        paddingHorizontal: 18
    },
    formComponentWrapper:{
        flexDirection:'row',
        alignItems: 'center'
    },

})

