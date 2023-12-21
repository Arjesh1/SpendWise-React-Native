import { Pressable, Text, View } from "react-native"
import TransactionIcon from "./TransactionIcon"
import { StyleSheet } from "react-native"
import { GlobalStyles } from "../../constants/styles"

const TransactionDetailBanner = ({ item, onPress }) => {
    const { type, category, amount, name, timestamp } = item
    const handleOnPress=(item) => {
       onPress(item)
    }
  return (
      <Pressable onPress={() => handleOnPress(item)}>
      <View style={styles.bannerContainer}>
         <View style={styles.iconContainer}>
              <TransactionIcon type={type} category={category}/>
         </View>
         <View style={styles.transactionDetailContainer}>
              <Text style={styles.description}> {name}</Text>
              <Text style={styles.category}>{new Date(timestamp).toDateString()}</Text>
         </View>
         <View style={styles.amountDetailContainer}>
              <Text style={styles.amount}> ${amount}</Text>
         </View>
       </View>
     </Pressable>
  )
}

export default TransactionDetailBanner

const styles=StyleSheet.create({
    bannerContainer:{
        flexDirection: "row",
        alignItems: 'center',
        gap: 18,
        marginVertical: 8,
    },
    iconContainer:{
        width: "13%"
    },
    transactionDetailContainer:{
        width: "60%"

    },
    description:{
        fontSize: 18,
        fontWeight: 'bold'
    },
    category:{
        fontWeight: '500',
        color: GlobalStyles.colors.gray500,
        paddingLeft: 6
    },

    amountDetailContainer:{
        width: "28%"

    },
    amount:{
        fontSize: 18,
        fontWeight: 'bold'

    }



})
