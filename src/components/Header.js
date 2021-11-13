import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { FONTS, COLORS } from '../../constants/theme';

const Header = ({ leftIcon, rightIcon, onPressLeftIcon, onPressRightIcon, title, titleStyle }) => {

    return (
        <View style={{
            width: '100%',
            flexDirection: 'row',
            borderBottomColor: '#F7F7F7',
            borderBottomWidth: 2,
            backgroundColor: COLORS.bgColor
        }}>

            {/* Header sol buton flexi */}
            <View style={{ flex: 1 }}>

                <TouchableOpacity style={{
                    flex: 1,
                    width: 64,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                    onPress={onPressLeftIcon}
                >
                    {leftIcon}
                </TouchableOpacity>

            </View>

            {/* Header Başlığı */}
            <Text style={[{
                paddingVertical: 16,
                ...FONTS.headerTitle,
                color: COLORS.purple
            }, titleStyle]}>
                {title}
            </Text>

            {/* Header sağ buton flexi */}
            <View style={{
                flex: 1,
                alignItems: 'flex-end'
            }}>

                <TouchableOpacity style={{
                    flex: 1,
                    width: 64,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                    onPress={onPressRightIcon}
                >
                    {rightIcon}
                </TouchableOpacity>

            </View>

        </View>
    );

}

export default Header;