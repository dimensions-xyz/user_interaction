import React, { useState } from 'react';
import { View, Text, SafeAreaView, StatusBar, ScrollView } from 'react-native';
import { Header, CustomTextInput, CustomButton } from '../components';
import { IconPerson } from '../assets/svg';
import { COLORS, SIZES } from '../../constants/theme';
import { LoginRequest } from '../utils/requests/LoginUtils';
import { useDispatch } from "react-redux";
import { addUser } from "../redux/actions/UserActions";
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {

    const [username, setUsername] = useState('');
    const [status, setStatus] = useState('');

    const dispatch = useDispatch();

    AsyncStorage.setItem("userid", "")

    // Giriş butonuna tıklanınca çalıştırılıcak olan asenktron fonksiyon
    const signIn = async () => {

        // Kullanıcı adı boşsa
        if (username != "") {
            LoginRequest(username).then(result => {

                // İnternet bağlantısı varsa
                if (result.isConnected) {

                    // Gelen json verisi yoksa
                    if (result.status.length < 1) {
                        setStatus('Lütfen geçerli bir kullanıcı adı giriniz.')
                    } else {
                        dispatch(addUser({ userid: result.status[0].id }))
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'HomeScreen' }],
                        });
                    }

                }
                else {
                    setStatus('İnternet bağlantınızı kontrol ediniz.')
                }

            });
        }
        else {
            setStatus('Kullanıcı adı boş bırakılamaz!')
        }

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

            <Header title="Giriş Yapın" />

            {/* Ekranda boş yerlere tıklanınca klavyenin kapanması için scrollview kullandım */}
            <ScrollView contentContainerStyle={{
                flex: 1,
                justifyContent: 'center',
            }}>

                <View style={{
                    marginTop: 80,
                    marginHorizontal: 30,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>

                    {/* Kullanıcı adı giriş inputu */}
                    <CustomTextInput
                        icon={(<IconPerson color={COLORS.fadePurple} />)}
                        maxLength={24}
                        placeholder={"Kullanıcı adı giriniz"}
                        onChangeText={(username) => {
                            setUsername(username)
                            setStatus('')
                        }}
                    />

                    {/* Giriş durumu yazısı */}
                    <Text style={{
                        fontSize: 13,
                        marginTop: 20,
                        color: 'red',
                        fontFamily: 'Roboto-Regular'
                    }}>{status}</Text>

                    {/* Giriş butonu */}
                    <CustomButton style={{
                        marginTop: 80
                    }}
                        onPress={() => signIn()}
                        text="Giriş Yap"
                    />

                </View>

            </ScrollView>

        </SafeAreaView>
    );

}

export default LoginScreen;