import React from 'react'
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { setShowTransactionModal } from '../../reduxStore/systemSlice'

const AddEditTransactionModal = () => {
    const { showTransactionModal } = useSelector(state => state.system)
    const dispatch = useDispatch()
  return (
      <Modal animationType="slide" transparent={true} visible={showTransactionModal} onRequestClose={() => {
        dispatch(setShowTransactionModal(!showTransactionModal));
      }}>
        <View style={styles.modalContainer}>
          <Text>Hlkmkmd</Text>
          <Pressable onPress={() => dispatch(setShowTransactionModal(!showTransactionModal))}>
            <Text> Close</Text>
          </Pressable>
        </View>
      </Modal>
      
  )
}

export default AddEditTransactionModal

const styles = StyleSheet.create({
  modalContainer:{
    flex: 1,
    backgroundColor: 'white',
    marginTop: '30%',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    paddingHorizontal: 15,
  },
 
})
