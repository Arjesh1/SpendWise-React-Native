import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet, Image, Pressable, ImageBackground } from 'react-native'
import { GlobalStyles } from '../constants/styles'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import * as Progress from 'react-native-progress';
import TransactionBanner from '../components/common/TransactionBanner';
import ButtonComponent from '../components/common/ButtonComponent';
import { useDispatch, useSelector } from 'react-redux';
import { setShowCustomModal, setShowLoader } from '../reduxStore/systemSlice';
import ModalComponent from '../components/common/ModalComponent';
import TransactionInput from '../components/common/TransactionInput';
import { setToken, setUserData } from '../reduxStore/userAuthSlice';
import { emailChecker, passwordChecker, whiteSpaceChecker } from '../validators/inputChecker';
import { Toast } from 'toastify-react-native';
import * as ImagePicker from 'expo-image-picker';
import { changePassword, updateProfile, uploadImage } from '../helper/axiosHelper';
import { PrivateRoute } from '../validators/PrivateRoute';
import LoadingComponent from '../components/common/LoadingComponent';

const Profile = ({navigation}) => {
    const dispatch = useDispatch()
    const [profileData, setProfileData] = useState({})
    const [editProfileActive, setEditProfileActive] = useState(null)
    const [modalData, setModalData] = useState({})
    const { userData, token } = useSelector(state => state.user)
    const { transactionData } = useSelector(state => state.transaction)
    const [error, setError] = useState(null)
    const [image, setImage] = useState(null);
    const [passwordChangeData, setPasswordChangeData] = useState({})
    const { showCustomModal, showLoader } = useSelector(state=>state.system)
    const [progressBarValue, setProgressBarValue] = useState()

    useEffect(()=>{
        if(!showCustomModal){
            setImage(null)
        }
        setError(null)
    },[showCustomModal])

    const totalIncome = Math.floor(transactionData?.filter((item) => item.type === 'income').reduce((total, item) => {
        return total + +item.amount
    }, 0))

    const totalExpenses = Math.floor(transactionData?.filter((item) => item.type === 'expenses').reduce((total, item) => {
        return total + +item.amount
    }, 0))

    useEffect(()=>{
        const goal = +profileData.goal || 1;
        setProgressBarValue((totalIncome- totalExpenses) / goal)
    },[transactionData,profileData ])


    useEffect(() => {
        setProfileData(userData)
        setImage(null);
    }, [userData, showCustomModal ])

    function editEmailHandler(email) {
        setProfileData((currentValues) => {
            return {
                ...currentValues,
                'email': email.toLowerCase()
            }
        })
    }

    function editNameHandler(name) {
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
            changeHandler: editNameHandler,
        },

        {
            label: 'Email Address',
            placeholder: 'john@smith.com',
            keyboardType: 'email-address',
            value: profileData.email,
            changeHandler: editEmailHandler
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
            <View style={{ gap: 10 }}>
                {editFormTextInputs.map((input, i) => (
                    <View key={i}>
                        <Text style={[styles.detailText, { fontWeight: 'bold', textAlign: 'center' }]}>{input.label}</Text>
                        <TransactionInput
                            inputStyles={{ borderWidth: 1, textAlign: 'center' }}
                            textInputConfig={{
                                placeholder: input.placeholder,
                                value: input.value,
                                keyboardType: input.keyboardType,
                                onChangeText: input.changeHandler,
                            }}
                        />
                    </View>
                ))}
            </View>
        );
    }

    const handleOnEditProfileSubmit = async () => {
        if (!whiteSpaceChecker(profileData.name) || !whiteSpaceChecker(profileData.email)){
            return setError(['Name and email are required.'])
        } else if (!emailChecker(profileData.email)) {
            return setError(['Email is invalid.'])
        } else {
            setError(null);
            const updateResult =  await updateProfile(profileData, token)

            if(updateResult && updateResult.message){
                dispatch(setShowCustomModal(false))
                return Toast.error(updateResult.message);
            }
            dispatch(setUserData(updateResult.updatedUserData))
            dispatch(setToken(updateResult.token))
            dispatch(setShowCustomModal(false))
            Toast.success('Your profile has been edited.');
            
        }
    }

    const oldPasswordInputHandler = (oldPassword) => {
        setPasswordChangeData((passwordData) => {
            return {
                ...passwordData,
                'oldPassword': oldPassword
            }
        })
    }

    const newPasswordInputHandler = (newPassword) => {
        setPasswordChangeData((passwordData) => {
            return {
                ...passwordData,
                'newPassword': newPassword
            }
        })

    }

    const confirmNewPasswordInputHandler = (confirmNewPassword) => {
        setPasswordChangeData((passwordData) => {
            return {
                ...passwordData,
                'confirmNewPassword': confirmNewPassword
            }
        })

    }

    const handleOnChangePassportSubmit = async () => {
        if(!passwordChecker(passwordChangeData.oldPassword) || !passwordChecker(passwordChangeData.newPassword) || !passwordChecker(passwordChangeData.confirmNewPassword)){
            return setError(['Password must be 6 characters long.']) 
        } else if (passwordChangeData.newPassword !== passwordChangeData.confirmNewPassword ){
            return setError(['New password and confirm password do not match.'])
        } else {
            setError(null);
             const changePasswordResponse = await changePassword(passwordChangeData, token)
             if(changePasswordResponse && changePasswordResponse.message ){
                dispatch(setShowCustomModal(false))
                return Toast.error(changePasswordResponse.message);
             } 
             dispatch(setShowCustomModal(false))
             Toast.success(changePasswordResponse.success)
        }
    }

    const changePasswordFormData = [
        {
            label: 'Old Password',
            changeHandeler: oldPasswordInputHandler
        },
        {
            label: 'New Password',
            changeHandeler: newPasswordInputHandler
        },
        {
            label: 'Confirm new Password',
            changeHandeler: confirmNewPasswordInputHandler
        }
    ]

    function changePasswordForm() {
        return (
            <View style={{ gap: 10 }}>
                {changePasswordFormData.map((passwordInput, i) => (
                    <View key={i}>
                        <Text style={[styles.detailText, { fontWeight: 'bold', textAlign: 'center' }]}>{passwordInput.label}</Text><TransactionInput inputStyles={{ borderWidth: 1, textAlign: 'center' }} textInputConfig={{ placeholder: '********', onChangeText: passwordInput.changeHandeler, secureTextEntry: true }} />
                    </View>
                ))}
            </View>
        )
    }

    const pickProfileImage = async (fromCamera = false) => {
        let result;

        if (fromCamera) {
            const cameraPermission = await ImagePicker.getCameraPermissionsAsync();
            if (cameraPermission.status !== 'granted') {

                if (cameraPermission.canAskAgain) {
                    const { status } = await ImagePicker.requestCameraPermissionsAsync();
                    
                    if (status !== 'granted') {
                      alert('Sorry, we need camera roll permissions to make this work!');
                      return;
                    }
                  } else {
                    alert('You need to enable camera permissions in your device settings to use this feature.');
                    return;
                  }
            }

            result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1,
            });
        } else {
            result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                cameraType: 'front',
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1,
            });
        }

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    function editProfilePictureComponent() {
        return (
            <View >
                <View style={{ justifyContent: 'center', alignItems: 'center', gap: 10 }}>
                    <View style={{...styles.profileImg, borderWidth:2, borderColor: GlobalStyles.colors.primary700}}>
                        <Image
                           key={image|| profileData.profileImg}
                            style={styles.profilePicture}
                            source={ image || profileData.profileImg ?
                                { uri: image ? image : profileData.profileImg}: require('../assets/images/defaultProfile.png')}
                        />
                    </View>
                    <View style={{ width: '60%', gap: 10 }}>
                        <Pressable onPress={() => pickProfileImage()}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 20, backgroundColor: GlobalStyles.colors.primary600, paddingVertical: 6, borderRadius: 5, }}>
                                <View>
                                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: GlobalStyles.colors.white }}>Upload</Text>
                                </View>
                                <FontAwesome name="upload" size={30} color={GlobalStyles.colors.white} />
                            </View>
                        </Pressable>

                        <Pressable onPress={() => pickProfileImage(true)}>
                            <View style={{
                                flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 20, backgroundColor: GlobalStyles.colors.white, paddingVertical: 6, borderRadius: 5, borderWidth: 2,
                                borderColor: GlobalStyles.colors.primary700,
                                overflow: 'hidden',
                            }}>
                                <View>
                                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: GlobalStyles.colors.primary700 }}>Take picture</Text>
                                </View>
                                <FontAwesome name="camera" size={30} color={GlobalStyles.colors.primary700} />
                            </View>
                        </Pressable>
                    </View>

                </View>
            </View>

        )
    }

    async function handleOnEditProfileImgSave() {
        dispatch(setShowCustomModal(false))
        dispatch(setShowLoader(true))
        const formData =  new FormData()
        formData.append('image', {
            uri: image,
            type: 'image/jpeg',
            name: 'image.jpg',
          });

        const uploadResponse = await dispatch(uploadImage(formData, token))
        if(uploadResponse.message){
            dispatch(setShowLoader(false))
            return Toast.error(uploadResponse.message)
        } 
        dispatch(setShowLoader(false))
        Toast.success(uploadResponse.success)
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

    const editProfilePictureProps = {
        headerText: 'Edit Profile',
        submitText: 'Save',
        onPress: () => handleOnEditProfileImgSave(),
        additionalBody: editProfilePictureComponent(),
    };

    const changePasswordProps = {
        headerText: 'Change Password',
        submitText: 'Reset Password',
        onPress: () => handleOnChangePassportSubmit(),
        icon: <FontAwesome name="undo" size={35} color={GlobalStyles.colors.primary700} />,
        additionalBody: changePasswordForm(),
    };

    useEffect(() => {
        if (editProfileActive === null) {
            setModalData(editProfilePictureProps)
        } else if (editProfileActive) {
            setModalData(editProfileProps)
        } else if (!editProfileActive) {
            setModalData(changePasswordProps)
        }
    }, [editProfileActive, profileData, image, passwordChangeData])

    const handleOnLogOut = () => {
        dispatch(setUserData())
        dispatch(setToken())
        navigation.navigate('Login')
        Toast.error('Logou successfull');
    }

    return (
        <PrivateRoute>
            <LoadingComponent/>
            <ModalComponent {...modalData} errorMsg={error} />
            <View style={styles.profileWrapper}>
                <View style={styles.profileImgWrapper}>
                    <View style={styles.profileImg}>
                        <ImageBackground source ={require('../assets/images/preloaders.jpg')} style={{ position: 'relative', width: '100%', borderRadius: 999, overflow: 'hidden', borderWidth:2, borderColor:GlobalStyles.colors.primary100, resizeMode:'contain' }} >
                            <Image
                                style={styles.profilePicture}
                                key={image || profileData.profileImg || !showLoader}
                                source={profileData.profileImg ? {
                                    uri: profileData.profileImg }: require('../assets/images/defaultProfile.png')}
                            />
                            <View style={{ position: 'absolute', bottom: 0, width: '100%' }}>
                                <ButtonComponent name='Edit' onPress={() => {
                                    setEditProfileActive(null);
                                    dispatch(setShowCustomModal(true));
                                }} />
                            </View>
                        </ImageBackground>
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
                            : <View key={progressBarValue}>
                                <Progress.Bar progress={progressBarValue} width={null} color={GlobalStyles.colors.primary700} unfilledColor={GlobalStyles.colors.gray200} borderWidth={0} />
                                <View style={styles.savingAmountwrapper}>
                                    <Text>$ {totalIncome - totalExpenses}</Text>
                                    <Text>$ {userData.goal}</Text>
                                </View>
                            </View>}

                    </View>
                </View>

                <View style={styles.transactionsWrapper}>
                    <TransactionBanner name='Income' icon='money-bill-wave-alt' value={totalIncome} />
                    <TransactionBanner name='Expenses' icon='shopping-bag' value={totalExpenses} />

                </View>

                <View style={styles.transactionsWrapper}>
                    <TransactionBanner name='Current Balance' icon='coins' value={totalIncome - totalExpenses} />
                </View>

                <View style={styles.buttonWrapper}>
                    <ButtonComponent name='Edit Profile' type='positiveText' onPress={() => {
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
        </PrivateRoute>

    )
}

export default Profile
const styles = StyleSheet.create({
    profileWrapper: {
        flex: 1,
        paddingTop: 50,
        paddingHorizontal: 10,
        backgroundColor: GlobalStyles.colors.primary700,
        justifyContent: 'space-evenly'
    },
    profileImgWrapper: {
        marginTop: 15,
        alignItems: 'center'
    },
    profileImg: {
        width: '50%',
        aspectRatio: 1,
        borderRadius: 999,
        justifyContent: 'center',
        alignItems: 'center',
    },
    profilePicture: {
        width: '100%',
        height: '100%',
        borderRadius: 999,
        resizeMode: 'cover',
    },
    profileDetailsWrapper: {
        marginTop: 5,
        alignItems: 'center'
    },
    profileName: {
        fontSize: 30,
        fontWeight: 'bold',
        color: GlobalStyles.colors.white
    },
    savingsGoalWrapper: {
        backgroundColor: GlobalStyles.colors.white,
        flexDirection: 'row',
        margin: 7,
        padding: 20,
        borderRadius: 15,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    iconWrapper: {
        backgroundColor: GlobalStyles.colors.primary100,
        width: '15%',
        aspectRatio: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        flex: 1

    },
    savingDescriptionWrapper: {
        flex: 5,
        paddingLeft: 10,
    },
    savingAmountwrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    transactionsWrapper: {
        flexDirection: 'row',
        margin: 7,
        gap: 10,
        alignItems: 'center',
    },
    transaction: {
        backgroundColor: GlobalStyles.colors.white,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 18,
        borderRadius: 15,
        flexDirection: 'row',
        gap: 20
    },
    buttonWrapper: {
        gap: 10,
    },
})