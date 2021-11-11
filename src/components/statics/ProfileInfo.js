import React from 'react';
import { View, Text, SafeAreaView, StatusBar } from 'react-native';
import { COLORS, FONTS } from '../../../constants/theme';

const ProfileInfo = () => {

    return (
        <View style={{ height: '90%', justifyContent: 'space-between' }}>

            <View>
                <Text style={{ ...FONTS.bigTitle, color: COLORS.purple }}>
                    Name:
                </Text>
                <Text style={{
                    ...FONTS.desc
                }}>Leanne Graham</Text>
            </View>

            <View>
                <Text style={{ ...FONTS.bigTitle, color: COLORS.purple }}>
                    E-mail:
                </Text>
                <Text style={{
                    ...FONTS.desc
                }}>Leanne Graham</Text>
            </View>

            <View>
                <Text style={{ ...FONTS.bigTitle, color: COLORS.purple }}>
                    Adrress:
                </Text>
                <Text style={{
                    ...FONTS.desc
                }}>Leanne Graham</Text>
            </View>

            <View>
                <Text style={{ ...FONTS.bigTitle, color: COLORS.purple }}>
                    Phone:
                </Text>
                <Text style={{
                    ...FONTS.desc
                }}>Leanne Graham</Text>
            </View>

            <View>
                <Text style={{ ...FONTS.bigTitle, color: COLORS.purple }}>
                    Website:
                </Text>
                <Text style={{
                    ...FONTS.desc
                }}>Leanne Graham</Text>
            </View>

            <View>
                <Text style={{ ...FONTS.bigTitle, color: COLORS.purple }}>
                    Company:
                </Text>
                <Text style={{
                    ...FONTS.desc
                }}>Leanne Graham</Text>
            </View>

        </View>
    );

}

export default ProfileInfo;