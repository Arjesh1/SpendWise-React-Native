import { View, Text, TextInput, StyleSheet } from "react-native"
import { GlobalStyles } from "../../constants/styles"

const TransactionInput = ({ label, textInputConfig, inputStyles }) => {
  return (
    <View>
      {label ? <Text style={styles.labelText}>{label}:</Text> :null}
      <TextInput placeholderTextColor={GlobalStyles.colors.gray500} style={ [styles.input, { ...inputStyles }]} {...textInputConfig}/>
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
    padding: 5,
    fontSize: 20,
    borderRadius: 10,
    borderColor: GlobalStyles.colors.gray400,
    fontWeight: 'bold'
  }
})