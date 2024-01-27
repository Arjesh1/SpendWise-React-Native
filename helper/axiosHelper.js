import axios from "axios";
import { setTransactionData } from "../reduxStore/transactionSlice";
import { setToken, setUserData } from "../reduxStore/userAuthSlice";

const serverUrl = process.env.EXPO_PUBLIC_SERVER_URL

const registerUrl = serverUrl + 'auth/register'
const loginUrl =  serverUrl + 'auth/login'
const updateProfileUrl = serverUrl + 'auth/user'
const changePasswordUrl = serverUrl + 'auth/user/changePassword'
const getAddUpdateTransactionUrl = serverUrl + 'transaction'

export const registerUser = async (registerData) => {
    try {
      if(serverUrl){
        const response = await axios.post(registerUrl, registerData);
      return response.data
      }
    } catch (error) {
      if (error.response) {
        return (error.response.data);
      } else if (error.request) {
        return ({message:'Something went wrong. Please try again!'});
      } else {
        return ({message:'Something went wrong. Please try again!'});
      }
    }
  };

  export const loginUser = (loginData)=> async (dispatch) => {
    try {
      const response = await axios.post(loginUrl, loginData);
      if(response.data.message){
        return response.data
      }
      dispatch(setUserData(response.data.userData))
      dispatch(setToken(response.data.token))
      dispatch(getUserTransaction(response.data.token))
    } catch (error) {
      if (error.response) {
        return (error.response.data)
      } else if (error.request) {
        return ({message:'Something went wrong. Please try again!'});
      } else {
        return ({message:'Something went wrong. Please try again!'});
      }
    }
  };

  export const updateProfile = async (updatedUserData)=>{
    try {
      const updateProfileResponse = await axios.put(updateProfileUrl, updatedUserData)
      return updateProfileResponse.data
    } catch (error) {
      if (error.response) {
        return (error.response.data)
      } else if (error.request) {
        return ({message:'Something went wrong. Please try again!'});
      } else {
        return ({message:'Something went wrong. Please try again!'});
      }
    }
  }

  export const changePassword = async (passwordData)=>{
    try {
      const updateProfileResponse = await axios.put(changePasswordUrl, passwordData)
      return updateProfileResponse.data
    } catch (error) {
      if (error.response) {
        return (error.response.data)
      } else if (error.request) {
        return ({message:'Something went wrong. Please try again!'});
      } else {
        return ({message:'Something went wrong. Please try again!'});
      }
    }
  }

  export const getUserTransaction = (token)=> async (dispatch)=>{ 
    try {
      const getAllTransaction =  await axios.get(getAddUpdateTransactionUrl, {
        headers:{
          Authorization: token,
        },
      }) 
      if(getAllTransaction.data.message){
        return getAllTransaction.data
      }
      dispatch(setTransactionData(getAllTransaction.data))
      
    } catch (error) {
      if (error.response) {
        return (error.response.data)
      } else if (error.request) {
        return ({message:'Something went wrong. Please try again!'});
      } else {
        return ({message:'Something went wrong. Please try again!'});
      }
      
    }
  }

  export const addTransaction = (transactionInputValues, token) => async (dispatch)=>{
    try {
        const addTransactionResponse = await axios.post(getAddUpdateTransactionUrl, transactionInputValues, {
          headers:{
            Authorization: token,
          },
        })
        if(addTransactionResponse.data.success){
          dispatch(getUserTransaction(token))
        }
        return  addTransactionResponse.data

    } catch (error) {
      if (error.response) {
        return (error.response.data)
      } else if (error.request) {
        return ({message:'Something went wrong. Please try again!'});
      } else {
        return ({message:'Something went wrong. Please try again!'});
      }
    }
  }

  export const updateTransaction = (transactionInputValues, token) => async (dispatch)=>{
    try {
        const addTransactionResponse = await axios.put(getAddUpdateTransactionUrl, transactionInputValues, {
          headers:{
            Authorization: token,
          },
        })
        if(addTransactionResponse.data.success){
          dispatch(getUserTransaction(token))
        }
        return  addTransactionResponse.data
      
    } catch (error) {
      if (error.response) {
        return (error.response.data)
      } else if (error.request) {
        return ({message:'Something went wrong. Please try again!'});
      } else {
        return ({message:'Something went wrong. Please try again!'});
      }
    }
  }
