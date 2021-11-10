import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { LoginScreen } from '../screens'
import { PostScreen, SearchScreen, TodosScreen, ProfileScreen, } from '../screens/tabs'
import { COLORS } from '../../constants/theme';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const options = {
    headerShown: false,
    gestureEnabled: false,
    tabBarStyle: {
        headerShown: false,
        tabBarShowLabel: false,
        backgroundColor: COLORS.bgColor,
    }
}

const Router = () => {

    return (
        <NavigationContainer>

            <Stack.Navigator screenOptions={options}>

                <Stack.Screen
                    component={LoginScreen}
                    name="LoginScreen"
                />

                <Stack.Screen
                    component={HomeScreen}
                    name="HomeScreen"
                />

            </Stack.Navigator>

        </NavigationContainer>
    );

}

const HomeScreen = () => {

    return (
        <Tab.Navigator screenOptions={options.tabBarStyle}>

            <Tab.Screen
                name="Gönderiler"
                component={PostScreen}
            />

            <Tab.Screen
                name="Ara"
                component={SearchScreen}
            />

            <Tab.Screen
                name="Yapılacaklar"
                component={TodosScreen}
            />

            <Tab.Screen
                name="Profil"
                component={ProfileScreen}
            />

        </Tab.Navigator>
    );

}

export default Router;