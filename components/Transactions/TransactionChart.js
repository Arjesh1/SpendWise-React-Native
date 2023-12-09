import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { PieChart } from "react-native-gifted-charts";
import { GlobalStyles } from '../../constants/styles';

const TransactionChart = () => {

    const data = [{ value: 50 }, { value: 80 }, { value: 90 }, { value: 70 }]

    
  return (
      <View style={styles.chartContainer}>
          <PieChart data={data} />
    </View>
  )
}

export default TransactionChart
const styles = StyleSheet.create({
    chartContainer:{
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
        height: '35%'
    }
})