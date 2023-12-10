import React from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { GlobalStyles } from '../../constants/styles'
import TransactionDetailBanner from '../common/TransactionDetailBanner'

const HomeTransactions = () => {
  return (
    <View style={styles.HomeTransactionContainer}>
      <View style={styles.homeHeader}>
        <Text style={styles.headertext}>Recent</Text>
      </View>
        <ScrollView style={styles.transactionLists}>
        <TransactionDetailBanner type="income" category="Shopping" />
        <TransactionDetailBanner type="expenses" category="Travel" />
        <TransactionDetailBanner type="expenses" category="Food" />
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
        paddingHorizontal: 10,
    },
  homeHeader:{
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: GlobalStyles.colors.gray500
  },
  headertext:{
    fontSize: 20,
    fontWeight: "700",
  },
  transactionLists:{
    padding: 8,
    gap: 5,
  },


})
