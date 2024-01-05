import { StyleSheet, Text, View } from "react-native"
import TransactionInput from "./TransactionInput"
import { GlobalStyles } from "../../constants/styles"

const AuthInputComponent = ({ icon, textInputConfig }) => {

    const authInputStyles={
        textAlign: 'start',
        borderWidth: 0
    }


  return (
      <View style={styles.formComponentWrapper}>
          <View style={{ flex: 1 }}>
              <Text>{icon}</Text>
          </View>
          <View style={{ flex: 5 }}>
              <TransactionInput textInputConfig={textInputConfig} inputBorder={false} inputStyles={authInputStyles}/>
          </View>
      </View>
  )
}

export default AuthInputComponent

const styles= StyleSheet.create({
    formComponentWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: GlobalStyles.colors.gray400,
        paddingHorizontal: 10,
        borderRadius: 10,
        marginVertical: 10,
    },

})
