import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, SafeAreaView, StatusBar, FlatList, Image, TouchableOpacity, RefreshControl, ActivityIndicator } from 'react-native';
import { IconLogOut } from '../../../assets/svg';
import { Header } from '../../../components';
import { COLORS, FONTS } from '../../../../constants/theme';
import { getAlbums } from '../../../utils/requests/GetDataUtils';
import { wait } from '../../../utils/PromiseUtils';

const AlbumsScreen = ({ navigation }) => {

    const [data, setData] = useState([])
    const [isLoading, setisLoading] = useState(false)
    const [refreshing, setRefreshing] = useState(false)

    useEffect(() => {

        setisLoading(true)
        getData()

    }, [])

    // Navigasyonun önbelleğini silip çıkış yapar
    const logOut = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'LoginScreen' }],
        });
    }

    // Flatlist refresh fonksiyonu
    const onRefresh = useCallback(() => {

        setRefreshing(true)

        wait(2000).then(() => {
            setRefreshing(false)
            getData()
        }, [refreshing]);

    })

    // Kullanıcının albümlerini getirir
    const getData = async () => {

        getAlbums().then((result) => {
            if (result.isConnected) {
                setData(result.albums)
                setisLoading(false)
            } else {
                alert("İnternet Bağlantınızı Kontrol ediniz!")
            }
        });

    }

    // Render Item
    const renderItem = ({ item }) => {

        return (
            <TouchableOpacity style={{
                marginHorizontal: 10,
                marginVertical: 5,
                borderWidth: 2,
                borderRadius: 25,
                borderColor: COLORS.purple,
            }}
                onPress={() => navigation.navigate("PhotosScreen", {
                    // Fotoğraflar için id argümanını PhotoScreen komponentine iletir
                    currentAlbum: item.id
                })}
            >

                <View style={{
                    padding: 30,
                    borderRadius: 25,
                    alignItems: 'center',
                }}>

                    {/* Albüm Sırası */}
                    <Text style={{
                        ...FONTS.title,
                        color: COLORS.purple
                    }}>{item.queue + ". albüm"}</Text>

                    {/* Albüm başlığı */}
                    <Text style={{
                        ...FONTS.desc,
                        color: COLORS.purple,
                        textAlign: 'center'
                    }}>{item.title}</Text>

                </View>

            </TouchableOpacity>
        );

    }

    // Renderlanma bilgisini alıp ona göre dönme animasyonunu gösterir
    const renderFooter = () => {

        return (
            isLoading ?
                <View style={{
                    marginTop: 10,
                    alignItems: 'center'
                }}>

                    <ActivityIndicator size="large" />

                </View> : null
        );

    }

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: COLORS.bgColor
        }}>

            <Header
                title="Albümler"
                rightIcon={(<IconLogOut color={COLORS.purple} />)}
                onPressRightIcon={() => logOut()}
            />

            <FlatList
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
                data={data}
                renderItem={renderItem}
                keyExtractor={(item, index) => index}
                ListFooterComponent={renderFooter}
            />

        </SafeAreaView>
    );

}

export default AlbumsScreen;