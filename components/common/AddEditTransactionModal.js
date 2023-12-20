import React from 'react'
import { Button, Modal, Pressable, StyleSheet, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { setShowTransactionModal } from '../../reduxStore/systemSlice'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { GlobalStyles } from '../../constants/styles'

const AddEditTransactionModal = ({ headerName, selectedValue }) => {
    const { showTransactionModal } = useSelector(state => state.system)
    const dispatch = useDispatch()

  return (
      <Modal animationType="slide" transparent={true} visible={showTransactionModal} onRequestClose={() => {
        dispatch(setShowTransactionModal(!showTransactionModal));
      }}>
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <View style={styles.headerTextWrapper}>
            <Text style={styles.headerText}>{headerName} Transactions</Text>
            </View>

          <View style={styles.closeModal}>
            <Pressable onPress={() => dispatch(setShowTransactionModal(!showTransactionModal))}>
              <AntDesign name='close' size={30} color='black' />
            </Pressable>
          </View>
          </View>
          <View>
          {headerName === "Edit"? 
            <Button title="Delete" color={GlobalStyles.colors.error700} accessibilityLabel="Delete"/>
          :null}
          </View>
        </View>
      </Modal>
      
  )
}

export default AddEditTransactionModal

const styles = StyleSheet.create({
  modalContainer:{
    flex:1,
    backgroundColor: 'white',
    marginTop: '30%',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    padding: 15,
  },
  modalHeader:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTextWrapper:{
    alignItems: 'flex-end',
    flex: 5
  },
  headerText:{
    fontSize: 22,
    color: GlobalStyles.colors.gray700
  },

  closeModal:{
    alignItems: 'flex-end',
    flex: 2
  },
 
})
