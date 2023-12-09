import { Text, View, StyleSheet } from "react-native"
import TransactionHeader from "../components/Transactions/TransactionHeader"

const Dashboard = () => {
  return (
    <View style={styles.dashboardContainer}>
      <TransactionHeader/>
    </View>
  )
}

export default Dashboard

const styles = StyleSheet.create({
  dashboardContainer:{
    paddingTop: 30,
    paddingHorizontal: 15
  }
})
