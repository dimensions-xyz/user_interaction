import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { COLORS } from '../../constants/theme';

const CustomTextInput = ({ style, icon, maxLength, placeholder, secureTextEntry, onChange, onChangeText, keyboardType, text }) => {

    return (
        <View style={[{
            width: '100%',
            borderBottomWidth: 1,
            flexDirection: 'row',
            alignItems: 'center',
            borderBottomColor: '#F7F7F7'
        }, style]}>

            {icon}

            <TextInput style={{
                width: '100%',
                fontSize: 16,
                marginStart: 15,
                color: COLORS.purple,
                fontFamily: 'Roboto-Regular'
            }}
                maxLength={maxLength}
                placeholder={placeholder}
                placeholderTextColor={COLORS.purple}
                secureTextEntry={secureTextEntry}
                onChange={onChange}
                onChangeText={onChangeText}
                keyboardType={keyboardType}
                value={text}
            />

        </View>
    );

}

export default CustomTextInput;