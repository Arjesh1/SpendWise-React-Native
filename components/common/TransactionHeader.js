import { Text, View, StyleSheet } from "react-native"
import { GlobalStyles } from "../../constants/styles"
import { useSelector } from "react-redux"

const TransactionHeader = () => {
  const {transactionData} = useSelector(state => state.transaction)
  const { userData } = useSelector(state => state.user)
  const totalIncome = Math.floor(transactionData?.filter((item) => item.type === 'income').reduce((total, item)=> {
    return total + +item.amount
  }, 0))
  const totalExpenses = Math.floor(transactionData?.filter((item) => item.type === 'expenses').reduce((total, item) => {
    return total + +item.amount
  }, 0))
  return (<>
  <View style={styles.greetingContainer}>
        <Text style={styles.greetingText}>
          Hello, <Text style={styles.userName}>{userData.name}</Text>
        </Text>
      </View>
    <View style={styles.transactionHeaderContainer}>
      <View style={styles.transactionBody}>
        <Text style={styles.transactionType}>Income: </Text>
        <Text style={styles.transactionAmountIncome}>${totalIncome}</Text>
      </View>
      <View style={styles.transactionBody}>
        <Text style={styles.transactionType}>Expenses: </Text>
        <Text style={styles.transactionAmountExpenses}>${totalExpenses}</Text>
      </View>
    </View>
  </>
  )
}

export default TransactionHeader

const styles = StyleSheet.create({
  greetingContainer: {
    padding: 15
  },
  greetingText: {
    fontSize: 23,
    fontWeight: "400",
    color: 'white',
    fontStyle: 'italic'
  },
  userName: {
    fontSize: 35,
    fontWeight: 'bold',
    color: 'white',
    fontStyle: 'italic'

  },
  transactionHeaderContainer:{
    backgroundColor: GlobalStyles.colors.primary50,
    paddingHorizontal: 15, 
    paddingVertical: 10,
    marginHorizontal: 15,
    borderRadius: 20,
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
