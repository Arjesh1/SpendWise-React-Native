import React from 'react'
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { setShowTransactionModal } from '../../reduxStore/systemSlice'
import AntDesign from 'react-native-vector-icons/AntDesign'

const AddEditTransactionModal = () => {
    const { showTransactionModal } = useSelector(state => state.system)
    const dispatch = useDispatch()
  return (
      <Modal animationType="slide" transparent={true} visible={showTransactionModal} onRequestClose={() => {
        dispatch(setShowTransactionModal(!showTransactionModal));
      }}>
        <View style={styles.modalContainer}>
          <View style={styles.closeModal}>
          <Pressable onPress={() => dispatch(setShowTransactionModal(!showTransactionModal))}>
            <AntDesign name='close' size={30} color='black'/>
          </Pressable>
          </View>
          
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
    padding: 15,
  },

  closeModal:{
    alignItems: 'flex-end'
  }
 
})
