import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, SafeAreaView, StatusBar, FlatList, RefreshControl } from 'react-native';
import { IconLogOut } from '../../assets/svg';
import { Header } from '../../components';
import { COLORS, FONTS, SIZES } from '../../../constants/theme'
import { getTodos } from '../../utils/requests/GetDataUtils';
import { wait } from '../../utils/PromiseUtils';
import CheckBox from '@react-native-community/checkbox';

const TodosScreen = ({ navigation }) => {

    const [data, setData] = useState([]);
    const [refreshing, setRefreshing] = useState(false)

    useEffect(() => {
        getData()
    }, [])

    const logOut = () => {
        navigation.navigate("LoginScreen")
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
                    }}>{item.id + " - " +
                        item.title}</Text>

                    <CheckBox
                        disabled={false}
                        value={item.completed}
                    />

                </View>

            </View>
        );

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
            />

        </SafeAreaView>
    );

}

export default TodosScreen;