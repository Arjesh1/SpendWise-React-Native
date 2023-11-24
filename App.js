import { StatusBar } from 'expo-status-bar';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import ManageExpenses from './screens/ManageExpenses';
import RecentExpenses from './screens/RecentExpenses';
import AllExpenses from './screens/AllExpenses';

const Stack = createNativeStackNavigator();
const ButtomTab = createMaterialBottomTabNavigator();

function ExpensesOverview() {
  return(
    <ButtomTab.Navigator>
      <ButtomTab.Screen name='RecentExpenses' component={RecentExpenses}/>
      <ButtomTab.Screen name='AllExpenses' component={AllExpenses}/>
    </ButtomTab.Navigator>
  )
}

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='ExpensesOverview' component={ExpensesOverview} options={{headerShown: false}}/>
          <Stack.Screen name='ManageExpense' component={ManageExpenses}/>
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}


