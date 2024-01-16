import { Text, View, StyleSheet } from "react-native"
import { GlobalStyles } from "../constants/styles"
import TransactionHeader from "../components/common/TransactionHeader"
import TransactionChart from "../components/home/TransactionChart"
import HomeTransactions from "../components/home/HomeTransactions"
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react"
import { setTransactionData } from "../reduxStore/transactionSlice"
import Data from '../constants/data.json'


const Dashboard = () => {
  const dispatch = useDispatch()
  useEffect(()=>{
    // dispatch(setTransactionData(Data))
  }, [])
  return (
    <View style={styles.dashboardContainer}>
      <TransactionHeader/>
      <TransactionChart/>
      <HomeTransactions name="Recent Transactions" transactionLimit={true}/>
    </View>
  )
}

export default Dashboard

const styles = StyleSheet.create({
  dashboardContainer:{
    flex: 1,
    paddingTop: 18,
    backgroundColor: GlobalStyles.colors.primary700
  },
  
})
