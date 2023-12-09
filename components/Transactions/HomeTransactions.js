import React from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { GlobalStyles } from '../../constants/styles'

const HomeTransactions = () => {
  return (
    <View style={styles.HomeTransactionContainer}>
        <ScrollView style={{gap: 10}}>
              <Text>Hello</Text>
        </ScrollView>
    </View>
  )
}

export default HomeTransactions

const styles = StyleSheet.create({
    HomeTransactionContainer:{
        backgroundColor: GlobalStyles.colors.white,
        flex: 1,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        paddingHorizontal: 25,
        paddingVertical: 18
        
    }
})
