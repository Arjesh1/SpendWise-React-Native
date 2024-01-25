import axios from "axios";

const serverUrl = process.env.EXPO_PUBLIC_SERVER_URL

const registerUrl = serverUrl + 'auth/register'
const loginUrl =  serverUrl + 'auth/login'
const updateProfileUrl = serverUrl + 'auth/user'
const addUpdateTransactionUrl = serverUrl + 'transaction'

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

  export const loginUser = async (loginData) => {
    try {
      if(serverUrl){
        const response = await axios.post(loginUrl, loginData);
      return response.data
      }
    } catch (error) {
      if (error.response) {
        return (error.response.data)
        ;
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