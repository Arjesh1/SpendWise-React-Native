import { StyleSheet, View } from "react-native"
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { GlobalStyles } from "../../constants/styles";
import { useEffect, useState } from "react";


const TransactionIcon = ({type, category}) => {
  console.log(category)
  const [icon, setIcon] = useState()

  useEffect(()=>{
      switch (category) {
        case "Travel":
          setIcon("train")
          break;
        case "Grocery":
          setIcon("shopping-basket")
          break;
        case "Shopping":
          setIcon("shopping-cart")
          break;
        case "House":
          setIcon("home")
          break;
        case "Food":
          setIcon("cutlery")
          break;
        default:
          setIcon("flickr")
          break;
    }
  }, [type, category])

  

  
  return (
    <>
      <View style={type === 'income' ?styles.incomeIconContainer :styles.expensesIconContainer}>
        <FontAwesome name={type === 'income' ? 'money': icon} color={type === 'income' ? GlobalStyles.colors.primary500 : GlobalStyles.colors.error500} size={30} />
        </View>
    </>
  )
}

export default TransactionIcon

const styles = StyleSheet.create({
    expensesIconContainer:{
      padding: 10,
      borderRadius: 10,
      backgroundColor: GlobalStyles.colors.error100,
      width: '100%'
    },
    incomeIconContainer:{
      padding: 10,
      borderRadius: 10,
      backgroundColor: GlobalStyles.colors.primary100,
      width: '100%'
    },
})
