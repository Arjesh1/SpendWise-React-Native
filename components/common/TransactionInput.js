import { View, Text, TextInput, StyleSheet } from "react-native"
import { GlobalStyles } from "../../constants/styles"

const TransactionInput = ({label, textInputConfig}) => {
  return (
    <View>
      <Text style={styles.labelText}>{label}:</Text>
      <TextInput style={styles.input} {...textInputConfig}/>
    </View>
  )
}

export default TransactionInput
const styles = StyleSheet.create({
  labelText:{
    fontSize: 18,
    color: GlobalStyles.colors.gray500,
  },
  input:{
    borderBottomWidth: 1,
    padding: 5,
    fontSize: 20,
    borderRadius: 10,
    borderColor: GlobalStyles.colors.gray400,
    textAlign: 'center',
    fontWeight: 'bold'
  }
})