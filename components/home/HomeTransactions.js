import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native'
import { GlobalStyles } from '../../constants/styles'
import TransactionDetailBanner from '../common/TransactionDetailBanner'
import Feather from 'react-native-vector-icons/Feather'
import { useDispatch, useSelector } from 'react-redux'
import { setShowTransactionModal } from '../../reduxStore/systemSlice'
import AddEditTransactionModal from '../common/AddEditTransactionModal'

const HomeTransactions = ({ name, transactionLimit }) => {
  const [modalHeader, setModalHeader] = useState()
  const [editValue, setEditValue] = useState()
  const [displayTransaction, setDisplayTransaction] = useState([])
  const { transactionData } = useSelector((state) => state.transaction)
  const dispatch = useDispatch()
  useEffect(()=>{
    const sortedTransaction = [...transactionData].sort((a, b) => b.date - a.date)
    console.log(sortedTransaction)
    if (transactionLimit) {
      setDisplayTransaction(sortedTransaction.slice(0, 10))
    } else {
      setDisplayTransaction(sortedTransaction)
    }
  }, [transactionLimit, transactionData])
 
    const handleOnEditTransaction = (item) => {
      dispatch(setShowTransactionModal(true))
      setModalHeader('Edit')
      setEditValue(item)
    }
    
    const handleOnAddTransaction = ()=>{
      dispatch(setShowTransactionModal(true)) 
      setModalHeader('Add')  
      setEditValue(undefined)
    }

  return (
    <>
      <AddEditTransactionModal headerName={modalHeader} selectedValue= {editValue}/>
     <View style={styles.HomeTransactionContainer}>
      <View style={styles.homeHeader}>
        <Text style={styles.headertext}>{name}</Text>
      </View>
        <ScrollView style={styles.transactionLists}>
          {displayTransaction && displayTransaction.length === 0? <Text style={styles.msgText}>No transaction added yet!!</Text>:null}
          {displayTransaction? displayTransaction.map((item)=>(
            <TransactionDetailBanner key={item.id} item={item} onPress={()=> handleOnEditTransaction(item)}/>
          )): null}
        </ScrollView>
        <Pressable style={styles.addContainer} onPress={handleOnAddTransaction}>
        <View style={styles.addButton}>
          <Feather name='plus-circle' color='white' size= {31} />
        </View>
        </Pressable>
     </View>
    </>
  )
}

export default HomeTransactions

const styles = StyleSheet.create({
  HomeTransactionContainer:{
    marginTop: 8,
    backgroundColor: GlobalStyles.colors.white,
    flex: 1,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    paddingHorizontal: 10,
  },
  homeHeader:{
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: GlobalStyles.colors.gray300
  },
  headertext:{
    fontSize: 20,
    fontWeight: "700",
    color: GlobalStyles.colors.gray700
  },
  msgText:{
    textAlign: 'center',
    fontSize: 18,
    color: GlobalStyles.colors.gray400
  },
  transactionLists:{
    padding: 8,
    gap: 5,
    marginBottom:5
  },
  addContainer:{
    position: 'absolute',
    bottom: 15,
    right: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  addButton:{
    backgroundColor: GlobalStyles.colors.primary500,
    flex: 1,
    padding: 8,
    aspectRatio: 4/4,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 99,
  },
})
