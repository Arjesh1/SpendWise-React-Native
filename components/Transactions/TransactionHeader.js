import { Text, View, StyleSheet } from "react-native"
import { GlobalStyles } from "../../constants/styles"

const TransactionHeader = () => {
  return (
    <View style={styles.transactionHeaderContainer}>
      <View style={styles.transactionBody}>
        <Text style={styles.transactionType}>Income: </Text>
        <Text style={styles.transactionAmount}>$500</Text>
        </View>
      <View style={styles.transactionBody}>
        <Text style={styles.transactionType}>Expenses: </Text>
        <Text style={styles.transactionAmount}>$100</Text>
          </View>
      
    </View>
  )
}

export default TransactionHeader

const styles = StyleSheet.create({
  transactionHeaderContainer:{
    backgroundColor: GlobalStyles.colors.mainColor,
    padding: 15, 
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
    color: 'white'

  },
  transactionAmount:{
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white'

  }

})
