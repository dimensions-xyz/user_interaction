import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, SafeAreaView, StatusBar, FlatList, ActivityIndicator } from 'react-native';
import { Header } from '../../../components';
import { COLORS, FONTS } from '../../../../constants/theme';
import { useRoute } from '@react-navigation/core';
import { getComments } from '../../../utils/requests/GetDataUtils';
import { wait } from '../../../utils/PromiseUtils';

const CommentScreen = () => {

    const [data, setData] = useState([]);
    const [isLoading, setisLoading] = useState(false)

    const route = useRoute()
    const { currentPost, postTitle, postBody, postBy } = route.params

    useEffect(() => {

        setisLoading(true)
        getData()

    }, [])

    const getData = async () => {
        getComments(currentPost).then((result) => {
            if (result.isConnected) {
                setData(result.comments)
                setisLoading(false)
            } else {
                alert("İnternet Bağlantınızı Kontrol ediniz!")
            }
        });
    }

    const renderItem = ({ item }) => {

        return (
            <View style={{
                margin: 5
            }}>

                <View style={{
                    borderRadius: 10,
                    borderTopLeftRadius: 0,
                    padding: 10,
                    backgroundColor: COLORS.purple,
                }}>

                    <Text style={{
                        color: COLORS.bgColor,
                        ...FONTS.title
                    }}>{item.email}</Text>

                    <Text style={{
                        paddingVertical: 10,
                        color: COLORS.bgColor,
                        ...FONTS.desc
                    }}>{item.name}</Text>

                    <Text style={{
                        color: COLORS.bgColor,
                        ...FONTS.regular
                    }}>{item.body}</Text>

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
            backgroundColor: COLORS.bgColor
        }}>

            <StatusBar
                backgroundColor={COLORS.bgColor}
                barStyle={'dark-content'}
            />

            <Header title="Yorumlar" />

            <View style={{
                margin: 5,
                borderRadius: 20,
                backgroundColor: '#faa',
            }}>

                <View style={{
                    margin: 6,
                }}>

                    <Text style={{
                        ...FONTS.bigTitle,
                        color: COLORS.purple
                    }}>
                        {postBy}
                    </Text>

                    <Text style={{
                        ...FONTS.title,
                        color: COLORS.purple
                    }}>
                        {postTitle}
                    </Text>

                    <Text style={{
                        ...FONTS.body,
                        color: COLORS.purple
                    }}>
                        {postBody}
                    </Text>

                </View>

            </View>

            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item, index) => index}
                ListFooterComponent={renderFooter}
            />

        </SafeAreaView>
    );

}

export default CommentScreen;