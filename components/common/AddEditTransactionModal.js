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
import ButtonComponent from './ButtonComponent'

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

  const[showCategory, setShowCategory] = useState(false)
  const initialTransactionForm = { amount: '', date: '', type: '', category: '', name: '' }
  const [transactionInputValues, setTransactionInputValues] = useState(initialTransactionForm)

  useEffect(()=>{
    selectedValue ? setTransactionInputValues(selectedValue) : setTransactionInputValues(initialTransactionForm)
    if(transactionInputValues.type === 'expenses'){
      setShowCategory(true)
    } else{
      setShowCategory(false)
      setTransactionInputValues((currentValues) => {
        return {
          ...currentValues,
          ['category']: ''
        }
      })
    }
  }, [transactionInputValues.type, selectedValue])

  const handleOnTransactionTypeSelected =(type)=>{
    setTransactionInputValues((currentValues)=>{
      return {
        ...currentValues,
        ['type']: type
      }
    })
  }

  const amountChangeHandler = (amount) =>{
    setTransactionInputValues((currentValues) => {
      return {
        ...currentValues,
        ['amount']: amount
      }
    })
  }

  const categorySelectedHandler =(icon) =>{
    setTransactionInputValues((currentValues) => {
      return {
        ...currentValues,
        ['category']: icon
      }
    })
  }

  const nameChangeHandeler = (name) =>{
    setTransactionInputValues((currentValues) => {
      return {
        ...currentValues,
        ['name']: name
      }
    })
  }

  const dateSelectedHandeler = (date) =>{
    setTransactionInputValues((currentValues) => {
      return {
        ...currentValues,
        ['date']: new Date(date).getTime().toString()
      }
    })
  }

  const handle0nSubmitTransaction =()=>{
    console.log(transactionInputValues)
    setTransactionInputValues(initialTransactionForm)
    dispatch(setShowTransactionModal(!showTransactionModal))
  }
  
  return (
      <Modal animationType="slide" transparent={true} visible={showTransactionModal} onRequestClose={() => {
      dispatch(setShowTransactionModal(!showTransactionModal) && setTransactionInputValues(initialTransactionForm));
      }}>
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <View style={styles.headerTextWrapper}>
            <Text style={styles.headerText}>{headerName} Transactions</Text>
            </View>
          <View style={styles.closeModal}>
            <Pressable onPress={() => dispatch(setShowTransactionModal(!showTransactionModal)) && setTransactionInputValues(initialTransactionForm)}>
              <AntDesign name='close' size={30} color='black' />
            </Pressable>
          </View>
          </View>
          <View style={styles.modalBody}>
          <TransactionInput label= 'Amount' textInputConfig={{placeholder: '$100', keyboardType:'numeric', value: transactionInputValues.amount, onChangeText: amountChangeHandler}}/>

          <View>
            <Text style={styles.labelText}>Type:</Text>
            <DropdownComponent label='Type' selectedType={(type) => handleOnTransactionTypeSelected(type)} initialValue={transactionInputValues.type} />
          </View>
          
          {showCategory?
            <View>
              <View style={styles.categoryHeader}> 
               <Text style={styles.labelText}>Category:</Text>
               {transactionInputValues.category.length != 0?
                  <TransactionIcon type='expenses' category={transactionInputValues.category} />
               :null}
               
              </View>
              <View style={styles.iconContainer}>
                {ExpensesIconsCategory.map((item, i) =>
                  <Pressable key={i} onPress={() => categorySelectedHandler(item)}>
                    <TransactionIcon type='expenses' category={item} text={item} />
                  </Pressable>
                )}
              </View>
            </View>
          :null}

          <TransactionInput label='Name' textInputConfig={{ placeholder: 'Salary / Grocery', keyboardType: 'default', onChangeText: nameChangeHandeler, value: transactionInputValues.name }} />

          <View style={styles.dateWrapper}>
            <View style={styles.dateInputField}>
              <TransactionInput label='Date' textInputConfig={{ placeholder: '22-12-2023', keyboardType: 'default', editable: false, value: transactionInputValues.date ? new Date(+transactionInputValues.date).toDateString(): ''}}/>
            </View>
            <DatePickerComponent onDateSelected={(date)=> dateSelectedHandeler(date)} />
          </View>

          <View style={styles.buttonWrapper}>
            <ButtonComponent name={headerName} onPress={() => handle0nSubmitTransaction()} />
            {headerName === "Edit" ?
            <ButtonComponent name={"Delete"} onPress={() => handle0nDeleteTransaction(selectedValue)} />
              : null}
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
  categoryHeader:{
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 8
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
  }
})
