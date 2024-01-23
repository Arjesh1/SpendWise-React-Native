import axios from "axios";

const serverUrl = process.env.EXPO_PUBLIC_SERVER_URL

const registerUrl = serverUrl + 'auth/register'

export const registerUser = async (userData) => {
    try {
      if(serverUrl){
        const response = await axios.post(registerUrl, userData);
      return response.data
      }
    } catch (error) {
      if (error.response) {
        return (error.response.data);
      } else if (error.request) {
        console.error({message:'Something went wrong. Please try again!'});
      } else {
        console.error({message:'Something went wrong. Please try again!'});
      }
    }
  };