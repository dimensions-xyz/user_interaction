import React, { useEffect } from 'react'
import { View, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { LoginScreen } from '../screens'
import { PostScreen, AlbumsScreen, TodosScreen, ProfileScreen, } from '../screens/tabs'
import { COLORS } from '../../constants/theme'
import { getUser } from '../utils/requests/GetDataUtils'
import Icon from 'react-native-ionicons'
import { useSelector } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'

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

    const state = useSelector((state) => state);
    console.log("HS stated from router ->", state.data[state.data.length - 1].userid)

    useEffect(() => {
        AsyncStorage.getItem("userid").then(value => {
            if (value == null) {
                AsyncStorage.setItem("userid", state.data[state.data.length - 1].userid.toString())
            }
        })
    });

    return (
        <Tab.Navigator screenOptions={options.tabBarStyle}>

            <Tab.Screen
                name="PostScreen"
                component={PostScreen}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <Icon name="home" focused={focused} color={focused ? COLORS.purple : COLORS.gray} />
                        );
                    }
                }}
            />

            <Tab.Screen
                name="AlbumsScreen"
                component={AlbumsScreen}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <Icon name="images" focused={focused} color={focused ? COLORS.purple : COLORS.gray} />
                        );
                    }
                }}
            />

            <Tab.Screen
                name="TodosScreen"
                component={TodosScreen}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <Icon name="book" focused={focused} color={focused ? COLORS.purple : COLORS.gray} />
                        );
                    }
                }}
            />

            <Tab.Screen
                name="ProfileScreen"
                component={ProfileScreen}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <Icon name="person" focused={focused} color={focused ? COLORS.purple : COLORS.gray} />
                        );
                    }
                }}
            />

        </Tab.Navigator>
    );

}

export default Router;