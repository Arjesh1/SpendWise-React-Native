import { StyleSheet, View, Text } from "react-native"
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { GlobalStyles } from "../../constants/styles";
import { useEffect, useState } from "react";


const TransactionIcon = ({ type, category, text }) => {
  const [icon, setIcon] = useState()

  useEffect(()=>{
      switch (category) {
        case "Travel":
          setIcon({name:"train", size:31})
          break;
        case "Grocery":
          setIcon({ name: "shopping-basket", size: 24})
          break;
        case "Shopping":
          setIcon({ name: "shopping-cart", size: 31 })
          break;
        case "House":
          setIcon({ name: "home", size: 31 })
          break;
        case "Food":
          setIcon({ name: "cutlery", size: 33 })
          break;
        default:
          setIcon({ name: "flickr", size: 31 })
          break;
    }
  }, [type, category])

  

  
  return (
    <>
      <View style={type === 'income' ?styles.incomeIconContainer :styles.expensesIconContainer}>
        {icon && icon.size && icon.name ?
            <FontAwesome name={type === 'income' ? 'money' : icon.name} color={type === 'income' ? GlobalStyles.colors.primary500 : GlobalStyles.colors.error500} size={icon.size ? icon.size : 31} />
        :null}
        </View>
        {text?
        <Text style={styles.iconDescription}>{text}</Text>
        :null}

      
    </>
  )
}

export default TransactionIcon

const styles = StyleSheet.create({
    expensesIconContainer:{
      padding: 10,
      borderRadius: 10,
      backgroundColor: GlobalStyles.colors.error100,
      justifyContent: 'center',
      alignItems: 'center',
      height: 50,
      width: 50
    },
    incomeIconContainer:{
      paddingHorizontal: 7.5,
      paddingVertical: 10,
      borderRadius: 10,
      backgroundColor: GlobalStyles.colors.primary100,
    },
  iconDescription:{
    textAlign: 'center',
    fontSize: 11,
    fontWeight: 'bold'
  }
})
