import { Text, View } from "react-native"
import TransactionIcon from "./TransactionIcon"
import { StyleSheet } from "react-native"
import { GlobalStyles } from "../../constants/styles"

const TransactionDetailBanner = ({ type, category, description, amount }) => {
  return (
    <View style={styles.bannerContainer}>
        <View style={styles.iconContainer}>
              <TransactionIcon type={type} category={category} description={description}/>
        </View>
        <View style={styles.transactionDetailContainer}>
              <Text style={styles.description}> {description}</Text>
              {category ? <Text style={styles.category}> {category}</Text> :null}
        </View>
        <View style={styles.amountDetailContainer}>
              <Text style={styles.amount}> ${amount}</Text>
        </View>
        
    </View>
    
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
        color: GlobalStyles.colors.gray500

    },

    amountDetailContainer:{
        width: "28%"

    },
    amount:{
        fontSize: 18,
        fontWeight: 'bold'

    }



})
