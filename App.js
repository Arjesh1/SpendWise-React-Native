import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AllExpenses from './screens/AllExpenses';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { GlobalStyles } from './constants/styles';
import Dashboard from './screens/Dashboard';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider } from "react-redux";
import store from './reduxStore/store';
import Profile from './screens/Profile';

const ButtomTab = createBottomTabNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <StatusBar style="light" />
      <NavigationContainer>
        <ButtomTab.Navigator screenOptions={{
          tabBarStyle: { backgroundColor: '#020617', justifyContent:'flex-end', alignItems: 'flex-end' },
          headerShown: false,
          tabBarActiveTintColor: GlobalStyles.colors.primary700,
        }}  >
          <ButtomTab.Screen name='Dashboard' component={Dashboard} options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ focused }) => <FontAwesome name="home" color={focused ? GlobalStyles.colors.primary700 : 'white'} size={26} />,
          }} />
          <ButtomTab.Screen name='Transactions' component={AllExpenses} options={{
            tabBarLabel: 'Transactions',
            tabBarIcon: ({ focused }) => <FontAwesome name="list" color={focused ? GlobalStyles.colors.primary700 : 'white'} size={26} />,
          }} />
          <ButtomTab.Screen name='Profile' component={Profile} options={{
            tabBarLabel: 'Profile',
            tabBarIcon: ({ focused }) => <FontAwesome name="user" color={focused ? GlobalStyles.colors.primary700 : 'white'} size={26} />,
          }} />
        </ ButtomTab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.primary600
  },
})


