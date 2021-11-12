import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { COLORS } from '../../constants/theme';
import { createStackNavigator } from '@react-navigation/stack';
import { View } from 'react-native';
import { PostScreen, CommentScreen } from './tabs/TabHome';
import Icon from 'react-native-ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { AlbumsScreen, PhotosScreen } from './tabs/TabAlbums';
import { TodosScreen } from './tabs/TabTodos';
import { ProfileScreen } from './tabs/TabProfile';

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

const TabHome = () => {

    return (
        <Stack.Navigator screenOptions={options}>

            <Stack.Screen
                name="PostScreen"
                component={PostScreen}
            />

            <Stack.Screen
                name="CommentScreen"
                component={CommentScreen}
            />

        </Stack.Navigator>
    );

}

const TabPhotos = () => {

    return (
        <Stack.Navigator screenOptions={options}>

            <Stack.Screen
                name="AlbumsScreen"
                component={AlbumsScreen}
            />

            <Stack.Screen
                name="PhotosScreen"
                component={PhotosScreen}
            />

        </Stack.Navigator>
    );

}

const HomeScreen = () => {

    const state = useSelector((state) => state);

    useEffect(() => {
        AsyncStorage.getItem("userid").then(value => {
            if (value == null) {
                AsyncStorage.setItem("userid", state.data[state.data.length - 1].userid.toString())
            }
        });
    })

    return (
        <Tab.Navigator screenOptions={options.tabBarStyle}>

            <Tab.Screen
                name="TabHome"
                component={TabHome}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <Icon name="home" focused={focused} color={focused ? COLORS.purple : COLORS.gray} />
                        );
                    }
                }}
            />

            <Tab.Screen
                name="TabPhotos"
                component={TabPhotos}
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

export default HomeScreen;