import { Text, View, StyleSheet } from "react-native"
import { GlobalStyles } from "../constants/styles"
import TransactionHeader from "../components/common/TransactionHeader"
import HomeTransactions from "../components/home/HomeTransactions"

const AllExpenses = () => {
  return (
    <View style={styles.transactionContainer}>
      <TransactionHeader/>
      
      <HomeTransactions name='All Transactions' transactionLimit={false} />
      
      

    </View>
  )
}

export default AllExpenses

const styles = StyleSheet.create({
  transactionContainer: {
    flex: 1,
    paddingTop: 18,
    backgroundColor: GlobalStyles.colors.primary700
  },
  
})
