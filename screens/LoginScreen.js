import React, { useState } from 'react'
import { Image, KeyboardAvoidingView, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import { GlobalStyles } from '../constants/styles'
import ButtonComponent from '../components/common/ButtonComponent'
import Foundation from 'react-native-vector-icons/Foundation';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AuthInputComponent from '../components/common/AuthInputComponent'
import ModalComponent from '../components/common/ModalComponent';

const LoginScreen = ({navigation}) => {
    const [loginActive, setLoginActive] = useState(true)
    const [authData, setAuthData] = useState({})
    const [error, setError] = useState(null)

    function isValidEmail(email) {
        return /\S+@\S+\.\S+/.test(email);
    }

    function emailHandler(email) {
        setAuthData((currentValues) => {
            return {
                ...currentValues,
                'email': email
            }
        })
    }

    function passwordHandler(password) {
        setAuthData((currentValues) => {
            return {
                ...currentValues,
                'password': password
            }
        })
    }

    function confirmPasswordHandler(confirmPassword) {
        setAuthData((currentValues) => {
            return {
                ...currentValues,
                'confirmPassword': confirmPassword
            }
        })
    }

    function nameHandler(name) {
        setAuthData((currentValues) => {
            return {
                ...currentValues,
                'name': name
            }
        })
    }

    const handleOnLogin = () => {
        if (!authData.email || !authData.password){
            setError(['Email and Password are required']);
        }else if (!isValidEmail(authData.email) && authData.password.length < 6) {
            setError(['Email is invalid.','Password must be more than 6 characters long.']);
        } else if (!isValidEmail(authData.email)){
            setError(['Email is invalid!'])
        } else if (authData.password.length < 6) {
            setError(['Password must be more than 6 characters!'])
        } else {
            setError(null);
            console.log(authData)
        }
    }

    const handleOnRegister = () => {
        if (!authData.name || !authData.email || !authData.password || !authData.confirmPassword){
            setError(['Name, Email, Password and Confirm  Password are required.'])
        } else if (!isValidEmail(authData.email) && authData.password.length < 6) {
            setError(['Email is invalid.','Password must be more than 6 characters long.']);
        } else if (!isValidEmail(authData.email)) {
            setError(['Email is invalid.'])
        } else if (authData.password.length < 6) {
            setError(['Password must be more than 6 characters.'])
        } else if (authData.password !== authData.confirmPassword) {
            setError(['Password and confirm password do not match.'])
        } else {
            setError(null);
            console.log(authData)
        }
    }


    const handleOnforgetPw =()=>{
        console.log('Thing harder')
    }

    function loginForm() {
        return (
            <>
                <AuthInputComponent icon={<Foundation name='mail' size={30} />} textInputConfig={{ placeholder: 'Email', keyboardType: 'default', onChangeText: emailHandler }} />

                <AuthInputComponent icon={<Foundation name='lock' size={30} />} textInputConfig={{ placeholder: 'Password', keyboardType: 'default', onChangeText: passwordHandler, secureTextEntry: true }} />

                <View style={styles.forgetPwWrapper}>
                    <Pressable onPress={handleOnforgetPw}><Text style={styles.forgetPwText}>Forget Password?</Text></Pressable>
                </View>

                {error && error.map((error, i) => <Text key={error} style={{ color: 'red', paddingLeft: 10 }}>{`${i+1}. ${error}`}</Text>)}

                <View style={styles.buttonWrapper}>
                    <ButtonComponent onPress={() => handleOnLogin()} name="Login" type='positiveBg' />
                </View>

                <View>
                    <Text style={styles.otherOptionText}>Or log in with</Text>
                    <View>
                        <ButtonComponent onPress={() => handleOnLogin()} name={
                            <FontAwesome name="google" size={30} />} type='positiveText' />
                    </View>
                </View>
            </>
        )
    }

    function registerForm() {
        return (
            <>
                <AuthInputComponent icon={<FontAwesome name='user' size={30} />} textInputConfig={{ placeholder: 'Full Name', onChangeText: nameHandler }} />

                <AuthInputComponent icon={<Foundation name='mail' size={30} />} textInputConfig={{ placeholder: 'Email', inputMode: 'email', onChangeText: emailHandler }} />

                <AuthInputComponent icon={<Foundation name='lock' size={30} />} textInputConfig={{ placeholder: 'Password', onChangeText: passwordHandler, secureTextEntry: true }} />

                <AuthInputComponent icon={<Foundation name='lock' size={30} />} textInputConfig={{ placeholder: 'Confirm Password', onChangeText: confirmPasswordHandler, secureTextEntry:true }} />

                {error && error.map((error, i) => <Text key={error} style={{ color: 'red', paddingLeft: 10 }}>{`${i + 1}. ${error}`}</Text>)}

                <View style={styles.buttonWrapper}>
                    <ButtonComponent onPress={() => handleOnRegister()} name="Register" type='positiveBg' />
                </View>
            </>
        )
    }


  return (
    <>
    <ModalComponent/>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'flex'}>
     <View style={styles.loginWrapper}>
        <View style={styles.loginTopBanner}>
             <ScrollView contentContainerStyle={{ flex: 1 }}>
               <View style={styles.logoWrapper}>
                <SafeAreaView>
                      <Image source={require('../assets/images/logo.png')} style={styles.logoImage} />
                </SafeAreaView>
              </View>
            </ScrollView>
            <View style={styles.authWrapper}>
                <Pressable onPress={()=>{setLoginActive(true); setError(null)}}>
                    <View style={loginActive? styles.activeAuth: null }>
                          <Text style={ styles.authText }> Login </Text>
                    </View>  
                </Pressable>
                  <Pressable onPress={() => { setLoginActive(false); setError(null) }}>
                      <View style={!loginActive ? styles.activeAuth : null}>
                          <Text style={styles.authText}> Register </Text>
                      </View>
                </Pressable>
            </View>
        </View>

        <View style={styles.formWrapper} key={loginActive}>
              <Text style={styles.authHeaderText}>{loginActive ? 'Welcome back !' : 'Create An Account'}</Text>
              {loginActive ? loginForm() : registerForm()}
        </View>

        <View style={styles.footerWrapper}>
        </View>
     </View>
    </KeyboardAvoidingView>
    </>

  )
}

export default LoginScreen
const styles = StyleSheet.create({
    loginWrapper:{
        flex: 1,
    },
    loginTopBanner:{
        backgroundColor: GlobalStyles.colors.primary600,
        flex: 4,
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        justifyContent: 'flex-end',
        alignItems:'center',
        padding: 10
    },
    logoWrapper:{
        flex: 1,
        justifyContent:'center',
        alignItems: 'center'
    },
    logoImage:{
        resizeMode: 'contain',
        height: '100%',
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
        padding:10,
        paddingHorizontal: 18,
        marginTop: 20,
        flex: 4,
        justifyContent: 'space-between',
    },
    formComponentWrapper:{
        flexDirection:'row',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: GlobalStyles.colors.gray400,
        paddingHorizontal: 10,
        borderRadius: 10,
        marginVertical: 10,
    },
    authHeaderText:{
        color: GlobalStyles.colors.primary500,
        fontSize: 35,
        fontWeight: 'bold',
        paddingVertical: 5,
        textAlign:'center'
    },
    forgetPwWrapper:{
        alignItems:'flex-end',
        paddingBottom: 5,
    },
    forgetPwText: {
        fontWeight: 'bold',
        color: GlobalStyles.colors.error600
    },
    buttonWrapper:{
        marginVertical: 15,
    },
    otherOptionText:{
        fontSize: 18,
        fontWeight: 'bold',
        color: GlobalStyles.colors.gray600,
        textAlign:'center',
        paddingVertical: 15

    },
    footerWrapper:{
        marginTop: '20%',
        backgroundColor: GlobalStyles.colors.primary700,
        flex: 1,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
    },
})

