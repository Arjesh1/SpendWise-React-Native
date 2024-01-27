import React, { useEffect, useState } from 'react'
import { Button, KeyboardAvoidingView, Modal, Pressable, StyleSheet, Text, View } from 'react-native'
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
import { Toast } from 'toastify-react-native'
import { whiteSpaceChecker } from '../../validators/inputChecker'
import { addTransaction, deleteTransaction, updateTransaction } from '../../helper/axiosHelper'

const initialTransactionData={
  amount: '',
  type:'',
  name:'',
  date:''
}

const AddEditTransactionModal = ({ headerName, selectedValue }) => {
    const { showTransactionModal } = useSelector(state => state.system)
    const {transactionData} = useSelector(state=>state.transaction)
    const dispatch = useDispatch()
    const [errorMsg, setErrorMsg]= useState()
    const { token } = useSelector(state => state.user)
    
   const modalInputStyles = {
    textAlign:'center',
     borderBottomWidth: 1,
   }
  const ExpensesIconsCategory = ["Travel", "Grocery", "Shopping", "House", "Food", 'Other']

  const[showCategory, setShowCategory] = useState(false)
  const [transactionInputValues, setTransactionInputValues] = useState(initialTransactionData)

  useEffect(()=>{
    selectedValue ? setTransactionInputValues(selectedValue) : null
  }, [selectedValue])

  useEffect(()=>{
    if(transactionInputValues.type === 'expenses'){
      setShowCategory(true)
    } else{
      setShowCategory(false)
      const {category, ...rest} =  transactionInputValues
      setTransactionInputValues(rest)
    }
  }, [transactionInputValues.type])

  const handleOnTransactionTypeSelected =(type)=>{
    setTransactionInputValues((currentValues)=>{
      return {
        ...currentValues,
        ['type']: type
      }
    })
    setErrorMsg()
  }

  const amountChangeHandler = (amount) =>{
    setTransactionInputValues((currentValues) => {
      return {
        ...currentValues,
        ['amount']: amount
      }
    })
    setErrorMsg()
  }

  const categorySelectedHandler =(icon) =>{
    setTransactionInputValues((currentValues) => {
      return {
        ...currentValues,
        ['category']: icon
      }
    })
    setErrorMsg()
  }

  const nameChangeHandeler = (name) =>{
    setTransactionInputValues((currentValues) => {
      return {
        ...currentValues,
        ['name']: name,
      }
    })
    setErrorMsg()
  }

  const dateSelectedHandeler = (date) =>{
    setTransactionInputValues((currentValues) => {
      return {
        ...currentValues,
        ['date']: new Date(date).getTime().toString(),
      }
    })
    setErrorMsg()
  }

  const handle0nAddTransaction = async ()=>{
    if (!whiteSpaceChecker(transactionInputValues.name) || !whiteSpaceChecker(transactionInputValues.type) || !whiteSpaceChecker(transactionInputValues.amount) || !whiteSpaceChecker(transactionInputValues.date)){
      setErrorMsg(['All fields are required'])
    } else if(transactionInputValues.type === 'expenses' && !whiteSpaceChecker(transactionInputValues.category)){
      setErrorMsg(['Category is required.'])
    } else{
      const response = await dispatch(addTransaction(transactionInputValues, token))
      if(response.success){
        setTransactionInputValues(initialTransactionData)
        dispatch(setShowTransactionModal(!showTransactionModal))
        return Toast.success(response.success)
      }
      if(response.message){
        dispatch(setShowTransactionModal(!showTransactionModal))
        return Toast.error(response.message)
      }
    }
  }

  const handleOnEditTransaction =async ()=>{
    if (!transactionInputValues.name || !transactionInputValues.type || !transactionInputValues.amount || !transactionInputValues.date) {
      return setErrorMsg(['All fields are required'])
    } else if (transactionInputValues.type === 'expenses' && !transactionInputValues.category) {
      return setErrorMsg(['Category of expense is required.'])
    } else {
      const deleteResponse = await dispatch(updateTransaction(transactionInputValues, token))

      if(updateResponse.success){
        setTransactionInputValues(initialTransactionData)
        dispatch(setShowTransactionModal(false))
        return Toast.success(updateResponse.success)
      }
      if(updateResponse.message){
        dispatch(setShowTransactionModal(!showTransactionModal))
        return Toast.error(updateResponse.message)
      }
    }
  }

  const handle0nDeleteTransaction = async (selectedValue)=>{
    if(!selectedValue && !selectedValue._id){
      return setErrorMsg(['Please slect a transaction'])
    } else {
      const {_id, ...rest} = selectedValue
      const deleteResponse = await dispatch(deleteTransaction({_id}, token))

      if(deleteResponse.success){
        setTransactionInputValues(initialTransactionData)
        dispatch(setShowTransactionModal(false))
        setErrorMsg()
        return Toast.success(deleteResponse.success)
      }
      if(deleteResponse.message){
        dispatch(setShowTransactionModal(!showTransactionModal))
        setErrorMsg()
        return Toast.error(deleteResponse.message)
      }

    }
  }

  return (
      <Modal animationType="slide" transparent={true} visible={showTransactionModal} onRequestClose={() => {
      dispatch(setShowTransactionModal(!showTransactionModal) && setTransactionInputValues({})); setErrorMsg()
      }}>

      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
       <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <View style={styles.headerTextWrapper}>
            <Text style={styles.headerText}>{headerName} Transactions</Text>
            </View>
          <View style={styles.closeModal}>
                <Pressable onPress={() => { dispatch(setShowTransactionModal(!showTransactionModal)) && setTransactionInputValues({}); setErrorMsg() }}>
              <AntDesign name='close' size={30} color='black' />
            </Pressable>
          </View>
          </View>
          <View style={styles.modalBody}>
              <TransactionInput label='Amount' textInputConfig={{ placeholder: '$100', keyboardType: 'numeric', value: transactionInputValues.amount, onChangeText: amountChangeHandler, maxLength: 10 }} inputStyles={modalInputStyles}/>

          <View>
            <Text style={styles.labelText}>Type:</Text>
            <DropdownComponent selectedType={(type) => handleOnTransactionTypeSelected(type)} initialValue={transactionInputValues.type} />
          </View>
          
          {showCategory?
            <View>
              <View style={styles.categoryHeader}> 
               <Text style={styles.labelText}>Category:</Text>
                {transactionInputValues && transactionInputValues.category && transactionInputValues.category.length != 0?
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

          <TransactionInput label='Name' textInputConfig={{ placeholder: 'Salary / Grocery', keyboardType: 'default', onChangeText: nameChangeHandeler, value: transactionInputValues.name, maxLength:20 }} inputStyles={modalInputStyles}
           />

          <View style={styles.dateWrapper}>
            <View style={styles.dateInputField}>
              <TransactionInput label='Date' textInputConfig={{ placeholder: '22-12-2023', keyboardType: 'default', editable: false, value: transactionInputValues.date ? new Date(+transactionInputValues.date).toDateString() : '' }} inputStyles={modalInputStyles} />
            </View>
            <DatePickerComponent onDateSelected={(date)=> dateSelectedHandeler(date)} />
          </View>

              {errorMsg ? <>
                {errorMsg.map((error, i) => (
                  <Text key={i} style={styles.errorText}>{`${i+1}. ${error}`}</Text>
                ))}
              </> :null}

          <View style={styles.buttonWrapper}>
                <ButtonComponent name={headerName} type='positiveBg' onPress={() => headerName === "Add" ?handle0nAddTransaction():handleOnEditTransaction()} />
            {headerName === "Edit" ?
              <ButtonComponent name={"Delete"} type='negativeBg' onPress={() => handle0nDeleteTransaction(selectedValue)} />
              : null}
          </View>
          </View>
          </View>
       </View>
      </KeyboardAvoidingView>
    </Modal>
  )
}

export default AddEditTransactionModal

const styles = StyleSheet.create({
  modalContainer:{
    flex:1,
    backgroundColor: 'white',
    marginTop: '15%',
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
  errorText:{
    color:GlobalStyles.colors.error600,
    fontSize:15
  },
  buttonWrapper:{
    gap: 10,
    justifyContent: 'flex-end',
  }
})
