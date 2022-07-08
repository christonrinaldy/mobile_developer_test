import React, { FC } from "react";
import { View, StyleSheet, TouchableOpacity, Modal } from 'react-native'
import SortList from "./SortList";

type Props = {
  modalVisible: boolean,
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>,
  sort: string,
  sortHandler: Function
}
const SortModal: FC<Props> = ({
  modalVisible,
  setModalVisible,
  sort,
  sortHandler
}) => {
  return (
    <Modal visible={modalVisible} transparent={true} animationType={"none"}>
      <TouchableOpacity style={[styles.modalBg]} onPress={() => setModalVisible(false)}>
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
  )
}
const styles = StyleSheet.create({
  outerCircle: {
    width: 20, height: 20, borderRadius: 20 / 2, borderWidth: 3, borderColor: "#FD7702", justifyContent: 'center', alignItems: 'center'
  },
  innerCircle: { width: 10, height: 10, borderRadius: 10 / 2, backgroundColor: '#FD7702' },
  sortTitle: { fontSize: 20, color: 'black', fontWeight: '500', marginHorizontal: 5 },
  sortContainer: {
    height: 80, width: "100%", flexDirection: 'row', alignItems: 'center'
  },
  modalBg: { 
    backgroundColor: 'rgba(0,0,0, 0.1)', 
    flex: 1, 
    justifyContent: "center" 
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
})
export default SortModal 