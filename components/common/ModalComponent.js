import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View, KeyboardAvoidingView } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { GlobalStyles } from '../../constants/styles';
import ButtonComponent from './ButtonComponent';
import TransactionInput from './TransactionInput';
import { useDispatch, useSelector } from 'react-redux';
import { setShowCustomModal } from '../../reduxStore/systemSlice';

const ModalComponent = ({ icon, headerText, submitText, bodyDetailText, additionalBody }) => {
    const { showCustomModal } = useSelector(state => state.system)
    const dispatch =  useDispatch()

    const handleOnModalClose =()=>{
        dispatch(setShowCustomModal(!showCustomModal))
    }
  return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={showCustomModal}>
          <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                      <View style={styles.modalHeader}>

                        {icon? icon: null}
                          
                      <Text style={styles.headerText}>{headerText}</Text>
                      </View>

                      <View style={styles.modalBody}>
                        
                        <View style={styles.detailContainer}>
                          <Text style={styles.detailText}>
                              {bodyDetailText}
                          </Text>
                          {additionalBody ? additionalBody: null}
                        </View>
                      </View>

                      <View style={styles.modalFooter}>
                      <ButtonComponent name={submitText} onPress={() => handleOnModalClose()} type='positiveBg' />

                      <ButtonComponent name='Close' onPress={() => handleOnModalClose()} type='errorText' />
                     </View>
                    </View>
                </View>
          </KeyboardAvoidingView>
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
        height: '50%',
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
