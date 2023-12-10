import { Text, View } from "react-native"
import TransactionIcon from "./TransactionIcon"
import { StyleSheet } from "react-native"

const TransactionDetailBanner = () => {
  return (
    <View style={styles.bannerContainer}>
        <View>
              <TransactionIcon/>
        </View>
        <View>
              <Text> List</Text>

        </View>
        
    </View>
    
  )
}

export default TransactionDetailBanner

const styles=StyleSheet.create({
    bannerContainer:{
        flexDirection: "row"
    },
})
