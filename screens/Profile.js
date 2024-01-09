import React, { useState } from 'react'
import { Text, View, StyleSheet, SafeAreaView, Image } from 'react-native'
import { GlobalStyles } from '../constants/styles'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import * as Progress from 'react-native-progress';
import TransactionBanner from '../components/common/TransactionBanner';
import ButtonComponent from '../components/common/ButtonComponent';
import { useDispatch } from 'react-redux';
import { setShowCustomModal } from '../reduxStore/systemSlice';
import ModalComponent from '../components/common/ModalComponent';
import TransactionInput from '../components/common/TransactionInput';

const Profile = () => {
    const dispatch = useDispatch()
    const [editProfileData, setEditProfileData] = useState({email: 'arjes.khadka.com', name:'Arjesh Khadka', goal: '50000' })

    function setEditEmailData(email) {
        setEditProfileData((currentValues) => {
            return {
                ...currentValues,
                'email': email
            }
        })
    }

    function setEditNameData(name) {
        setEditProfileData((currentValues) => {
            return {
                ...currentValues,
                'name': name
            }
        })
    }
    function setEditSavingData(goal) {
        setEditProfileData((currentValues) => {
            return {
                ...currentValues,
                'goal': goal
            }
        })
    }

    const handleOnEditProfileSubmit = () => {
        console.log(editProfileData)
        
    }

    const handleOnLogOut = () => {
        console.log('Logout')
    }

    

    const editFormTextInputs =[
        {
            label: 'Full Name',
            placeholder: 'John Smith',
            keyboardType: 'default',
            value: editProfileData.name,
            changeHandler: setEditNameData,

        },
        
        {
            label: 'Email Address',
            placeholder: 'john@smith.com',
            keyboardType: 'email-address',
            value: editProfileData.email,
            changeHandler: setEditEmailData
        },

        {
            label: 'Saving Goals',
            placeholder: '$5000',
            keyboardType: 'numeric',
            value: editProfileData.goal,
            changeHandler: setEditSavingData
        },

    ]

    function editProfileForm (){
        return(
            <View style={{gap: 10}}>
                {editFormTextInputs.map((input)=>(
                    <>
                        <Text key={input} style={[styles.detailText, { fontWeight: 'bold', textAlign: 'center' }]}>{input.label}</Text><TransactionInput inputStyles={{ borderWidth: 1, textAlign: 'center' }} textInputConfig={{ placeholder: input.placeholder, value:input.value, editable:true, keyboardType: input.keyboardType, onChangeText: (changeText) => input.changeHandler(changeText) }} />
                    </>
                ))}
                
            </View>
            
            
            
        ) 
    }
  return (
    <>
          <ModalComponent headerText='Edit Profile' submitText='Edit' onPress={() => handleOnEditProfileSubmit()} icon={<FontAwesome5 name="user-edit" size={35} color={GlobalStyles.colors.primary700} />} additionalBody={editProfileForm()}/>
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

              <View style={styles.savingsGoalWrapper}>
                  <View style={styles.iconWrapper}>
                      <FontAwesome name='dollar' color={GlobalStyles.colors.primary700} size={30} />
                  </View>
                  <View style={styles.savingDescriptionWrapper}>
                      <Text style={{ fontSize: 20, fontWeight: 'bold', paddingVertical: 5 }}>Saving goals</Text>
                      <View>
                          <Progress.Bar progress={0.7} width={null} color={GlobalStyles.colors.primary700} unfilledColor={GlobalStyles.colors.gray200} borderWidth={0} />
                          <View style={styles.savingAmountwrapper}>
                              <Text>$ 50</Text>
                              <Text>$ 500</Text>
                          </View>
                      </View>

                  </View>
              </View>

              <View style={styles.transactionsWrapper}>
                  <TransactionBanner name='Income' icon='money-bill-wave-alt' />
                  <TransactionBanner name='Expenses' icon='shopping-bag' />

              </View>

              <View style={styles.transactionsWrapper}>
                  <TransactionBanner name='Current Balance' icon='coins' />
              </View>

              <View style={styles.buttonWrapper}>
                  <ButtonComponent name='Edit Profile' type='positiveText' onPress={()=>dispatch(setShowCustomModal(true))} />
                  <ButtonComponent name='Change Password' type='errorText' onPress={() => dispatch(setShowCustomModal(true))} />
                  <ButtonComponent name='Log Out' type='negativeBg' onPress={handleOnLogOut} />
              </View>
          </View> 
    </>
     
  )
}

export default Profile
const styles = StyleSheet.create({
    profileWrapper:{
        flex: 1,
        paddingTop: 50,
        paddingHorizontal: 10,
        backgroundColor: GlobalStyles.colors.primary700,
        justifyContent: 'space-evenly'
    },
    profileImgWrapper:{
        marginTop: 15,
        alignItems: 'center'
    },
    profileImg:{
        width: '50%',
        aspectRatio:1,
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
    savingsGoalWrapper:{
        backgroundColor:GlobalStyles.colors.white,
        flexDirection: 'row',
        margin: 7,
        padding: 20,
        borderRadius: 15,
        justifyContent: 'space-between',
        alignItems:'center',
    },
    iconWrapper:{
        backgroundColor:GlobalStyles.colors.primary100,
        width: '15%',
        aspectRatio: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        flex: 1

    },
    savingDescriptionWrapper:{
        flex: 5,
        paddingLeft: 10,
    },
    savingAmountwrapper:{
        flexDirection:'row',
        justifyContent: 'space-between'
    },
    transactionsWrapper:{
        flexDirection: 'row',
        margin: 7,
        gap:10,
        alignItems: 'center',
    },
    transaction:{
        backgroundColor: GlobalStyles.colors.white,
        flex:1,
        alignItems:'center',
        justifyContent: 'center',
        padding: 18,
        borderRadius: 15,
        flexDirection:'row',
        gap: 20
    },
    buttonWrapper:{
        gap: 10,
    },
})