import React, { Component } from 'react';
import { View, Text, SafeAreaView, StatusBar } from 'react-native';
import { Header } from '../../../components';
import { COLORS } from '../../../../constants/theme';

const PhotosScreen = ({ route }) => {

    return (
        <SafeAreaView>

            <StatusBar
                backgroundColor={COLORS.bgColor}
                barStyle={'dark-content'}
            />

            <Header title="Fotoğraflar" />

            <View>

                <Text>Stack - Fotoğraflar</Text>

            </View>

        </SafeAreaView>
    );

}

export default PhotosScreen;