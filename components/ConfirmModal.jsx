import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, View, Pressable } from "react-native";

const ConfirmModal = ({
  confirmModal,
  modalVisible,
  setModalVisible,
  formRef,
}) => {
  const {
    propertyType,
    bedRoom,
    dateTime,
    address,
    monthyRentPrice,
    furnitureType,
    note,
    reporterName,
  } = confirmModal;
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.textView}>
            <Text style={styles.textStyle}>Property type: {propertyType}</Text>
            <Text style={styles.textStyle}>Bed room: {bedRoom}</Text>
            <Text style={styles.textStyle}>Date and Time: {dateTime}</Text>
            <Text style={styles.textStyle}>Address: {address}</Text>
            <Text style={styles.textStyle}>
              Monthly rent price: {monthyRentPrice}
            </Text>
            <Text style={styles.textStyle}>
              Furniture type: {furnitureType}
            </Text>
            <Text style={styles.textStyle}>Note: {note}</Text>
            <Text style={styles.textStyle}>Reporter Name: {reporterName}</Text>
          </View>
          <View style={styles.btnGroup}>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={[styles.textStyle, styles.buttonText]}>Cancle</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonOpen]}
              onPress={() => formRef.current.submitForm()}
            >
              <Text style={[styles.textStyle, styles.buttonText]}>Confirm</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ConfirmModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    flex: 1,
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    paddingHorizontal: 5,
    paddingVertical: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "95%",
  },
  btnGroup: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    width: 310,
  },
  textView: {
    flex: 1,
    justifyContent: "space-evenly",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width: 120,
  },
  buttonOpen: {
    backgroundColor: "coral",
  },
  buttonClose: {
    backgroundColor: "gray",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  textStyle: {
    color: "black",
    fontSize: 25,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
