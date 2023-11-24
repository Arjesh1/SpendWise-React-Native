import { StatusBar } from 'expo-status-bar';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import ManageExpenses from './screens/ManageExpenses';
import RecentExpenses from './screens/RecentExpenses';
import AllExpenses from './screens/AllExpenses';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { GlobalStyles } from './constants/styles';

const Stack = createNativeStackNavigator();
const ButtomTab = createMaterialBottomTabNavigator();

function ExpensesOverview() {
  return (
    <ButtomTab.Navigator barStyle={{ backgroundColor: GlobalStyles.colors.primary400 }} activeColor={GlobalStyles.colors.white} inactiveColor={GlobalStyles.colors.accent500} >
      <ButtomTab.Screen name='RecentExpenses' component={RecentExpenses} options={{
        tabBarLabel: 'Recent Expenses',
        tabBarIcon: ({ color, focused }) => <FontAwesome name="clock-o" color={focused ? 'black' : color} size={26} />
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
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='ExpensesOverview' component={ExpensesOverview} options={{ headerShown: false }} />
          <Stack.Screen name='ManageExpense' component={ManageExpenses} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}


