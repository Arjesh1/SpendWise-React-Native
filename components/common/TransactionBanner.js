import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { GlobalStyles } from '../../constants/styles'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const TransactionBanner = ({icon, name}) => {
  return (
      <View style={styles.transaction}>
          <FontAwesome5 name={icon} color={name === 'Expenses' ? GlobalStyles.colors.error600 : GlobalStyles.colors.primary700} size={30} />
          <View>
              <Text style={{ fontSize: 18 }}>{name}</Text>
              <Text style={{
                  fontWeight: 'bold', fontSize: 20, textAlign: 'center', ...(name === 'Expenses'
                      ? { color: GlobalStyles.colors.error600}
                      : { color: GlobalStyles.colors.primary700}), }}>$ 500</Text>
          </View>
      </View>
  )
}

export default TransactionBanner
const styles = StyleSheet.create({
    transaction: {
        backgroundColor: GlobalStyles.colors.white,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 18,
        borderRadius: 15,
        flexDirection: 'row',
        gap: 20
    },
})
