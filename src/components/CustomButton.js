import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { COLORS } from '../../constants/theme';

const CustomButton = ({ style, onPress, text }) => {

    return (
        <TouchableOpacity style={[{
            width: '100%',
            paddingVertical: 20,
            borderRadius: 100,
            backgroundColor: COLORS.purple,
            alignItems: 'center',
        }, style]}
            onPress={onPress}
            activeOpacity={.80}
        >

            <Text style={{
                fontSize: 21,
                textAlign: 'center',
                fontFamily: 'Roboto-Bold',
                color: '#fff',
            }}>{text}</Text>

        </TouchableOpacity>
    );

}

export default CustomButton;