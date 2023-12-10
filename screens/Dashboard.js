import { Text, View, StyleSheet } from "react-native"
import { GlobalStyles } from "../constants/styles"
import TransactionHeader from "../components/common/TransactionHeader"
import TransactionChart from "../components/home/TransactionChart"
import HomeTransactions from "../components/home/HomeTransactions"


const Dashboard = () => {
  return (
    <View style={styles.dashboardContainer}>
      <View style={styles.greetingContainer}>
        <Text style={styles.greetingText}>
          Welcome back, 
        </Text>
        <Text style={styles.userName}>Arjesh</Text>
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
    fontSize: 35,
    fontWeight: 'bold',
    color: 'white',
    fontStyle: 'italic'

  }
})
