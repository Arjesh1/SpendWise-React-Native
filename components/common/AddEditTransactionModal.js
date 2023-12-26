import React, { useEffect, useState } from 'react'
import { Button, Modal, Pressable, StyleSheet, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { setShowTransactionModal } from '../../reduxStore/systemSlice'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { GlobalStyles } from '../../constants/styles'
import { setTransactionData } from '../../reduxStore/transactionSlice'
import TransactionInput from './TransactionInput'
import DropdownComponent from './DropdownComponent'
import TransactionIcon from './TransactionIcon'
import DatePickerComponent from './DatePickerComponent'

const AddEditTransactionModal = ({ headerName, selectedValue }) => {
    const { showTransactionModal } = useSelector(state => state.system)
    const {transactionData} = useSelector(state=>state.transaction)
    const dispatch = useDispatch()
    const handle0nDeleteTransaction = (selectedValue)=>{
      const restItem = transactionData.filter((item) => item.id !== selectedValue.id)
      dispatch(setTransactionData(restItem))
      dispatch(setShowTransactionModal(false))
    }
  const ExpensesIconsCategory = ["Travel", "Grocery", "Shopping", "House", "Food", 'Other']

  const [value, setValue] = useState();
  const [selectedDate, setSelectedDate] = useState(); 
  const[showCategory, setShowCategory] = useState(false)
  useEffect(()=>{
    if(value === 'expenses'){
      setShowCategory(true)
    } else{
      setShowCategory(false)
    }
  }, [value])

  const handleOnTransactionTypeSelected =(type)=>{
    setValue(type)
  }

  const amountChangeHandler = (amount) =>{
    console.log(amount)
    
  }

  const iconPressedHandler =(icon) =>{
    console.log(icon)
     
  }

  const dateSelectedHandeler = (date) =>{
    setSelectedDate(new Date (date).getTime())
  }
  
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
          <View style={styles.modalBody}>
          <TransactionInput label= 'Amount' textInputConfig={{placeholder: '$100', keyboardType:'numeric', onChangeText: amountChangeHandler}}/>

          <View>
            <Text style={styles.labelText}>Type:</Text>
            <DropdownComponent label='Type' selectedType={(type) => handleOnTransactionTypeSelected(type)} />
          </View>
          
          {showCategory?
            <View style={styles.categoryWrapper}>
              <Text style={styles.labelText}>Category:</Text>
              <View style={styles.iconContainer}>
                {ExpensesIconsCategory.map((item, i) =>
                  <Pressable key={i} onPress={() => iconPressedHandler(item)}>
                    <TransactionIcon type='expenses' category={item} />
                  </Pressable>
                )}
              </View>
            </View>
          :null}

          <TransactionInput label='Name' textInputConfig={{ placeholder: 'Salary / Grocery', keyboardType: 'default' }} />

          <View style={styles.dateWrapper}>
            <View style={styles.dateInputField}>
              <TransactionInput label='Date' textInputConfig={{ placeholder: '22-12-2023', keyboardType: 'default', editable: false, value: selectedDate ? new Date(selectedDate).toDateString(): ''}}/>
            </View>
            <DatePickerComponent onDateSelected={(date)=> dateSelectedHandeler(date)} />
          </View>

          <View style={styles.buttonWrapper}>
            {headerName === "Edit" ?
              <Button title="Delete" color={GlobalStyles.colors.error700} accessibilityLabel="Delete" onPress={() => handle0nDeleteTransaction(selectedValue)} />
              : null}

            <Button title="Add" color={GlobalStyles.colors.primary600} accessibilityLabel="Add" onPress={() => handle0nDeleteTransaction(selectedValue)} />
          </View>
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
  modalBody:{
    paddingHorizontal: 10,
    justifyContent: 'space-around',
    marginTop: 8,
    flex:1,
  },
  labelText: {
    fontSize: 18,
    color: GlobalStyles.colors.gray500,
  },
  iconContainer:{
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 5,
    borderRadius: 10,
  },
  dateWrapper:{
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between'
  },
  dateInputField:{
    flex: 4,
  },
  buttonWrapper:{
    gap: 10,
    justifyContent: 'flex-end',
  },
 
})
