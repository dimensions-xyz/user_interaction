import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, StatusBar, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { IconLogOut } from '../../assets/svg';
import { Header } from '../../components';
import { COLORS, FONTS, SIZES } from '../../../constants/theme';
import { getPosts } from '../../utils/requests/GetDataUtils';

const PostScreen = ({ navigation }) => {

    const logOut = () => {
        navigation.navigate("LoginScreen")
    }

    const [data, setData] = useState([]);
    const [isLoading, setisLoading] = useState(false);
    const [pageCurrent, setpageCurrent] = useState(1)

    useEffect(() => {
        console.log('useeffect');
        setisLoading(true);
        getData()

        return () => {

        }

    }, [pageCurrent])

    const getData = async () => {
        getPosts(pageCurrent).then(result => {
            console.log('getPost');
            if (result.isConnected) {
                setData(data.concat(result.post))
                setisLoading(false)
            }
            else{
                alert("İnternet Bağlantınızı Kontrol ediniz!")
            }
        });
    }

    const renderItem = ({ item }) => {

        return (
            <View style={{
                marginHorizontal: 10,
                marginVertical: 5,
            }}>

                <Text style={{
                    marginLeft: 3,
                    color: 'black',
                    fontSize: SIZES.headerTitle + 1,
                    fontFamily: 'Roboto-Bold'
                }}>{item.name}</Text>

                <TouchableOpacity style={{
                    borderRadius: 20,
                    borderWidth: 2,
                    borderColor: COLORS.purple
                }}>

                    <View style={{
                        padding: 8
                    }}>

                        <Text style={{
                            ...FONTS.headerTitle,
                            color: COLORS.purple
                        }}>{item.title}</Text>

                        <Text style={{
                            ...FONTS.body,
                            color: COLORS.gray
                        }}>{item.body}</Text>

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
            />

            <Header
                title="Gönderiler"
                rightIcon={(<IconLogOut color={COLORS.purple} />)}
                onPressRightIcon={() => logOut()}
            />

            <FlatList style={{
                flex: 1,
            }}
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