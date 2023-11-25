import React from 'react'
import { View } from 'react-native'
import TransactionList from './TransactionList'
import TransactionSummary from './TransactionSummary'

const TransactionOutput = ({ item }) => {
    return (
        <View>
            <TransactionList />
            <TransactionSummary />
        </View>
    )
}

export default TransactionOutput
