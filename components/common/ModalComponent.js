import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View, KeyboardAvoidingView } from 'react-native';
import { GlobalStyles } from '../../constants/styles';
import ButtonComponent from './ButtonComponent';
import { useDispatch, useSelector } from 'react-redux';
import { setShowCustomModal } from '../../reduxStore/systemSlice';

const ModalComponent = ({ icon, onPress, headerText, submitText, bodyDetailText, additionalBody, errorMsg, onCancel }) => {
    const { showCustomModal } = useSelector(state => state.system)
    const dispatch =  useDispatch()

    const handleOnModalClose =()=>{
        onCancel()
        dispatch(setShowCustomModal(!showCustomModal))
    }

    const handleOnSubmitPressed =()=>{
        onPress()
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
                          {icon ? icon : null}
                          <Text style={styles.headerText}>{headerText}</Text>
                      </View>

                      <View style={styles.modalBody}>
                          <View style={styles.detailContainer}>
                              <Text style={styles.detailText}>{bodyDetailText}</Text>
                              {additionalBody ? additionalBody : null}
                              {errorMsg ? (
                                  <Text style={[styles.detailText, { color: GlobalStyles.colors.error500, textAlign: 'center' }]}>
                                      {errorMsg}
                                  </Text>
                              ) : null}
                          </View>
                      </View>

                      <View style={styles.modalFooter}>
                          <ButtonComponent name={submitText} onPress={() => handleOnSubmitPressed()} type='positiveBg' />
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
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    modalView: {
        width: '95%',
        height: '54%',
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
        justifyContent: 'space-between',
        marginTop: '20%'
    },
    modalHeader:{
        width: '100%',
        alignItems: 'center',
        gap: 10,
    },
    headerText:{
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold'
    },

    modalBody:{
        width: '100%',
        justifyContent: 'space-evenly',
        paddingBottom: 15,
        paddingHorizontal: 8,
        backgroundColor: 'white',
    },
    detailContainer:{
        paddingHorizontal: 8,
        gap: 10,
    },
    detailText:{
        fontSize: 15,
        textAlign:'center'
    },
    modalFooter:{
        paddingVertical: 10,
        paddingHorizontal: 10,
        width: '100%',
        backgroundColor: GlobalStyles.colors.gray300,
        gap: 10,
        borderBottomEndRadius: 20,
        borderBottomStartRadius: 20,
    },
});

export default ModalComponent
