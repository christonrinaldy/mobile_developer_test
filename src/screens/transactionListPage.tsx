import React, { FC, useState, useEffect } from "react";

import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

import SafeAreaView from 'react-native-safe-area-view';
import { View, StyleSheet, ScrollView, Modal, TouchableOpacity } from 'react-native'
import TransactionList from "../components/TransactionList";
import { RootStackParamList } from "../navigations/appstack";
import SortList from "../components/SortList";
import SearchBar from "../components/SearchBar";

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
type TransactionListPageNavigationProp = StackNavigationProp<
  RootStackParamList,
  'TransactionListPage'
>
type TransactionListPageRouteProp = RouteProp<
  RootStackParamList,
  'TransactionListPage'
>
type Props = {
  navigation: TransactionListPageNavigationProp,
  route: TransactionListPageRouteProp
}

const transactionListPage: FC<Props> = ({ navigation }) => {
  const [data, setData] = useState(Array<objData> || null);
  const [filteredData, setFilteredData] = useState(Array<objData> || null);
  const [modalVisible, setModalVisible] = useState(false);
  const [sort, setSort] = useState("URUTKAN");
  const url: string = "https://recruitment-test.flip.id/frontend-test";

  const searchHandler = (text: string) => {
    let temp = data.filter((val: objData) => {
      return val.beneficiary_name.toLowerCase().includes(text.toLowerCase()) || val.sender_bank.toLowerCase().includes(text.toLowerCase()) || val.beneficiary_bank.toLowerCase().includes(text.toLowerCase()) || val.amount.toString() == text;
    })
    setFilteredData(temp)
  }
  const sortHandler = (title: string) => {
    setSort(title);
    switch (title) {
      case "URUTKAN": sortByDate(true); break;
      case "Nama A-Z": sortByName(true); break;
      case "Nama Z-A": sortByName(false); break;
      case "Tanggal Terbaru": sortByDate(true); break;
      case "Tanggal Terlama": sortByDate(false); break;
    }
  }
  const convertBulan = (m: number) => {
    let bulan: string = "";
    switch (m) {
      case 0: bulan = "Januari"; break;
      case 1: bulan = "Februari"; break;
      case 2: bulan = "Maret"; break;
      case 3: bulan = "April"; break;
      case 4: bulan = "Mei"; break;
      case 5: bulan = "Juni"; break;
      case 6: bulan = "Juli"; break;
      case 7: bulan = "Agustus"; break;
      case 8: bulan = "September"; break;
      case 9: bulan = "Oktober"; break;
      case 10: bulan = "November"; break;
      case 11: bulan = "Desember"; break;
    }
    return bulan;
  }
  const getWaktu = (dateRaw: string) => {
    const date = new Date(dateRaw.split(" ")[0]);
    let result: string = "";
    result += date.getDate() > 9 ? date.getDate().toString() : "0" + date.getDate().toString();
    result += " " + convertBulan(date.getMonth());
    result += " " + date.getFullYear().toString()
    return result;
  }
  const getSeconds = (date: string) => {
    return new Date(date.split(" ")[0] + 'T' + date.split(" ")[1] + 'Z').getTime() / 1000;
  }
  const sortByDate = (descending: boolean) => {
    setFilteredData(filteredData.sort((a, b) => {
      if (getSeconds(a.created_at) > getSeconds(b.created_at)) {
        return descending ? -1 : 1
      }
      if (getSeconds(a.created_at) < getSeconds(b.created_at)) {
        return descending ? 1 : -1
      }
      return 0;

    }))

    setData(data.sort((a, b) => {
      if (getSeconds(a.created_at) > getSeconds(b.created_at)) {
        return descending ? -1 : 1
      }
      if (getSeconds(a.created_at) < getSeconds(b.created_at)) {
        return descending ? 1 : -1
      }
      return 0;

    }))
  }
  const sortByName = (descending: boolean) => {
    setFilteredData(filteredData.sort((a, b) => {
      if ((a.beneficiary_name) > (b.beneficiary_name)) {
        return descending ? 1 : -1
      }
      if ((a.beneficiary_name) < (b.beneficiary_name)) {
        return descending ? -1 : 1
      }
      return 0;

    }))

    setData(data.sort((a, b) => {
      if ((a.beneficiary_name) > (b.beneficiary_name)) {
        return descending ? 1 : -1
      }
      if ((a.beneficiary_name) < (b.beneficiary_name)) {
        return descending ? -1 : 1
      }
      return 0;

    }))
  }
  const convertToRupiah = (angka: number) => {
    var rupiah = '';
    var angkarev = angka.toString().split('').reverse().join('');
    for (var i = 0; i < angkarev.length; i++) if (i % 3 == 0) rupiah += angkarev.substr(i, 3) + '.';
    return 'Rp' + rupiah.split('', rupiah.length - 1).reverse().join('');
  }

  const onListPress = (val: objData) => {
    navigation.navigate("DetailPage", {
      data: val
    })
  }

  useEffect(() => {
    fetch(url)
      .then(async (res) => {
        var dataArr: Array<objData> = [];
        var dataRaw = await res.json();
        for (const key in dataRaw) {
          dataRaw[key]["key"] = key;
          dataArr.push(dataRaw[key])
        }
        setData(dataArr);
        setFilteredData(dataArr);
      })
  }, []);

  useEffect(() => {
    sortHandler(sort)
  }, [sort])


  return (
    <SafeAreaView>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        keyboardShouldPersistTaps="always"
      >
        <SearchBar
          sort={sort}
          setModalVisible={setModalVisible}
          searchHandler={searchHandler}
          modalVisible={modalVisible}
        />
        <View style={{ justifyContent: "center" }}>
          {
            filteredData.map((val: objData, index: React.Key | null | undefined) => {
              return (
                <TransactionList
                  val={val}
                  convertToRupiah={convertToRupiah}
                  getWaktu={getWaktu}
                  key={index}
                  onListPress={onListPress}
                />
              )

            })
          }
        </View>
        <Modal visible={modalVisible} transparent={true} animationType={"fade"}>
          <TouchableOpacity style={{ backgroundColor: 'rgba(0,0,0, 0.1)', flex: 1, justifyContent: "center" }} onPress={() => setModalVisible(false)}>
            <View style={[styles.sortModal]} >
              {
                ["URUTKAN", "Nama A-Z", "Nama Z-A", "Tanggal Terbaru", "Tanggal Terlama"].map((val, i) => {
                  return (
                    <SortList
                      title={val}
                      selected={sort == val ? true : false}
                      key={i}
                      onSelected={sortHandler}

                    />
                  )
                })
              }
            </View>
          </TouchableOpacity>
        </Modal>
      </ScrollView>

    </SafeAreaView >
  )
}
const styles = StyleSheet.create({
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
  sortDropDownTxt: {
    fontWeight: "bold",
    color: "#CC5500"
  },
  icon: {
    width: 30,
    height: 30
  },
  sortModal: {
    backgroundColor: 'white',
    width: "90%",
    alignSelf: 'center',
    zIndex: 1,
    elevation: 40,
    borderRadius: 5,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2
  }
});
export default transactionListPage