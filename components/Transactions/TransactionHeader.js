import { Text, View, StyleSheet } from "react-native"
import { GlobalStyles } from "../../constants/styles"

const TransactionHeader = () => {
  return (
    <View style={styles.transactionHeaderContainer}>
      <View style={styles.transactionBody}>
        <Text style={styles.transactionType}>Income: </Text>
        <Text style={styles.transactionAmountIncome}>$500</Text>
        </View>
      <View style={styles.transactionBody}>
        <Text style={styles.transactionType}>Expenses: </Text>
        <Text style={styles.transactionAmountExpenses}>$100</Text>
          </View>
      
    </View>
  )
}

export default TransactionHeader

const styles = StyleSheet.create({
  transactionHeaderContainer:{
    backgroundColor: GlobalStyles.colors.primary100,
    paddingHorizontal: 15, 
    paddingVertical: 10,
    borderRadius: 25,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  transactionBody:{
    flexDirection: 'row',
    gap: 5,
    alignItems: "center"
  },
  transactionType:{
    fontSize: 16,
    fontWeight: '500',
    color: GlobalStyles.colors.gray700

  },
  transactionAmountIncome:{
    fontSize: 20,
    fontWeight: 'bold',
    color: GlobalStyles.colors.primary500
  },
  transactionAmountExpenses: {
    fontSize: 20,
    fontWeight: 'bold',
    color: GlobalStyles.colors.error500
  }

})
