import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, SafeAreaView, StatusBar, FlatList, TouchableOpacity, ActivityIndicator, RefreshControl } from 'react-native';
import { IconLogOut } from '../../../assets/svg';
import { Header } from '../../../components';
import { COLORS, FONTS, SIZES } from '../../../../constants/theme';
import { getPosts } from '../../../utils/requests/GetDataUtils';
import { wait } from '../../../utils/PromiseUtils';

const PostScreen = ({ navigation }) => {

    const [data, setData] = useState([]);
    const [isLoading, setisLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false)
    const [pageCurrent, setpageCurrent] = useState(1)

    useEffect(() => {

        setisLoading(true)
        getData()

    }, [pageCurrent])

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

    // Gönderileri getirir
    const getData = async () => {

        getPosts(pageCurrent).then(result => {
            if (result.isConnected) {
                setData(data.concat(result.post))
                setisLoading(false)
            }
            else {
                alert("İnternet Bağlantınızı Kontrol ediniz!")
            }
        });

    }

    // Render Item
    const renderItem = ({ item }) => {

        return (
            <View style={{
                marginHorizontal: 10,
                marginVertical: 5,
            }}>

                {/* Gönderinin sahibi */}
                <Text style={{
                    marginLeft: 3,
                    color: 'black',
                    fontSize: SIZES.headerTitle + 1,
                    fontFamily: 'Roboto-Bold'
                }}>{item.name}</Text>

                {/* Gönderi */}
                <TouchableOpacity style={{
                    borderRadius: 20,
                    borderWidth: 2,
                    borderColor: COLORS.purple
                }}
                    onPress={() => navigation.navigate("CommentScreen", {
                        // Yorumlar ekranına gönderilecek olan argümanlar
                        currentPost: item.id,
                        postTitle: item.title,
                        postBody: item.body,
                        postBy: item.name
                    })}
                >

                    <View style={{
                        padding: 10
                    }}>

                        {/* Gönderi başlığı */}
                        <Text style={{
                            ...FONTS.headerTitle,
                            color: COLORS.purple
                        }}>{item.title}</Text>

                        {/* Gönderi açıklaması */}
                        <Text style={{
                            ...FONTS.body,
                            color: COLORS.gray
                        }}>{item.body}</Text>

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

    // Fonksiyon çalıştırıldığında veriler 10. sayfaya kadar yüklenir
    const handleLoadMore = () => {
        console.log(pageCurrent)
        pageCurrent < 10 ? setpageCurrent(pageCurrent + 1) : 0
        setisLoading(true)
    }

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: COLORS.bgColor
        }}>

            <StatusBar
                backgroundColor={COLORS.bgColor}
                barStyle={'dark-content'}
                translucent={false}
            />

            <Header
                title="Gönderiler"
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
                onEndReached={pageCurrent != 10 ? handleLoadMore : null}
                onEndReachedThreshold={0.001}
            />

        </SafeAreaView>
    );

}

export default PostScreen;