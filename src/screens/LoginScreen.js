import React, { useState } from 'react';
import { View, Text, SafeAreaView, StatusBar, ScrollView } from 'react-native';
import { Header, CustomTextInput, CustomButton } from '../components';
import { IconPerson } from '../assets/svg';
import { COLORS, SIZES } from '../../constants/theme';
import NetworkUtils from '../utils/NetworkUtils';
import { LoginRequest } from '../utils/GETutils';

const LoginScreen = ({ navigation }) => {

    const [username, setUsername] = useState('');
    const [status, setStatus] = useState('');

    const signIn = async () => {

        if (username != "") {
            LoginRequest(username).then(result => {

                if (result.isConnected) {
                    if (result.status.length < 1) {
                        setStatus('Geçerli bir kullanıcı adı giriniz.')
                    }
                    else {
                        navigation.navigate('HomeScreen')
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

                    {/* Username */}
                    <CustomTextInput
                        icon={(<IconPerson color={COLORS.fadePurple} />)}
                        maxLength={24}
                        placeholder={"Kullanıcı adı giriniz"}
                        onChangeText={(username) => {
                            setUsername(username)
                            setStatus('')
                        }}
                    />

                    <Text style={{
                        fontSize: 13,
                        marginTop: 20,
                        color: 'red',
                        fontFamily: 'Roboto-Regular'
                    }}>{status}</Text>

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