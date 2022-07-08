import React, { FC } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import objData from "./Types";

export type Props = {
  val: objData;
  convertToRupiah: Function;
  getWaktu: Function,
  onListPress: Function
};

const TransactionList: FC<Props> = ({
  val,
  convertToRupiah,
  getWaktu,
  onListPress
}) => {
  return (
    <TouchableOpacity style={styles.list} onPress={() => onListPress(val)}>
      <View style={{ width: "2%", backgroundColor: val['status'] == "SUCCESS" ? '#50C878' : '#ff6d00' }} />
      <View style={[styles.listContent]}>
        <View style={{ flex: 1, flexDirection: 'column' }}>
          <View>
            <Text style={[styles.text2]}>{val['beneficiary_bank'].toUpperCase()} → {val['sender_bank'].toUpperCase()}</Text>
          </View>
          <View>
            <Text style={[styles.text1]}>{val['beneficiary_name'].toUpperCase()}</Text>
          </View>
          <View>
            <Text style={[styles.text1]}>{convertToRupiah(val['amount'])}●{getWaktu(val['created_at'])}</Text>
          </View>
        </View>
        <View style={[styles.statusContainer]}>
          <View style={[styles.statusButton, { borderWidth: val['status'] == "SUCCESS" ? 0 : 2, borderColor: val['status'] == "SUCCESS" ? undefined : '#ff6d00', backgroundColor: val['status'] == "SUCCESS" ? '#50C878' : 'white' }]}>
            <Text style={[styles.text2, { color: val['status'] == "SUCCESS" ? 'white' : 'black' }]}>{val['status'] == "SUCCESS" ? "Berhasil" : "Pengecekan"}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  list: {
    height: 80,
    backgroundColor: 'white',
    width: "95%",
    alignSelf: "center",
    marginVertical: 5,
    borderRadius: 5,
    flexDirection: 'row',
    overflow: 'hidden'
  },
  listContent: { 
    flex: 1, 
    flexDirection: "row", 
    paddingHorizontal: 20, 
    alignItems: "center" 
  },
  text1: {
    color: 'black'
  },
  text2: { fontWeight: "bold", color: 'black' },
  statusContainer: { 
    width: "32%", 
    justifyContent: 'flex-end', 
    alignItems: 'flex-end' 
  },
  statusButton: {
    borderRadius: 5,
    flex: 0,
    paddingHorizontal: 7,
    paddingVertical: 2,
  }
});
export default TransactionList