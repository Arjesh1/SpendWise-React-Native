import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Alert} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AllExpenses from './screens/AllExpenses';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { GlobalStyles } from './constants/styles';
import Dashboard from './screens/Dashboard';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profile from './screens/Profile';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import NetInfo from '@react-native-community/netinfo';
import { useEffect, useState } from 'react';


const ButtomTab = createBottomTabNavigator();
const Stack = createNativeStackNavigator()

export const Index = () => {
    const [isConnected, setIsConnected] = useState(true)
    console.log(isConnected)
    const alertMsg = 'Sorry, no internet connectivity detected. Please reconnect and try again'

    const noInternetAlert = () =>
    Alert.alert('No Internet Connection', alertMsg, [
      {text: 'OK', onPress: () => null },
    ]);
  
    useEffect(() => {
        const checkInternetConnectivity = async () => {
          const state = await NetInfo.fetch();
          setIsConnected(state.isConnected);
        };
    
        const handleConnectivityChange = (state) => {
          setIsConnected(state.isConnected);
        };
    
        NetInfo.addEventListener(handleConnectivityChange);
        checkInternetConnectivity();
    
        return () => {
          NetInfo.removeEventListener(handleConnectivityChange);
        };
      }, []);
    
      useEffect(() => {
        if (!isConnected) {
          noInternetAlert();
        }
      }, [isConnected]);
  
    function ButtomTabNavigation(){
        return(
          <ButtomTab.Navigator screenOptions={{
            tabBarStyle: { backgroundColor: '#020617', justifyContent: 'flex-end', alignItems: 'flex-end' },
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
        )
      }


  return (
    <>
       <StatusBar style="light" />
       <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false}} initialRouteName='Login'>
          <Stack.Screen name='Home' component={ButtomTabNavigation}/>
          <Stack.Screen name='Login' component={LoginScreen} />
        </Stack.Navigator>
        
       </NavigationContainer>
      {/* <ToastManager width={width - 20} height={'5.8%'} positionValue={20} textStyle={{ fontSize: 15, fontWeight: 'bold' }} animationStyle={'rightInOut'} duration={2000}/> */}
    </>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: GlobalStyles.colors.primary600
    },
  })