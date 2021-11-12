import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, StatusBar } from 'react-native';
import { COLORS, FONTS } from '../../../constants/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUser } from '../../utils/requests/GetDataUtils';

const ProfileInfo = () => {

    // verilerdeki adres ve şirketin ayrı payloadları olduğu için aynı datasette iken hata veriyor
    // geçici olacağı için database yerine hook kullandım
    const [data, setData] = useState([]);
    const [address, setAddress] = useState([]);
    const [company, setCompany] = useState([]);

    useEffect(() => {

        getData()

        setData({})
        setAddress({})
        setCompany({})

    }, []);

    const getData = async () => {
        AsyncStorage.getItem("userid").then(value => {
            getUser(value).then((result) => {
                setData(result.user[0])
                setAddress(result.user[0].address)
                setCompany(result.user[0].company)
            })
        });
    }


    return (
        <View style={{ height: '90%', justifyContent: 'space-between' }}>

            <View>
                <Text style={{ ...FONTS.bigTitle, color: COLORS.purple }}>
                    Name:
                </Text>
                <Text style={{
                    ...FONTS.desc
                }}>{data.name}</Text>
            </View>

            <View>
                <Text style={{ ...FONTS.bigTitle, color: COLORS.purple }}>
                    E-mail:
                </Text>
                <Text style={{
                    ...FONTS.desc
                }}>{data.email}</Text>
            </View>

            <View>
                <Text style={{ ...FONTS.bigTitle, color: COLORS.purple }}>
                    Address:
                </Text>
                <Text style={{
                    ...FONTS.desc
                }}>{address.street + "\n" +
                    address.suite + "\n" +
                    address.city + "\n" +
                    address.zipcode
                    }</Text>
            </View>

            <View>
                <Text style={{ ...FONTS.bigTitle, color: COLORS.purple }}>
                    Phone:
                </Text>
                <Text style={{
                    ...FONTS.desc
                }}>{data.phone}</Text>
            </View>

            <View>
                <Text style={{ ...FONTS.bigTitle, color: COLORS.purple }}>
                    Website:
                </Text>
                <Text style={{
                    ...FONTS.desc
                }}>{data.website}</Text>
            </View>

            <View>
                <Text style={{ ...FONTS.bigTitle, color: COLORS.purple }}>
                    Company:
                </Text>
                <Text style={{
                    ...FONTS.desc
                }}>{company.name + "\n" +
                    company.catchPhrase + "\n" +
                    company.bs
                    }</Text>
            </View>

        </View>
    );

}

export default ProfileInfo;