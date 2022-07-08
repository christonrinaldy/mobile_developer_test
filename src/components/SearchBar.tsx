import React, { FC } from "react";
import { View, StyleSheet, StatusBar, ScrollView, Image, Text, TextInput, Modal, TouchableOpacity } from 'react-native'

type Props = {
    searchHandler: Function,
    modalVisible: boolean,
    sort: string,
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>
}
const SearchBar: FC<Props> = ({
    searchHandler,
    modalVisible,
    sort,
    setModalVisible
}) => {
    return (
        <View style={{ flex: 1, alignItems: 'center', paddingVertical: 5 }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", backgroundColor: 'white', width: '95%', borderRadius: 5 }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <Image source={require("../assets/search.png")} style={[styles.icon]} />
                    <TextInput
                        onChangeText={(input) => searchHandler(input)}
                        placeholder="Cari nama, bank, atau nominal"
                    />
                </View>
                <View style={{ justifyContent: "center", paddingHorizontal: 10 }}>
                    <TouchableOpacity onPress={() => setModalVisible(true)} style={{ flexDirection: "row" }}>
                        <Text style={styles.sortDropDownTxt}>{sort} </Text>
                        <Text style={[styles.sortDropDownTxt, { marginTop: modalVisible ? 0 : -3, fontSize: 16, transform: modalVisible ? [{ rotate: "180deg" }] : [{ rotate: "0deg" }] }]}>⌵</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    sortDropDownTxt: {
        fontWeight: "bold",
        color: "#CC5500"
    },
    icon: {
        width: 30,
        height: 30
    }
});
export default SearchBar