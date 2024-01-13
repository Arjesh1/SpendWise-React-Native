import React, { useState } from 'react'
import { ActivityIndicator, Image, KeyboardAvoidingView, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import { GlobalStyles } from '../constants/styles'
import ButtonComponent from '../components/common/ButtonComponent'
import Foundation from 'react-native-vector-icons/Foundation';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AuthInputComponent from '../components/common/AuthInputComponent'
import ModalComponent from '../components/common/ModalComponent';
import TransactionInput from '../components/common/TransactionInput';
import { useDispatch } from 'react-redux';
import { setShowCustomModal, setShowLoader } from '../reduxStore/systemSlice';
import LoadingComponent from '../components/common/LoadingComponent';
import { setUserData } from '../reduxStore/userAuthSlice';

const LoginScreen = ({navigation}) => {
    const [loginActive, setLoginActive] = useState(true)
    const [resetPasswordEmail, setResetPasswordEmail] = useState('')
    const [authData, setAuthData] = useState({})
    const [error, setError] = useState(null)
    const [resetError, setResetError]= useState(null)
    const dispatch = useDispatch()

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
                'confirmPassword': confirmPassword,
                'goal':''
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
        // if (!authData.email || !authData.password){
        //     setError(['All fields are required']);
        // }else if (!isValidEmail(authData.email) && authData.password.length < 6) {
        //     setError(['Email is invalid.','Password must be more than 6 characters long.']);
        // } else if (!isValidEmail(authData.email)){
        //     setError(['Email is invalid!'])
        // } else if (authData.password.length < 6) {
        //     setError(['Password must be more than 6 characters!'])
        // } else {
            setError(null);
            console.log(authData)
            navigation.navigate('Home')
        // }
    }

    const handleOnRegister = () => {
        if (!authData.name || !authData.email || !authData.password || !authData.confirmPassword){
            setError(['All fields are required.'])
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
            const { confirmPassword, ...rest } = authData
            dispatch(setShowLoader(true))
            setTimeout(()=>{
             dispatch(setShowLoader(false))
            },3000)
            setTimeout(() => {
                dispatch(setUserData(rest))
                navigation.navigate('Home')
            }, 3010)
        }
    }


    const handleOnforgetPw =()=>{
        if(!resetPasswordEmail){
            setResetError('Email address is required.')
        } else if (!isValidEmail(resetPasswordEmail)){
            setResetError('Email address is invalid.')
        } else{
            console.log(resetPasswordEmail)
        }
    }

    function loginForm() {
        return (
            <>
                <AuthInputComponent icon={<Foundation name='mail' size={30} />} textInputConfig={{ placeholder: 'Email', keyboardType: 'default', onChangeText: emailHandler }} />

                <AuthInputComponent icon={<Foundation name='lock' size={30} />} textInputConfig={{ placeholder: 'Password', keyboardType: 'default', onChangeText: passwordHandler, secureTextEntry: true }} />

                <View style={styles.forgetPwWrapper}>
                    <Pressable onPress={() => dispatch(setShowCustomModal(true))}><Text style={styles.forgetPwText}>Forget Password?</Text></Pressable>
                </View>

                {error && error.map((error, i) => <Text key={error} style={{ color: 'red', paddingLeft: 10 }}>{`${i+1}. ${error}`}</Text>)}

                <View style={styles.buttonWrapper}>
                    <ButtonComponent onPress={() => handleOnLogin()} name="Login" type='positiveBg' />
                </View>

                <View>
                    <Text style={styles.otherOptionText}>Or log in with</Text>
                    <View>
                        <ButtonComponent disabled={true} onPress={() => handleOnLogin()} name={
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
          <LoadingComponent/>
          <ModalComponent headerText='Reset Password' onPress={()=> handleOnforgetPw()} errorMsg={resetError} icon={<View style={{ padding: 15, backgroundColor: GlobalStyles.colors.error100, borderRadius: 99 }}>
              <FontAwesome name="warning" size={30} color={GlobalStyles.colors.error700}/>
          </View>} submitText='Reset' bodyDetailText='Are you sure you want to reset your account password? You will receive an link to reset your password on your nominated email.' additionalBody={<><Text style={[styles.detailText, { fontWeight: 'bold', textAlign: 'center' }]}>Email address</Text><TransactionInput inputStyles={{ borderWidth: 1, textAlign: 'center' }} textInputConfig={{ placeholder: 'johnsmith@gmail.com', onChangeText: (email)=> setResetPasswordEmail(email) }} /></>}/>

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

