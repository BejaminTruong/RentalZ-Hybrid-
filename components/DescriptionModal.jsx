import React, { useState } from "react";
import {
  Alert,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
} from "react-native";
import { db } from "../firebase";

const DescriptionModal = ({
  modalDescription,
  setModalDescription,
  setDescription,
  item,
}) => {
  const [info, setInfo] = useState(null);
  const handleDescription = () => {
    db.collection("rentals").doc(item.key).update({ description: info });
    setDescription(info);
    setInfo(null);
    setModalDescription(!modalDescription);
    Alert.alert(null, "Update successfully!", [], {
      cancelable: true,
    });
  };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalDescription}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        setModalDescription(!modalDescription);
      }}
    >
      <View style={styles.modalView}>
        <ScrollView>
          <View style={styles.viewInput}>
            <TextInput
              textAlignVertical="top"
              style={styles.input1}
              multiline
              numberOfLines={10}
              placeholder="Description"
              onChangeText={(value) => setInfo(value)}
            />
          </View>
          <View style={styles.btnGroup}>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalDescription(!modalDescription)}
            >
              <Text style={[styles.textStyle, styles.buttonText]}>Cancle</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonOpen]}
              disabled={!info ? true : false}
              onPress={handleDescription}
            >
              <Text style={[styles.textStyle, styles.buttonText]}>Confirm</Text>
            </Pressable>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

export default DescriptionModal;

const styles = StyleSheet.create({
  modalView: {
    marginTop: "15%",
    marginHorizontal: "5%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  btnGroup: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    width: 310,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width: 120,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 25,
  },
  buttonOpen: {
    backgroundColor: "coral",
  },
  buttonClose: {
    backgroundColor: "gray",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  viewInput: {
    width: "100%",
  },
  input1: {
    borderWidth: 1,
    padding: 10,
    fontSize: 18,
  },
});
