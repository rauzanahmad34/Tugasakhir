import React from 'react'
import { View, Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native'
// pages
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import Register from '../pages/Register';
import ListGejala from '../pages/ListGejala';
import ListBobot from '../pages/ListBobot';
import AnalisaAdd from '../pages/AnalisaAdd';
import DetailsAnalisa from '../pages/DetailsAnalisa';
import ListHistory from '../pages/ListHistory';
import DetailNews from '../pages/DetailNews';

const Stack = createStackNavigator();


const Router = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen name="Login" component={Login} options={{ headerShown:false}}/>
                <Stack.Screen name="Dashboard" component={Dashboard} options={{headerShown:false}}/>
                <Stack.Screen name="Register" component={Register} options={{headerShown:false}}/>
                <Stack.Screen name="ListGejala" component={ListGejala} options={{headerShown:false}}/>
                <Stack.Screen name="ListBobot" component={ListBobot} options={{headerShown:false}}/>
                <Stack.Screen name="AnalisaAdd" component={AnalisaAdd} options={{headerShown:false}}/>
                <Stack.Screen name="Details" component={DetailsAnalisa} options={{headerShown:false}}/>
                <Stack.Screen name="ListHistory" component={ListHistory} options={{headerShown:false}}/>
                <Stack.Screen name="DetailNews" component={DetailNews} options={{headerShown:false}}/>
            </Stack.Navigator>
        </NavigationContainer>
      
    )
}

export default Router
