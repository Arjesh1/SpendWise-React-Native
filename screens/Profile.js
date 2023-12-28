import React from 'react'
import { Text, View, StyleSheet, SafeAreaView, Image } from 'react-native'
import { GlobalStyles } from '../constants/styles'

const Profile = () => {
  return (
    <View style={styles.profileWrapper}>
        <View style={styles.profileImgWrapper}>
            <View style={styles.profileImg}>
                  <Image
                      style={styles.profilePicture}
                      source={{
                          uri: 'https://www.pngarts.com/files/5/User-Avatar-PNG-Background-Image.png',
                      }}
                  />
            </View>

        </View>
        <View style={styles.profileDetailsWrapper}>
            <Text style={styles.profileName}>Arjesh Khadka</Text>
        </View>

    </View>  

  )
}

export default Profile
const styles = StyleSheet.create({
    profileWrapper:{
        flex: 1,
        paddingTop: 18,
        paddingHorizontal: 5,
        backgroundColor: GlobalStyles.colors.primary700
    },
    profileImgWrapper:{
        marginTop: 15,
        alignItems: 'center'
    },
    profileImg:{
        width: '40%',
        aspectRatio:1,
        backgroundColor:'red',
        borderRadius: 999,
        justifyContent:'center',
        alignItems:'center'

    },
    profilePicture: {
        width: '100%',
        height: '100%',
        borderRadius: 999,
        resizeMode: 'cover'
    },
    profileDetailsWrapper:{
        marginTop: 5,
        alignItems:'center'
    },
    profileName:{
        fontSize: 30,
        fontWeight:'bold',
        color:GlobalStyles.colors.white
    },
})