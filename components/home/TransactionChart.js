import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { PieChart } from "react-native-gifted-charts";
import { useSelector } from 'react-redux';

const TransactionChart = () => {
    const { transactionData } = useSelector(state => state.transaction)

    function calculateCategoryExpenses(category){
        const categoryExpensesAmount = transactionData.filter((item) => item.category === category).reduce((total, item) => {
            return total + +item.amount
        }, 0)
        return categoryExpensesAmount
    }

    const expensesData = transactionData.filter((item) => item.type === 'expenses')

    const data = [
        { value: calculateCategoryExpenses('Travel'), color: '#ADD8E6', name: 'Travel', text: `$${calculateCategoryExpenses('Travel')}`},
        { value: calculateCategoryExpenses('Grocery'), color: '#FFA500', name: 'Grocery', text: `$${calculateCategoryExpenses('Grocery')}` },
        { value: calculateCategoryExpenses('Shopping'), color: '#800080', name: 'Shopping', text: `$${calculateCategoryExpenses('Shopping')}` },
        { value: calculateCategoryExpenses('House'), color: '#8B4513', name: 'House', text: `$${calculateCategoryExpenses('House')}` },
        { value: calculateCategoryExpenses('Food'), color: '#FF0000', name: 'Food', text: `$${calculateCategoryExpenses('Food')}` },
        { value: calculateCategoryExpenses('Other'), color: '#808080', name: 'Other', text: `$${calculateCategoryExpenses('Other')}` }
    ]

    
    return (
        <View style={styles.chartContainer}>
            <Text
                style={{
                    color: 'white',
                    fontSize: 30,
                    fontWeight: 'bold',
                    textAlignVertical:'top'
                }}>
                Expenses
            </Text>
            {expensesData.length > 0 ?
            <>
                    <PieChart data={data} textColor="white" focusOnPress showText textSize={15} fontWeight="bold" />
                    <View style={styles.legendWrapper}>
                        {data.map((item) => (
                            <>
                                {item.value > 0 ?
                                    <View key={item.name} style={styles.legend}>
                                        <View style={{ height: 12, aspectRatio: 1 / 1, backgroundColor: item.color }}></View>
                                        <Text style={{ color: 'white', fontSize: 15 }}>{item.name}</Text>
                                    </View>
                                    : null}
                            </>
                        ))}
                    </View>
            </>:
            <View style={{flex:1, justifyContent:'center'}}>
                    <Text style={{
                        color: 'white',
                        fontSize: 20,
                        fontWeight: '400',
}}>Please add expenses to view chart</Text>
            </View>
            }
            
        </View>
    )
}

export default TransactionChart
const styles = StyleSheet.create({
    chartContainer: {
        marginTop: 10,
        alignItems: 'center',
        height: '50%'
    },
    legendWrapper: {
        paddingHorizontal:20,
        paddingBottom: 15,
        flexDirection:'row',
        justifyContent:'center',
        gap:40,
        flexWrap:'wrap'

    },
    legend: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8
    },
})