import { Text, View } from "react-native"
import TransactionIcon from "./TransactionIcon"
import { StyleSheet } from "react-native"
import { GlobalStyles } from "../../constants/styles"

const TransactionDetailBanner = ({type, category}) => {
  return (
    <View style={styles.bannerContainer}>
        <View style={styles.iconContainer}>
              <TransactionIcon type={type} category={category}/>
        </View>
        <View style={styles.transactionDetailContainer}>
              <Text style={styles.description}> Woolworth</Text>
              <Text style={styles.category}> Shopping</Text>
        </View>
        <View style={styles.amountDetailContainer}>
              <Text style={styles.amount}> $500</Text>
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
        

    },
    transactionDetailContainer:{
        flex: 5

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
        

    },
    amount:{
        fontSize: 20,
        fontWeight: 'bold'

    }



})
