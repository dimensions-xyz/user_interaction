import React from 'react';
import { View, Text, SafeAreaView, StatusBar, TouchableOpacity, ScrollView } from 'react-native';
import { IconLogOut } from '../../../assets/svg';
import { Header } from '../../../components';
import { COLORS, FONTS } from '../../../../constants/theme';
import { ProfileInfo } from '../../../components/statics';
import { useSelector } from "react-redux";

const ProfileScreen = ({ navigation }) => {

    const state = useSelector((state) => state);

    console.log("HS state data ->", state.data)
    console.log("HS state last index ->", state.data[state.data.length - 1])

    const logOut = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'LoginScreen' }],
        });
    }

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: COLORS.bgColor
        }}>

            <Header
                title="Profil"
                rightIcon={(<IconLogOut color={COLORS.purple} />)}
                onPressRightIcon={() => logOut()}
            />

            <View style={{
                flex: 1,
                alignItems: 'center',
                flexDirection: 'row'
            }}>

                <View style={{
                    height: '90%',
                    width: 5,
                    marginHorizontal: 6,
                    borderRadius: 25,
                    backgroundColor: COLORS.purple,
                }} />

                <ProfileInfo />

            </View>

        </SafeAreaView>
    );

}

export default ProfileScreen;