import React, { FC } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'

export type Props = {
    selected: boolean,
    title: string,
    onSelected: any,
}
const SortList: FC<Props> = ({
    selected,
    title,
    onSelected,
}) => {
    return (
        <TouchableOpacity style={[styles.sortContainer]} onPress={() => onSelected(title)}>
            <View style={[styles.outerCircle]}>
                <View style={[styles.innerCircle, { display: selected ? 'flex' : 'none' }]} />
            </View>
            <Text style={[styles.sortTitle]}>{title}</Text>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    outerCircle: {
        width: 20, height: 20, borderRadius: 20 / 2, borderWidth: 3, borderColor: "#ff6d00", justifyContent: 'center', alignItems: 'center'
    },
    innerCircle: { width: 10, height: 10, borderRadius: 10 / 2, backgroundColor: '#ff6d00' },
    sortTitle: { fontSize: 20, color: 'black', fontWeight: '500', marginHorizontal: 5 },
    sortContainer: {
        height: 80, width: "100%", flexDirection: 'row', alignItems: 'center'
    }
})
export default SortList 