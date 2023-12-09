import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import ManageExpenses from './screens/ManageExpenses';
import AllExpenses from './screens/AllExpenses';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { GlobalStyles } from './constants/styles';
import Dashboard from './screens/Dashboard';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const ButtomTab = createBottomTabNavigator();

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <NavigationContainer>
        <ButtomTab.Navigator screenOptions={{
          tabBarStyle: { backgroundColor: '#020617' },
          headerShown: false,
          tabBarActiveTintColor: GlobalStyles.colors.mainColor,
        }}  >
          <ButtomTab.Screen name='Dashboard' component={Dashboard} options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ focused }) => <FontAwesome name="home" color={focused ? GlobalStyles.colors.mainColor : 'white'} size={26} />,
          }} />
          <ButtomTab.Screen name='Transactions' component={AllExpenses} options={{
            tabBarLabel: 'Transactions',
            tabBarIcon: ({ focused }) => <FontAwesome name="list" color={focused ? GlobalStyles.colors.mainColor : 'white'} size={26} />,
          }} />
          <ButtomTab.Screen name='Profile' component={AllExpenses} options={{
            tabBarLabel: 'Profile',
            tabBarIcon: ({ focused }) => <FontAwesome name="user" color={focused ? GlobalStyles.colors.mainColor : 'white'} size={26} />,
          }} />
        </ ButtomTab.Navigator>
      </NavigationContainer>
      
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})


