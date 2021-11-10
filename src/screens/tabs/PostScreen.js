import React from 'react';
import { View, Text, SafeAreaView, StatusBar } from 'react-native';
import { IconLogOut } from '../../assets/svg';
import { Header } from '../../components';
import { COLORS } from '../../../constants/theme'

const PostScreen = ({ navigation }) => {

    const logOut = () => {
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
                title="Gönderiler"
                rightIcon={(<IconLogOut color={COLORS.purple} />)}
                onPressRightIcon={() => logOut()}
            />

        </SafeAreaView>
    );

}

export default PostScreen;