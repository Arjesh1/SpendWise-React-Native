import { StyleSheet, TextInput, View } from "react-native"


export const OTPInputField = ({ }) => {
  return (
    <View style={{justifyContent:'center', alignItems:'center'}}>
        <TextInput placeholder="999088" style={styles.otpWrapper} keyboardType="numeric" maxLength={6} letterSpacing={15}/>
    </View>
  
  )
}

const styles = StyleSheet.create({
    otpWrapper:{
        width: '80%',
        paddingVertical: 20,
        paddingHorizontal: 10,
        borderWidth:3,
        textAlign: 'center',
        fontSize:30,
    }
})
