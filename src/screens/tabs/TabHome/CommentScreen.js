import React, { Component } from 'react';
import { View, Text, SafeAreaView, StatusBar } from 'react-native';
import { Header } from '../../../components';
import { COLORS } from '../../../../constants/theme';

const CommentScreen = ({ route }) => {

    return (
        <SafeAreaView>

            <StatusBar
                backgroundColor={COLORS.bgColor}
                barStyle={'dark-content'}
            />

            <Header title="Yorumlar" />

            <View>

                <Text>Stack - Yorumlar</Text>

            </View>

        </SafeAreaView>
    );

}

export default CommentScreen;