import { StyleSheet, View } from "react-native"
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { GlobalStyles } from "../../constants/styles";


const TransactionIcon = () => {
  return (
    <>
        <View style={styles.iconConatiner}>
              <FontAwesome name="home" color={GlobalStyles.colors.error500} size={30} />
        </View>
        <View style={styles.iconConatiner}>
              <FontAwesome name="home" color={GlobalStyles.colors.error500} size={30} />
        </View>
    </>
  )
}

export default TransactionIcon

const styles = StyleSheet.create({
    iconConatiner:{
        backgroundColor: GlobalStyles.colors.error100,
        padding: 10,
        borderRadius: 10,
        marginVertical: 4,
    }
})
