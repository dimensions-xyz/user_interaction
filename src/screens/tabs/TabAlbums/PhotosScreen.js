import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, SafeAreaView, StatusBar, FlatList, TouchableOpacity, ActivityIndicator, RefreshControl, Image } from 'react-native';
import { Header } from '../../../components';
import { COLORS, FONTS, SIZES } from '../../../../constants/theme';
import { useRoute } from '@react-navigation/core';
import { getPhotos } from '../../../utils/requests/GetDataUtils';
import { wait } from '../../../utils/PromiseUtils';

const PhotosScreen = () => {

    const [data, setData] = useState([]);
    const [refreshing, setRefreshing] = useState(false)
    const [isLoading, setisLoading] = useState(false)
    const [pageCurrent, setpageCurrent] = useState(1)

    const route = useRoute()
    const { currentAlbum } = route.params

    useEffect(() => {

        setisLoading(true)
        getData()

    }, [pageCurrent])

    const onRefresh = useCallback(() => {

        setRefreshing(true)

        wait(2000).then(() => {
            setRefreshing(false)
            getData()
        }, [refreshing]);

    })

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

    const renderItem = ({ item }) => {

        const containerWidth = SIZES.width * 0.475
        const radius = 20

        return (
            <View style={{
                flex: 1,
                backgroundColor: COLORS.bgColor
            }}>

                <TouchableOpacity activeOpacity={.5} style={{
                    margin: 5
                }}>

                    <View style={{
                        width: containerWidth,
                        backgroundColor: COLORS.purple,
                        borderRadius: radius,
                        alignItems: 'center',
                    }}>

                        <Image style={{
                            height: 150,
                            width: containerWidth,
                            borderTopLeftRadius: radius,
                            borderTopRightRadius: radius
                        }}
                            source={{ uri: item.thumbnailUrl }}
                        />

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

    const handleLoadMore = () => {
        pageCurrent < 10 ? setpageCurrent(pageCurrent + 1) : 0
        setisLoading(true)
    }

    return (
        <SafeAreaView>

            <StatusBar
                backgroundColor={COLORS.bgColor}
                barStyle={'dark-content'}
            />

            <Header title="Fotoğraflar" />

            <FlatList  contentContainerStyle={{
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

        </SafeAreaView>
    );

}

export default PhotosScreen;