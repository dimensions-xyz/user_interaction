import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, SafeAreaView, StatusBar, FlatList, RefreshControl, ActivityIndicator } from 'react-native';
import { IconLogOut } from '../../../assets/svg';
import { Header } from '../../../components';
import { COLORS, FONTS, SIZES } from '../../../../constants/theme'
import { getTodos } from '../../../utils/requests/GetDataUtils';
import { wait } from '../../../utils/PromiseUtils';
import CheckBox from '@react-native-community/checkbox';

const TodosScreen = ({ navigation }) => {

    const [data, setData] = useState([]);
    const [isLoading, setisLoading] = useState(false)
    const [refreshing, setRefreshing] = useState(false)

    useEffect(() => {

        setisLoading(true)
        getData()

    }, [])

    const logOut = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'LoginScreen' }],
        });
    }

    const onRefresh = useCallback(() => {

        setRefreshing(true)

        wait(2000).then(() => {
            setRefreshing(false)
            getData()
        }, [refreshing]);

    })

    const getData = async () => {
        getTodos().then((result) => {
            if (result.isConnected) {
                setData(result.todos)
                setisLoading(false)
            } else {
                alert("İnternet Bağlantınızı Kontrol ediniz!")
            }
        });
    }

    const renderItem = ({ item }) => {

        return (
            <View style={{
                marginHorizontal: 5,
                marginVertical: 5,
            }}>

                <View style={{
                    borderRadius: 8,
                    backgroundColor: COLORS.purple,
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>

                    <Text style={{
                        width: '88%',
                        padding: 15,
                        color: COLORS.bgColor,
                        ...FONTS.title
                    }}>{item.queue + " - " +
                        item.title}</Text>

                    <CheckBox
                        disabled={false}
                        value={item.completed}
                    />

                </View>

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

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: COLORS.bgColor
        }}>

            <Header
                title="Yapılacaklar Listesi"
                rightIcon={(<IconLogOut color={COLORS.purple} />)}
                onPressRightIcon={() => logOut()}
            />

            <FlatList style={{
                flex: 1,
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
            />

        </SafeAreaView>
    );

}

export default TodosScreen;