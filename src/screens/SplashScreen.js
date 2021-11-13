import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { View, Text, StatusBar, Image } from 'react-native';
import { COLORS, FONTS } from '../../constants/theme';

const SplashScreen = ({ navigation }) => {

    setTimeout(() => {
        AsyncStorage.getItem("userid").then(value => {

            // Eğer daha önce giriş yapılmadıysa giriş ekranı gösterilecek
            if (value == null) {
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'LoginScreen' }],
                });
            } else {
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'HomeScreen' }],
                });
            }

        });
    }, 2500) // Splash ekranının kalma süresi

    return (
        <View style={{
            flex: 1,
            backgroundColor: COLORS.purple,
            justifyContent: 'center',
        }}>

            <StatusBar
                backgroundColor={COLORS.purple}
                translucent
            />

            {/* Splash logo ve yazısı */}
            <View style={{ alignItems: 'center' }}>

                <Image source={require("../images/img_person.png")} />

                <Text style={{
                    ...FONTS.bigTitle,
                    color: COLORS.bgColor
                }}>User Interaction</Text>

            </View>

        </View>
    );

}

export default SplashScreen;