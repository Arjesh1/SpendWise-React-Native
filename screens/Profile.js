import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet, SafeAreaView, Image } from 'react-native'
import { GlobalStyles } from '../constants/styles'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import * as Progress from 'react-native-progress';
import TransactionBanner from '../components/common/TransactionBanner';
import ButtonComponent from '../components/common/ButtonComponent';
import { useDispatch, useSelector } from 'react-redux';
import { setShowCustomModal } from '../reduxStore/systemSlice';
import ModalComponent from '../components/common/ModalComponent';
import TransactionInput from '../components/common/TransactionInput';
import { setUserData } from '../reduxStore/userAuthSlice';

const Profile = () => {
    const dispatch = useDispatch()
    const [profileData, setProfileData] = useState({})
    const [editProfileActive, setEditProfileActive] = useState(null)
    const [modalData, setModalData] = useState({})
    const { userData } = useSelector(state => state.user)
    const { transactionData } = useSelector(state => state.transaction)

    const totalIncome = Math.floor(transactionData?.filter((item) => item.type === 'income').reduce((total, item) => {
        return total + +item.amount
    }, 0))

    const totalExpenses = Math.floor(transactionData?.filter((item) => item.type === 'expenses').reduce((total, item) => {
        return total + +item.amount
    }, 0))

    useEffect(()=>{
        setProfileData(userData)
    }, [userData, profileData])

    function setEditEmailData(email) {
        setProfileData((currentValues) => {
            return {
                ...currentValues,
                'email': email
            }
        })
    }

    function setEditNameData(name) {
        setProfileData((currentValues) => {
            return {
                ...currentValues,
                'name': name
            }
        })
    }


    function setEditSavingData(goal) {
        setProfileData((currentValues) => {
            return {
                ...currentValues,
                'goal': goal
            }
        })
    }

    const editFormTextInputs = [
        {
            label: 'Full Name',
            placeholder: 'John Smith',
            keyboardType: 'default',
            value: profileData.name,
            changeHandler: setEditNameData,
        },

        {
            label: 'Email Address',
            placeholder: 'john@smith.com',
            keyboardType: 'email-address',
            value: profileData.email,
            changeHandler: setEditEmailData
        },

        {
            label: 'Saving Goals',
            placeholder: '$5000',
            keyboardType: 'numeric',
            value: profileData.goal,
            changeHandler: setEditSavingData
        },

    ]

    function editProfileForm() {
        return (
            <View style={{ gap: 10 }} key={editFormTextInputs}>
                {editFormTextInputs.map((input, i) => (
                    <View key={input.name}>
                        <Text style={[styles.detailText, { fontWeight: 'bold', textAlign: 'center' }]}>{input.label}</Text>
                        <TransactionInput key={input.value}
                            inputStyles={{ borderWidth: 1, textAlign: 'center' }}
                            textInputConfig={{
                                placeholder: input.placeholder,
                                value: input.value,
                                keyboardType: input.keyboardType,
                                onChangeText: (changeText) => input.changeHandler(changeText),
                            }}
                        />
                    </View>
                ))}
            </View>
        );
    }

    const handleOnEditProfileSubmit = () => {
        console.log(profileData, 'profileData on function')
        dispatch(setUserData(profileData))
        dispatch(setShowCustomModal(false))
    }

    const editProfileProps = {
        headerText: 'Edit Profile',
        submitText: 'Edit',
        onPress: () => handleOnEditProfileSubmit(),
        icon: 
        <FontAwesome5 name="user-edit" size={35} color={GlobalStyles.colors.primary700} /> 
          ,
        additionalBody: editProfileForm(),
    };

    function changePasswordInput(goal) {
        setProfileData((currentValues) => {
            return {
                ...currentValues,
                'goal': goal
            }
        })
    }

    const changePasswordProps = {
        headerText: 'Change Password',
        submitText: 'Reset Password',
        onPress: () => handleOnEditProfileSubmit(),
        icon: <FontAwesome name="undo" size={35} color={GlobalStyles.colors.primary700} />,
        additionalBody: changePasswordForm(),
    };

    

    function changePasswordForm() {
        return (
            <View style={{ gap: 10 }}>
                <Text style={[styles.detailText, { fontWeight: 'bold', textAlign: 'center' }]}>Old password</Text><TransactionInput inputStyles={{ borderWidth: 1, textAlign: 'center' }} textInputConfig={{ placeholder: '********', onChangeText: (changeText) => changePasswordInput(changeText) }} />

                <Text style={[styles.detailText, { fontWeight: 'bold', textAlign: 'center' }]}>New password</Text><TransactionInput inputStyles={{ borderWidth: 1, textAlign: 'center' }} textInputConfig={{ placeholder: '********', onChangeText: (changeText) => changePasswordInput(changeText) }} />

                <Text style={[styles.detailText, { fontWeight: 'bold', textAlign: 'center' }]}>Confirm new password</Text><TransactionInput inputStyles={{ borderWidth: 1, textAlign: 'center' }} textInputConfig={{ placeholder: '********', onChangeText: (changeText) => changePasswordInput(changeText) }} />
            </View>
        )
    }

    useEffect(()=>{
        if(editProfileActive){
            setModalData(editProfileProps)
        } else if(!editProfileActive){
            setModalData(changePasswordProps)
        }
    }, [editProfileActive])



    

    

    const handleOnLogOut = () => {
        console.log('Logout')
    }


    


  return (
    <>
          <ModalComponent {...modalData} />
          <View style={styles.profileWrapper} key={userData}>
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
                  <Text style={styles.profileName}>{userData.name}</Text>
              </View>

              <View style={styles.savingsGoalWrapper}>
                  <View style={styles.iconWrapper}>
                      <FontAwesome name='dollar' color={GlobalStyles.colors.primary700} size={30} />
                  </View>
                  <View style={styles.savingDescriptionWrapper}>
                      <Text style={{ fontSize: 20, fontWeight: 'bold', paddingVertical: 5 }}>Saving goals</Text>
                      {userData && !userData.goal ?
                          <ButtonComponent name='Add saving goal' type='positiveBg' onPress={() => {
                              setEditProfileActive(true);
                              dispatch(setShowCustomModal(true))
                          }} />
                      : <View>
                              <Progress.Bar progress={(totalIncome - totalExpenses) / 510} width={null} color={GlobalStyles.colors.primary700} unfilledColor={GlobalStyles.colors.gray200} borderWidth={0} />
                              <View style={styles.savingAmountwrapper}>
                                  <Text>$ {totalIncome - totalExpenses}</Text>
                                  <Text>$ {userData.goal}</Text>
                              </View>
                          </View>}
                      
                  </View>
              </View>

              <View style={styles.transactionsWrapper}>
                  <TransactionBanner name='Income' icon='money-bill-wave-alt' value={totalIncome}/>
                  <TransactionBanner name='Expenses' icon='shopping-bag' value={totalExpenses} />

              </View>

              <View style={styles.transactionsWrapper}>
                  <TransactionBanner name='Current Balance' icon='coins' value={totalIncome-totalExpenses} />
              </View>

              <View style={styles.buttonWrapper}>
                  <ButtonComponent name='Edit Profile' type='positiveText' onPress={()=> {
                      setEditProfileActive(true);
                      dispatch(setShowCustomModal(true))
                  }} />
                  <ButtonComponent name='Change Password' type='errorText' onPress={() => {
                      setEditProfileActive(false);
                    dispatch(setShowCustomModal(true));
                    }} />
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