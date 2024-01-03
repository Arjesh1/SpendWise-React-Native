import React, { useState } from 'react'
import { Image, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { GlobalStyles } from '../constants/styles'
import ButtonComponent from '../components/common/ButtonComponent'
import TransactionInput from '../components/common/TransactionInput'
import Foundation from 'react-native-vector-icons/Foundation';

const LoginScreen = ({navigation}) => {
    const [loginActive, setLoginActive] = useState(true)

    function emailChangeHandler(){

    }

    const handleOnLogin=()=>{
        navigation.navigate('Home')
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
          <Text style={styles.authHeaderText}>{loginActive ? 'Welcome back !' : 'Create An Account'}</Text>
          <View style={styles.formWrapper}>
            <View style={styles.formComponentWrapper}>
             <View style={{flex:1}}>
                <Foundation name='mail' size={30} />
             </View>
             <View style={{flex:5}}>
                <TransactionInput textInputConfig={{ placeholder: 'Email', keyboardType: 'default', onChangeText: emailChangeHandler }} />
             </View>
            </View>

              <View style={styles.formComponentWrapper}>
                  <View style={{ flex: 1 }}>
                      <Foundation name='lock' size={30} />
                  </View>
                  <View style={{ flex: 5 }}>
                      <TransactionInput textInputConfig={{ placeholder: 'Password', keyboardType: 'default', onChangeText: emailChangeHandler }} />
                  </View>
              </View>
              <View style={styles.forgetPwWrapper}>
                <Pressable><Text>Forget Password?</Text></Pressable>
              </View>

              <ButtonComponent onPress={() => handleOnLogin()} name='Login' type='positiveBg'/>   
          </View>

          <View style={styles.footerWrapper}>

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
        minHeight: '35%',
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
        paddingHorizontal: 18,
        marginTop: 20,
        gap: 20,
        flex: 1,
        justifyContent: 'center'
    },
    formComponentWrapper:{
        flexDirection:'row',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: GlobalStyles.colors.gray400,
        paddingHorizontal: 10,
        borderRadius: 10,
        
    },
    authHeaderText:{
        color: GlobalStyles.colors.primary500,
        fontSize: 25,
        fontWeight: 'bold',
        paddingVertical: 5,
        textAlign:'center'
    },
    forgetPwWrapper:{
        alignItems:'flex-end',
        paddingBottom: 5
    },

    footerWrapper:{
        marginTop: '20%',
        backgroundColor: GlobalStyles.colors.primary700,
        flex: 1,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
    },

})

