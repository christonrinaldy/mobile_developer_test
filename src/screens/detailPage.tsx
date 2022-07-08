import React, { FC, useState } from "react";
import { View, Text, SafeAreaView, StyleSheet, Image } from 'react-native'

import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

import { RootStackParamList } from "../navigations/appstack";
import { convertToRupiah, getWaktu } from '../functions/index'
import { TouchableOpacity } from "react-native-gesture-handler";

type DetailPageNavigationProp = StackNavigationProp<
    RootStackParamList,
    'DetailPage'
>
type DetailPageRouteProp = RouteProp<
    RootStackParamList,
    'DetailPage'
>
type Props = {
    navigation: DetailPageNavigationProp,
    route: DetailPageRouteProp
}

export type objData = {
    "account_number": string,
    "amount": number,
    "beneficiary_bank": string,
    "beneficiary_name": string,
    "completed_at": string,
    "created_at": string,
    "fee": number,
    "id": string,
    "key": string,
    "remark": string,
    "sender_bank": string,
    "status": string,
    "unique_code": number
}
const detailPage: FC<Props> = ({
    navigation,
    route
}) => {
    const [data, setData] = useState(route.params.data);
    return (
        <SafeAreaView style={{ paddingTop: 20 }}>
            <View style={{ justifyContent: 'flex-start' }}>
                <View style={[styles.boxHeadline, { justifyContent: 'flex-start' }]}>
                    <Text style={styles.textHeadline}>ID TRANSAKSI: #{data.key}</Text>
                    <Image source={require("../assets/clipboard1.png")} style={[styles.icon]} />
                </View>
                <View style={[styles.boxHeadline]}>
                    <Text style={styles.textHeadline}>DETAIL TRANSAKSI</Text>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Text style={[styles.textHeadline, { color: '#ff6d00' }]}>Tutup</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ height: 350, flexDirection: "row", backgroundColor: 'white' }}>
                <View style={[styles.contentContainer, { paddingLeft: 20 }]}>
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <Text style={[styles.textTitle]}>{data.beneficiary_bank.toUpperCase()} → {data.sender_bank.toUpperCase()}</Text>
                    </View>
                    <View style={[styles.boxContent]}>
                        <Text style={[styles.textHeadline]}>{data.beneficiary_name}</Text>
                        <Text style={[styles.textContent]}>{data.account_number}</Text>
                    </View>
                    <View style={[styles.boxContent]}>
                        <Text style={[styles.textHeadline]}>BERITA TRANSFER</Text>
                        <Text style={[styles.textContent]}>{data.remark}</Text>
                    </View>
                    <View style={[styles.boxContent]}>
                        <Text style={[styles.textHeadline]}>WAKTU DIBUAT</Text>
                        <Text style={[styles.textContent]}>{getWaktu(data.created_at)}</Text>
                    </View>
                </View>
                <View style={[styles.contentContainer, { paddingLeft: 20, alignSelf: 'center', height: "50%" }]}>
                    <View style={[styles.boxContent]}>
                        <Text style={[styles.textHeadline]}>NOMINAL</Text>
                        <Text style={[styles.textContent]}>{convertToRupiah(data.amount)}</Text>
                    </View>
                    <View style={[styles.boxContent]}>
                        <Text style={[styles.textHeadline]}>KODE UNIK</Text>
                        <Text style={[styles.textContent]}>{data.unique_code}</Text>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    textHeadline: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 18
    },
    textContent: {
        color: 'black',
        fontSize: 16
    },
    textTitle: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 20
    },
    icon: {
        width: 12,
        height: 16,
        marginLeft: 5
    },
    contentContainer: {
        flex: 1, flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'flex-start'
    },
    boxContent: {
        flex: 1, flexDirection: 'column'
    },
    boxHeadline: {
        height: 60, marginVertical: 1, backgroundColor: 'white', paddingHorizontal: 20, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center'
    }

})
export default detailPage