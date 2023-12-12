import { Text, View, StyleSheet } from "react-native"
import { GlobalStyles } from "../constants/styles"
import TransactionHeader from "../components/common/TransactionHeader"
import TransactionChart from "../components/home/TransactionChart"
import HomeTransactions from "../components/home/HomeTransactions"


const Dashboard = () => {
  return (
    <View style={styles.dashboardContainer}>
      
      <TransactionHeader/>
      <TransactionChart/>
      <HomeTransactions name="Recent Transactions"/>
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
