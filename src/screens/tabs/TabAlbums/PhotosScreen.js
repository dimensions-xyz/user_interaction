import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, SafeAreaView, StatusBar, FlatList, TouchableOpacity, ActivityIndicator, RefreshControl, Image, Modal } from 'react-native';
import { Header } from '../../../components';
import { COLORS, FONTS, SIZES } from '../../../../constants/theme';
import { useRoute } from '@react-navigation/core';
import { getPhotos } from '../../../utils/requests/GetDataUtils';
import { wait } from '../../../utils/PromiseUtils';
import Icon from 'react-native-ionicons';
import { CustomModal } from '../../../components';

const PhotosScreen = ({ navigation }) => {

    const [data, setData] = useState([])
    const [refreshing, setRefreshing] = useState(false)
    const [isLoading, setisLoading] = useState(false)
    const [pageCurrent, setpageCurrent] = useState(0)
    const [photoVisible, setphotoVisible] = useState(false)
    const [photoUrl, setphotoUrl] = useState("")

    const route = useRoute()
    const { currentAlbum } = route.params

    useEffect(() => {

        setisLoading(true)
        getData()

    }, [pageCurrent])

    // Flatlist refresh fonksiyonu
    const onRefresh = useCallback(() => {

        setRefreshing(true)

        wait(2000).then(() => {
            setRefreshing(false)
            getData()
        }, [refreshing]);

    })

    // Girilen albümün fotoğraflarını getirir
    const getData = async () => {

        getPhotos(pageCurrent, currentAlbum).then(result => {
            if (result.isConnected) {
                setData(data.concat(result.photos))
                setisLoading(false)
            }
            else {
                alert("İnternet Bağlantınızı Kontrol ediniz!")
            }
        });

    }

    // Render Item
    const renderItem = ({ item }) => {

        const radius = 20

        return (
            <View style={{
                flex: 1,
                backgroundColor: COLORS.bgColor
            }}>

                <TouchableOpacity
                    style={{
                        margin: 5,
                    }}
                    activeOpacity={.5}
                    onPress={() => {
                        setphotoUrl(item.url)
                        setphotoVisible(true)
                    }}
                >

                    {/* Mor renkli kapsayıcı */}
                    <View style={{
                        width: SIZES.width * 0.475,
                        backgroundColor: COLORS.purple,
                        borderRadius: radius,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>

                        {/* Fotoğraflar */}
                        <Image style={{
                            height: 150,
                            width: 150,
                            marginTop: 8,
                            borderRadius: radius
                        }}
                            source={{ uri: item.thumbnailUrl }}
                        />

                        {/* Fotoğraf başlıkları */}
                        <Text style={{
                            padding: 10,
                            color: COLORS.bgColor,
                            ...FONTS.body,
                            textAlign: 'center',
                        }}>{item.title}</Text>

                    </View>

                </TouchableOpacity>

            </View>
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

    // Fonksiyon çalıştırıldığında veriler 5. sayfaya kadar yüklenir
    const handleLoadMore = () => {
        pageCurrent < 5 ? setpageCurrent(pageCurrent + 1) : 0
        setisLoading(true)
    }

    return (
        <SafeAreaView>

            <StatusBar
                backgroundColor={photoVisible === true ? 'rgba(0,0,0,0.5)' : COLORS.bgColor}
                barStyle={'dark-content'}
            />

            <Header
                title="Fotoğraflar"
                leftIcon={(<Icon name="arrow-back" color={COLORS.purple} />)}
                onPressLeftIcon={() => navigation.goBack()}
            />

            {/* Tıklanınca açılan fotoğraf modal ekranı */}
            <CustomModal
                url={photoUrl}
                visible={photoVisible}
            >

                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => setphotoVisible(false)}
                >

                    <Image resizeMode="center" style={{
                        width: 600,
                        height: 600
                    }} source={{ uri: photoUrl }} />

                </TouchableOpacity>

            </CustomModal>

            <FlatList contentContainerStyle={{
                backgroundColor: COLORS.bgColor,
                paddingBottom: SIZES.height * 0.1
            }}
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
                onEndReached={pageCurrent != 10 ? handleLoadMore : null}
                onEndReachedThreshold={0.001}
                numColumns={2}
            />

        </SafeAreaView >
    );

}

export default PhotosScreen;