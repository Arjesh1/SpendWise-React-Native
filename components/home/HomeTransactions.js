import React from 'react'
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native'
import { GlobalStyles } from '../../constants/styles'
import TransactionDetailBanner from '../common/TransactionDetailBanner'
import Feather from 'react-native-vector-icons/Feather'

const HomeTransactions = ({ name }) => {
  return (
    <View style={styles.HomeTransactionContainer}>
      <View style={styles.homeHeader}>
        <Text style={styles.headertext}>{name}</Text>
      </View>
        <ScrollView style={styles.transactionLists}>
        <TransactionDetailBanner type="income"  description="Salary" amount="100" />
        <TransactionDetailBanner type="expenses" category="Travel" description="Fuel" amount="200" />
        <TransactionDetailBanner type="expenses" category="Food" description="Mc Donald's" amount="25" />
        <TransactionDetailBanner type="expenses" category="Grocery"  description="Grocery" amount="1000" />
        <TransactionDetailBanner type="expenses" category="Shopping" description="Mc Donald's" amount="25" />
        <TransactionDetailBanner type="expenses" category="House" description="Mc Donald's" amount="25" />
        <TransactionDetailBanner type="expenses" category="Other" description="Mc Donald's" amount="25" />
        </ScrollView>
        <Pressable style={styles.addContainer}>
        <View style={styles.addButton}>
          <Feather name='plus-circle' color='white' size= {31} />
        </View>

        </Pressable>

    </View>
  )
}

export default HomeTransactions

const styles = StyleSheet.create({
    HomeTransactionContainer:{
      marginTop: 8,
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
    borderBottomColor: GlobalStyles.colors.gray300
  },
  headertext:{
    fontSize: 20,
    fontWeight: "700",
    color: GlobalStyles.colors.gray700
  },
  transactionLists:{
    padding: 8,
    gap: 5,
    marginBottom:5
  },
  addContainer:{
    position: 'absolute',
    bottom: 15,
    right: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },

  addButton:{
    backgroundColor: GlobalStyles.colors.primary500,
    flex: 1,
    padding: 8,
    aspectRatio: 4/4,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 99,
  
  },


})
