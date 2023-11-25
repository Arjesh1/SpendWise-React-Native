import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import ManageExpenses from './screens/ManageExpenses';
import RecentExpenses from './screens/RecentExpenses';
import AllExpenses from './screens/AllExpenses';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { GlobalStyles } from './constants/styles';
import Dashboard from './screens/Dashboard';

const Stack = createNativeStackNavigator();
const ButtomTab = createMaterialBottomTabNavigator();

function ExpensesOverview() {
  return (
    <ButtomTab.Navigator barStyle={{ backgroundColor: GlobalStyles.colors.primary400, padding: 2 }} theme={'red'} activeColor={GlobalStyles.colors.white} inactiveColor={GlobalStyles.colors.accent500} >
      <ButtomTab.Screen name='Dashboard' component={Dashboard} options={{
        tabBarLabel: 'Dashboard',
        tabBarIcon: ({ color, focused }) => <FontAwesome name="dashboard" color={focused ? 'black' : color} size={26} />,
      }} />
      <ButtomTab.Screen name='AllExpenses' component={AllExpenses} options={{
        tabBarLabel: 'All Expenses',
        tabBarIcon: ({ color, focused }) => <FontAwesome name="list" color={focused ? 'black' : color} size={26} />,
        tabBarColor: 'red'
      }} />

    </ ButtomTab.Navigator>
  )
}

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='ExpensesOverview' component={ExpensesOverview} options={{ headerShown: false }} />
          <Stack.Screen name='ManageExpense' component={ManageExpenses} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})


