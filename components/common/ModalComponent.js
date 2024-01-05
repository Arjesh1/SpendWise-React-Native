import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { GlobalStyles } from '../../constants/styles';
import ButtonComponent from './ButtonComponent';
import TransactionInput from './TransactionInput';

const ModalComponent = () => {
    const [modalVisible, setModalVisible] = useState(true);

    const handleOnModalClose =()=>{
        setModalVisible(!modalVisible)
    }
  return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                      <View style={styles.modalHeader}>
                        <View style={{padding: 15, backgroundColor: GlobalStyles.colors.error100, borderRadius:99}}>
                          <FontAwesome name="warning" size={30} color={GlobalStyles.colors.error700} />
                        </View>
                          
                      <Text style={styles.headerText}>Reset Password</Text>
                      </View>

                      <View style={styles.modalBody}>
                        
                        <View style={styles.detailContainer}>
                          <Text style={styles.detailText}>
                              Are you sure you want to reset your account password? You will receive an link to reset your password on your nominated email.
                          </Text>

                          <Text style={[styles.detailText, {fontWeight: 'bold', textAlign: 'center'}]}>
                              Email address
                          </Text>

                          <TransactionInput inputStyles={{borderWidth: 1}} pla/>
                        </View>
                      </View>

                      <View style={styles.modalFooter}>

                      <ButtonComponent name='Reset' onPress={() => handleOnModalClose()} type='positiveBg' />

                      <ButtonComponent name='Close' onPress={() => handleOnModalClose()} type='errorText' />
                     </View>
                    </View>
                </View>
            </Modal>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        width: '95%',
        height: '40%',
        backgroundColor: 'white',
        borderRadius: 20,
        paddingTop: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        justifyContent: 'space-between'
    },
    modalHeader:{
        width: '100%',
        alignItems: 'center',
        gap: 10,
    },
    headerText:{
        fontSize: 20,
        textAlign: 'center',
        paddingBottom: 8,
        fontWeight: 'bold'
    },

    modalBody:{
        justifyContent: 'space-evenly',
        paddingVertical: 15
    },
    detailContainer:{
        paddingHorizontal: 8,
        gap: 10
    },
    detailText:{
        fontSize: 15,
    },
    modalFooter:{
        paddingVertical: 10,
        paddingHorizontal: 10,
        width: '100%',
        backgroundColor: GlobalStyles.colors.gray300,
        gap: 10,
    },
});

export default ModalComponent
