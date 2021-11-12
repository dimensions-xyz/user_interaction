import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, StatusBar } from 'react-native';
import { COLORS, FONTS } from '../../../constants/theme';
import { getUser } from '../../utils/requests/GetDataUtils';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileInfo = () => {

    // verilerdeki adres ve şirketin ayrı payloadları olduğu için aynı datasette iken hata veriyor
    // büyük bir proje olmadığı için database yerine hook kullandım. Umarım iyi yapmışımdır :)
    const [data, setData] = useState([]);
    const [address, setAddress] = useState([]);
    const [company, setCompany] = useState([]);

    useEffect(() => {

        getData()

    }, []);

    const getData = async () => {
        AsyncStorage.getItem("userid").then(value => {

            getUser(value).then((result) => {
                if (result.isConnected) {
                    setData(result.user[0])
                    setAddress(result.user[0].address)
                    setCompany(result.user[0].company)
                } else {
                    alert("İnternet Bağlantınızı Kontrol ediniz!")
                }
            });

        });
    }

    return (
        <View style={{
            height: '90%',
            justifyContent: 'space-between',
        }}>

            <View>
                <Text style={{ ...FONTS.bigTitle, color: COLORS.purple }}>
                    Name:
                </Text>
                <Text style={{
                    color: COLORS.gray,
                    ...FONTS.desc,
                }}>{data.name}</Text>
            </View>

            <View>
                <Text style={{ ...FONTS.bigTitle, color: COLORS.purple }}>
                    E-mail:
                </Text>
                <Text style={{
                    color: COLORS.gray,
                    ...FONTS.desc
                }}>{data.email}</Text>
            </View>

            <View>
                <Text style={{ ...FONTS.bigTitle, color: COLORS.purple }}>
                    Address:
                </Text>
                <Text style={{
                    color: COLORS.gray,
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
                    color: COLORS.gray,
                    ...FONTS.desc
                }}>{data.phone}</Text>
            </View>

            <View>
                <Text style={{ ...FONTS.bigTitle, color: COLORS.purple }}>
                    Website:
                </Text>
                <Text style={{
                    color: COLORS.gray,
                    ...FONTS.desc
                }}>{data.website}</Text>
            </View>

            <View>
                <Text style={{ ...FONTS.bigTitle, color: COLORS.purple }}>
                    Company:
                </Text>
                <Text style={{
                    color: COLORS.gray,
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