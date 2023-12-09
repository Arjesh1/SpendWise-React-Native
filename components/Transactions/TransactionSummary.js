import React from 'react'
import { Text } from 'react-native'
import { View } from 'react-native'

const TransactionSummary = ({periodName}) => {
    return (
        <View>
            <Text>{periodName}</Text>
            <Text>Summary</Text>

        </View>
    )
}

export default TransactionSummary
