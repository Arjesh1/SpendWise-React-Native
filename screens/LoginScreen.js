import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Image, KeyboardAvoidingView, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import { GlobalStyles } from '../constants/styles'
import ButtonComponent from '../components/common/ButtonComponent'
import Foundation from 'react-native-vector-icons/Foundation';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AuthInputComponent from '../components/common/AuthInputComponent'
import ModalComponent from '../components/common/ModalComponent';
import TransactionInput from '../components/common/TransactionInput';
import { useDispatch, useSelector } from 'react-redux';
import { setShowCustomModal, setShowLoader } from '../reduxStore/systemSlice';
import LoadingComponent from '../components/common/LoadingComponent';
import { setToken, setUserData } from '../reduxStore/userAuthSlice';
import { emailChecker } from '../validators/inputChecker';
import { Toast } from 'toastify-react-native';
import { getUserTransaction, loginUser, registerUser, sendOTP } from '../helper/axiosHelper';
import { useFocusEffect } from '@react-navigation/native';
import { setTransactionData } from '../reduxStore/transactionSlice';
import { OTPInputField } from '../components/common/OTPInputField';

const LoginScreen = ({navigation}) => {
    const [loginActive, setLoginActive] = useState(true)
    const [resetPasswordEmail, setResetPasswordEmail] = useState()
    const [otpValue, setOtpValue] = useState('')
    const [authData, setAuthData] = useState({})
    const [error, setError] = useState(null)
    const [resetError, setResetError]= useState(null)
    const dispatch = useDispatch()
    const {token} = useSelector(state=> state.user)
    const [modalSwitch, setModalSwitch] = useState('')
    const [resetPassword, setResetPassword] = useState({})

    useFocusEffect(
        React.useCallback(() => {
            if(token){
                navigation.navigate('Home')
              } else{
                navigation.navigate('Login')
              }
        }, [token, navigation])
      );

    function emailHandler(email) {
        setAuthData((currentValues) => {
            return {
                ...currentValues,
                'email': email.toLowerCase()
            }
        })
        setError(null)
    }

    function passwordHandler(password) {
        setAuthData((currentValues) => {
            return {
                ...currentValues,
                'password': password
            }
        })
        setError(null)
    }

    function confirmPasswordHandler(confirmPassword) {
        setAuthData((currentValues) => {
            return {
                ...currentValues,
                'confirmPassword': confirmPassword,
                'goal':'',
            }
        })
        setError(null)
    }

    function nameHandler(name) {
        setAuthData((currentValues) => {
            return {
                ...currentValues,
                'name': name
            }
        })
        setError(null)
    }

    const handleOnLogin = async () => {
        if (!authData.email || !authData.password){
            setError(['All fields are required']);
        }else if (!emailChecker(authData.email) && authData.password.length < 6) {
            setError(['Email is invalid.','Password must be more than 6 characters long.']);
        } else if (!emailChecker(authData.email)){
            setError(['Email is invalid!'])
        } else if (authData.password.length < 6) {
            setError(['Password must be more than 6 characters!'])
        } else {
            setError(null);
            setAuthData()
            dispatch(setShowLoader(true))
            const loginResult =  await dispatch(loginUser(authData))
            if(loginResult && loginResult.message){
                dispatch(setShowLoader(false))
                return Toast.error(loginResult.message);
            }
            dispatch(setShowLoader(false))
            Toast.success('Login successfully');
            navigation.navigate('Home')
        }
    }

    const handleOnRegister = async () => {
        if (!authData.name || !authData.email || !authData.password || !authData.confirmPassword){
             return setError(['All fields are required.'])
        }  else if (!emailChecker(authData.email)) {
            return setError(['Email is invalid.'])
        } else if (authData.password.length < 6) {
            return setError(['Password must be more than 6 characters.'])
        } else if (authData.password !== authData.confirmPassword) {
            return setError(['Password and confirm password do not match.'])
        } else {
            setError(null);
            setAuthData()
            dispatch(setShowLoader(true))
            const registerResult = await registerUser(authData)
            if(registerResult && registerResult.message){
                dispatch(setShowLoader(false))
                return Toast.error(registerResult.message);
            }
            dispatch(setUserData(registerResult.userData))
            dispatch(setToken(registerResult.token))
            dispatch(setShowLoader(false))
            Toast.success('Registered successfully');
            navigation.navigate('Home')
        }
    }


    const handleOnforgetPw = async()=>{
        if(!resetPasswordEmail.email){
            return setResetError('Email address is required.')
        } else if (!emailChecker(resetPasswordEmail.email)){
            return setResetError('Email address is invalid.')
        } else{
            const emailResetResponse = await sendOTP(resetPasswordEmail)
            setResetError(null)
            if(emailResetResponse.success){
                Toast.success(emailResetResponse.success);
                return setModalSwitch('OTP')
            } else {
                dispatch(setShowCustomModal(false))
                Toast.error(emailResetResponse.message);
            }
        }
    }

    const handleOnSubmitOTP =()=>{
        if(!otpValue || otpValue.length!== 6){
            return setResetError('6 digit OTP is required.')
        } else{
            setResetError(null)
            return setModalSwitch('NewPassword')
        }
    }

    const handleOnResetNewPassword =()=>{
        if(!resetPassword.password || !resetPassword.confirmPassword){
            return setResetError('Password and confirm Password is required.')
        } else if (resetPassword.password.length < 6){
            return setError(['Password must be more than 6 characters.'])
        } else if(resetPassword.password !== resetPassword.confirmPassword){
            return setError(['Password and confirm password do not match.'])
        } else {
            setResetError(null)
            dispatch(setShowCustomModal(false))
            setModalSwitch('')
            return setModalContents(resetEmailContents)
        }
    }

    function loginForm() {
        return (
            <View key={authData}>
                <AuthInputComponent icon={<Foundation name='mail' size={30} />} textInputConfig={{ placeholder: 'Email', keyboardType: 'default', onChangeText: emailHandler, inputMode:'email', maxLength:20 }} />

                <AuthInputComponent icon={<Foundation name='lock' size={30} />} textInputConfig={{ placeholder: 'Password', keyboardType: 'default', onChangeText: passwordHandler, secureTextEntry: true, maxLength: 15 }} />

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
            </View>
        )
    }

    function registerForm() {
        return (
            <View key={authData}>
                <AuthInputComponent icon={<FontAwesome name='user' size={30} />} textInputConfig={{ placeholder: 'Full Name', onChangeText: nameHandler, maxLength: 20 }} />

                <AuthInputComponent icon={<Foundation name='mail' size={30} />} textInputConfig={{ placeholder: 'Email', inputMode: 'email', onChangeText: emailHandler, maxLength: 20 }} />

                <AuthInputComponent icon={<Foundation name='lock' size={30} />} textInputConfig={{ placeholder: 'Password', onChangeText: passwordHandler, secureTextEntry: true, maxLength: 15 }} />

                <AuthInputComponent icon={<Foundation name='lock' size={30} />} textInputConfig={{ placeholder: 'Confirm Password', onChangeText: confirmPasswordHandler, secureTextEntry: true, maxLength: 15 }} />

                {error && error.map((error, i) => <Text key={error} style={{ color: 'red', paddingLeft: 10 }}>{`${i + 1}. ${error}`}</Text>)}

                <View style={styles.buttonWrapper}>
                    <ButtonComponent onPress={() => handleOnRegister()} name="Register" type='positiveBg' />
                </View>
            </View>
        )
    }

    const resetEmailContents = {
        headerText: 'Reset Password',
        onPress: () => handleOnforgetPw(),
        errorMsg: resetError,
        icon: (
          <View style={{ padding: 15, backgroundColor: GlobalStyles.colors.error100, borderRadius: 99 }}>
            <FontAwesome name="warning" size={30} color={GlobalStyles.colors.error700} />
          </View>
        ),
        submitText: 'Next',
        bodyDetailText: 'Are you sure you want to reset your account password? You will receive an OTP to reset your password on your nominated email.',
        additionalBody: (
          <>
            <Text style={[styles.detailText, { fontWeight: 'bold', textAlign: 'center' }]}>Email address</Text>
            <TransactionInput
              inputStyles={{ borderWidth: 1, textAlign: 'center' }}
              textInputConfig={{
                placeholder: 'johnsmith@gmail.com',
                onChangeText: (email) => setResetPasswordEmail({"email": email}),
              }}
            />
          </>
        ),
      };
      const [ modalContents, setModalContents ] = useState({ ...resetEmailContents });

      const submitOTPContent = {
        headerText: 'Verify OTP',
        onPress: () => handleOnSubmitOTP(),
        errorMsg: resetError,
        submitText: 'Submit',
        bodyDetailText: `Please enter the 6-digit verification code that you've received in your email to proceed.`,
        additionalBody: (
          <>
            <Text style={[styles.detailText, { fontWeight: 'bold', textAlign: 'center' }]}>OTP</Text>
            <OTPInputField onChangeText={setOtpValue}/>
          </>
        ),
        icon: (
            <View style={{ padding: 15, backgroundColor: GlobalStyles.colors.error100, borderRadius: 99 }}>
              <MaterialCommunityIcons name="form-textbox-password" size={30} color={GlobalStyles.colors.error700} />
            </View>
          )
      };

      function resetPasswordHandler(password) {
        setResetPassword((currentValues) => {
            return {
                ...currentValues,
                'password': password
            }
        })
        setError(null)
    }

    function resetConfirmPasswordHandler(confirmPassword) {
        setResetPassword((currentValues) => {
            return {
                ...currentValues,
                'confirmPassword': confirmPassword
            }
        })
        setError(null)
    }

      const newPasswordInputContent = {
        headerText: 'New Password',
        onPress: () => handleOnResetNewPassword(),
        errorMsg: resetError,
        submitText: 'Submit',
        bodyDetailText: `Please enter the new password that you wish to set up.`,
        additionalBody: (
          <>
            <AuthInputComponent icon={<Foundation name='lock' size={30} />} textInputConfig={{ placeholder: 'New Password', onChangeText: resetPasswordHandler, secureTextEntry: true, maxLength: 15 }} />

            <AuthInputComponent icon={<Foundation name='lock' size={30} />} textInputConfig={{ placeholder: 'Confirm Password', onChangeText: resetConfirmPasswordHandler, secureTextEntry: true, maxLength: 15 }} />  
          </>
        ),
        icon: (
            <View style={{ padding: 15, backgroundColor: GlobalStyles.colors.primary100, borderRadius: 99 }}>
              <MaterialCommunityIcons name="form-textbox-password" size={30} color={GlobalStyles.colors.primary700} />
            </View>
          )

      } 

      useEffect(()=>{
        if(modalSwitch === 'OTP'){
            setModalContents(submitOTPContent)
        } else if(modalSwitch === 'NewPassword'){
            setModalContents(newPasswordInputContent)
        } else{
            setModalContents(resetEmailContents)
        }
      },[modalSwitch, resetError, resetPasswordEmail, otpValue, resetPassword])

      const handleModalCancel = ()=>{
        setResetError(null)
        setModalSwitch('')
    }
 
  return (
    <>
          <LoadingComponent/>
          <ModalComponent {...modalContents} key={modalContents || modalSwitch || error} onCancel={handleModalCancel}/>

      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
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
                  <View style={{ ...styles.footerWrapper}}>
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
        paddingTop:0,
        paddingHorizontal: 18,
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

