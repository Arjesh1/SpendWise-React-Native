import { Text, View, StyleSheet } from "react-native"
import TransactionHeader from "../components/Transactions/TransactionHeader"
import { GlobalStyles } from "../constants/styles"
import TransactionChart from "../components/Transactions/TransactionChart"
import HomeTransactions from "../components/Transactions/HomeTransactions"


const Dashboard = () => {
  return (
    <View style={styles.dashboardContainer}>
      <View style={styles.greetingContainer}>
        <Text style={styles.greetingText}>
          Welcome back, <Text style={styles.userName}>Arjesh</Text>
        </Text>
      </View>
      <TransactionHeader/>
      <TransactionChart/>
      <HomeTransactions/>
    </View>
  )
}

export default Dashboard

const styles = StyleSheet.create({
  dashboardContainer:{
    flex: 1,
    paddingTop: 18,
    backgroundColor: GlobalStyles.colors.primary600
  },
  greetingContainer:{
    padding: 15
  },
  greetingText:{
    fontSize: 23,
    fontWeight: "400",
    color: 'white',
    fontStyle: 'italic'
  },
  userName:{
    fontSize: 30,
    fontWeight: 'bold'

  }
})
