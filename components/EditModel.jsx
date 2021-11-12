import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { Formik } from "formik";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import * as Yup from "yup";
import { db } from "../firebase";
import DateTimePicker from "@react-native-community/datetimepicker";
import { FontAwesome } from "@expo/vector-icons";
const EditModel = ({ modalEdit, setModalEdit, item, setDetails }) => {
  const {
    key,
    propertyType,
    furnitureType,
    dateTime,
    bedRoom,
    createdAt,
    address,
    monthyRentPrice,
    note,
    reporterName,
  } = item;
  const [selectedProperty, setSelectedProperty] = useState(propertyType);
  const [selectedFurniture, setSelectedFurniture] = useState(furnitureType);
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [dateInput, setDateInput] = useState(null);
  const formYupSchema = Yup.object().shape({
    propertyType: Yup.string().required("Required"),
    furnitureType: Yup.string().required("Required"),
    dateTime: Yup.string().required("Required"),
    bedRoom: Yup.number()
      .positive("Number cannot be negative")
      .integer("Must be an Integer")
      .required("Required"),
    address: Yup.string().required("Required"),
    monthyRentPrice: Yup.string()
      .required("Required")
      .test("toNum", "Invalid Price", (val) => {
        if (!+val) return false;
        return true;
      }),
    note: Yup.string(),
    reporterName: Yup.string().required("Required"),
  });

  const handleFormSubmit = (values, actions) => {
    db.collection("rentals")
      .doc(key)
      .update({
        ...values,
        createdAt,
      });
    actions.resetForm();
    Alert.alert(null, "Update successfully!", [], {
      cancelable: true,
    });
    setModalEdit(false);
    setDetails({ ...values, createdAt });
  };
  const handleDateTime = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
    let tempDate = new Date(currentDate);
    let fDate =
      tempDate.getDate() +
      "/" +
      (tempDate.getMonth() + 1) +
      "/" +
      tempDate.getFullYear();
    let fTime = tempDate.getHours() + ":" + tempDate.getMinutes();
    return fDate + " " + fTime;
  };
  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };
  return (
    <Modal
      statusBarTranslucent={true}
      animationType="slide"
      transparent={true}
      visible={modalEdit}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        setModalEdit(!modalEdit);
      }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss()}>
        <KeyboardAvoidingView behavior="height" style={styles.modalView}>
          <Formik
            initialValues={{
              propertyType: selectedProperty,
              bedRoom,
              dateTime,
              address,
              monthyRentPrice,
              furnitureType: selectedFurniture,
              note,
              reporterName,
            }}
            validationSchema={formYupSchema}
            onSubmit={handleFormSubmit}
          >
            {({
              setFieldValue,
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
              <ScrollView style={{ flexDirection: "column" }}>
                <View style={styles.textGroup}>
                  <Text style={styles.textStyle}>Property Type:</Text>
                  <Picker
                    dropdownIconColor="coral"
                    style={styles.picker}
                    mode="dropdown"
                    selectedValue={selectedProperty}
                    onBlur={handleBlur("propertyType")}
                    onValueChange={(itemValue, itemIndex) => {
                      setSelectedProperty(itemValue);
                      setFieldValue("propertyType", itemValue);
                    }}
                  >
                    <Picker.Item
                      color="gray"
                      label="Property Type (required)"
                    />
                    <Picker.Item label="House" value="House" />
                    <Picker.Item label="Flat" value="Flat" />
                    <Picker.Item label="Resort" value="Resort" />
                  </Picker>
                </View>
                {errors.propertyType && touched.propertyType ? (
                  <Text style={styles.errorText}>{errors.propertyType}</Text>
                ) : null}
                <View style={styles.textGroup}>
                  <Text style={styles.textStyle}>Furniture Type:</Text>
                  <Picker
                    dropdownIconColor="coral"
                    style={styles.picker}
                    mode="dropdown"
                    selectedValue={selectedFurniture}
                    onBlur={handleBlur("furnitureType")}
                    onValueChange={(itemValue, itemIndex) => {
                      setSelectedFurniture(itemValue);
                      setFieldValue("furnitureType", itemValue);
                    }}
                  >
                    <Picker.Item
                      color="gray"
                      label="Furniture Type (optional)"
                    />
                    <Picker.Item label="Furnished" value="Furnished" />
                    <Picker.Item label="Unfurnished" value="Unfurnished" />
                    <Picker.Item
                      label="Part Furnished"
                      value="Part Furnished"
                    />
                  </Picker>
                </View>
                {errors.furnitureType && touched.furnitureType ? (
                  <Text style={styles.errorText}>{errors.furnitureType}</Text>
                ) : null}
                <View style={styles.textGroup}>
                  <Text style={styles.textStyle}>Bedrooms:</Text>
                  <TextInput
                    style={styles.input1}
                    placeholder="Number of Bedroom"
                    onChangeText={handleChange("bedRoom")}
                    onBlur={handleBlur("bedRoom")}
                    value={values.bedRoom}
                  />
                </View>
                {errors.bedRoom && touched.bedRoom ? (
                  <Text style={styles.errorText}>{errors.bedRoom}</Text>
                ) : null}
                <View style={styles.calendar}>
                  <View style={{ flexDirection: "row" }}>
                    <View style={{ marginRight: 5 }}>
                      <FontAwesome.Button
                        iconStyle={{ marginRight: 0 }}
                        style={styles.icon}
                        size={24}
                        color="white"
                        name="calendar"
                        onPress={() => showMode("date")}
                      />
                    </View>
                    <FontAwesome.Button
                      iconStyle={{ marginRight: 0 }}
                      style={styles.icon}
                      size={24}
                      color="white"
                      name="clock-o"
                      onPress={() => showMode("time")}
                    />
                  </View>
                  <TextInput
                    style={[styles.input1, { color: "black" }]}
                    editable={false}
                    placeholder={dateInput}
                    value={values.dateTime}
                    name="dateTime"
                  />
                  {show && (
                    <DateTimePicker
                      testID="dateTimePicker"
                      value={date}
                      mode={mode}
                      is24Hour={true}
                      display="default"
                      onChange={(event, selectedDate) => {
                        let dateText = handleDateTime(event, selectedDate);
                        setFieldValue("dateTime", dateText);
                      }}
                    />
                  )}
                </View>
                {errors.dateTime && touched.dateTime ? (
                  <Text style={styles.errorText}>{errors.dateTime}</Text>
                ) : null}
                <View style={styles.textGroup}>
                  <Text style={styles.textStyle}>Address:</Text>
                  <TextInput
                    style={styles.input1}
                    placeholder="Address (required)"
                    onChangeText={handleChange("address")}
                    onBlur={handleBlur("address")}
                    value={values.address}
                  />
                </View>
                {errors.address && touched.address ? (
                  <Text style={styles.errorText}>{errors.address}</Text>
                ) : null}
                <View style={styles.textGroup}>
                  <Text style={styles.textStyle}>Monthly rent price:</Text>
                  <TextInput
                    style={styles.input1}
                    placeholder="Monthly rent price (required)"
                    onChangeText={handleChange("monthyRentPrice")}
                    onBlur={handleBlur("monthyRentPrice")}
                    value={values.monthyRentPrice}
                  />
                </View>
                {errors.monthyRentPrice && touched.monthyRentPrice ? (
                  <Text style={styles.errorText}>{errors.monthyRentPrice}</Text>
                ) : null}
                <View style={styles.textGroup}>
                  <Text style={styles.textStyle}>Note:</Text>
                  <TextInput
                    style={styles.input1}
                    placeholder="Note (optional)"
                    onChangeText={handleChange("note")}
                    onBlur={handleBlur("note")}
                    value={values.note}
                  />
                </View>
                {errors.note && touched.note ? (
                  <Text style={styles.errorText}>{errors.note}</Text>
                ) : null}
                <View style={styles.textGroup}>
                  <Text style={styles.textStyle}>Reporter Name:</Text>
                  <TextInput
                    style={styles.input1}
                    placeholder="Reporter Name (required)"
                    onChangeText={handleChange("reporterName")}
                    onBlur={handleBlur("reporterName")}
                    value={values.reporterName}
                  />
                </View>
                {errors.reporterName && touched.reporterName ? (
                  <Text style={styles.errorText}>{errors.reporterName}</Text>
                ) : null}
                <View style={styles.btnGroup}>
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => setModalEdit(!modalEdit)}
                  >
                    <Text style={styles.buttonText}>Cancle</Text>
                  </Pressable>
                  <Pressable
                    style={[styles.button, styles.buttonOpen]}
                    onPress={handleSubmit}
                  >
                    <Text style={styles.buttonText}>Confirm</Text>
                  </Pressable>
                </View>
              </ScrollView>
            )}
          </Formik>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default EditModel;

const styles = StyleSheet.create({
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
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
  },
  btnGroup: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
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
    fontSize: 25,
  },
  textStyle: {
    fontSize: 18,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  input1: {
    height: 50,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: "50%",
    fontSize: 18,
  },
  textGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  errorText: {
    color: "red",
    fontWeight: "bold",
    alignSelf: "flex-end",
    marginHorizontal: 15,
  },
  picker: {
    marginVertical: 10,
    marginLeft: 10,
    width: "50%",
  },
  icon: {
    backgroundColor: "coral",
  },
  calendar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
