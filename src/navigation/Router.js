import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen, SplashScreen, HomeScreen } from '../screens';
import { COLORS } from '../../constants/theme';
import { getUser } from '../utils/requests/GetDataUtils';

const Stack = createStackNavigator();

const options = {
    headerShown: false,
    gestureEnabled: false,
}

const Router = () => {

    return (
        <NavigationContainer>

            <Stack.Navigator screenOptions={options}>

                <Stack.Screen
                    component={SplashScreen}
                    name="SplashScreen"
                />

                <Stack.Screen
                    component={LoginScreen}
                    name="LoginScreen"
                />

                <Stack.Screen
                    component={HomeScreen}
                    name="HomeScreen"
                />

            </Stack.Navigator>

        </NavigationContainer >
    );

}

export default Router;