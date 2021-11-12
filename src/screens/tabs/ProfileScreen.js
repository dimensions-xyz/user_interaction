import React from 'react';
import { View, Text, SafeAreaView, StatusBar, TouchableOpacity } from 'react-native';
import { IconLogOut } from '../../assets/svg';
import { Header } from '../../components';
import { COLORS, FONTS } from '../../../constants/theme';
import { ProfileInfo } from '../../components/statics';
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../../redux/actions/UserActions"

const ProfileScreen = ({ navigation }) => {

    const state = useSelector((state) => state);
    const dispatch = useDispatch();

    console.log("HS state data ->", state.data)
    console.log("HS state last index ->", state.data[state.data.length - 1])

    const logOut = () => {
        dispatch(removeUser(state.data))
        navigation.navigate("LoginScreen")
    }

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: COLORS.bgColor
        }}>

            <StatusBar
                backgroundColor={COLORS.bgColor}
                barStyle={'dark-content'}
            />

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