import { Picker } from "@react-native-picker/picker";
import { Formik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, TextInput, View, Alert } from "react-native";
import * as Yup from "yup";
import CustomButton from "../components/CustomButton";
import Header from "../components/Header";
import { ScrollView } from "react-native-gesture-handler";
import ConfirmModal from "../components/ConfirmModal";
import firebase from "firebase/app";
import { db } from "../firebase";
import DateTimePicker from "@react-native-community/datetimepicker";
import { FontAwesome } from "@expo/vector-icons";
const AddProperty = ({ navigation }) => {
  const [selectedProperty, setSelectedProperty] = useState("");
  const [selectedFurniture, setSelectedFurniture] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [confirmModal, setConfirmModal] = useState("");
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [dateInput, setDateInput] = useState(null);
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setSelectedFurniture("");
      setSelectedProperty("");
      setDateInput(null);
      formRef.current.resetForm();
    });

    return unsubscribe;
  }, [navigation]);
  const formRef = useRef();
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
      .doc()
      .set({
        ...values,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
    setModalVisible(false);
    actions.resetForm();
    navigation.navigate("Home");
    Alert.alert(null, "Add property successfully!", [], {
      cancelable: true,
    });
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
    setDateInput(fDate + " " + fTime);
    return fDate + " " + fTime;
  };
  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  return (
    <ScrollView style={styles.container}>
      <Header navigation={navigation} title="Add Property" />
      <Formik
        innerRef={formRef}
        initialValues={{
          propertyType: selectedProperty,
          bedRoom: "",
          dateTime: "",
          address: "",
          monthyRentPrice: "",
          furnitureType: selectedFurniture,
          note: "",
          reporterName: "",
        }}
        validationSchema={formYupSchema}
        onSubmit={handleFormSubmit}
      >
        {({
          setFieldValue,
          handleChange,
          handleBlur,
          values,
          errors,
          touched,
        }) => (
          <View style={styles.form}>
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
              <Picker.Item color="gray" label="Property Type (required)" />
              <Picker.Item label="House" value="House" />
              <Picker.Item label="Flat" value="Flat" />
              <Picker.Item label="Resort" value="Resort" />
              <Picker.Item label="Bungalow" value="Bungalow" />
              <Picker.Item label="Villa" value="Villa" />
              <Picker.Item label="Penthouse" value="Penthouse" />
              <Picker.Item label="Mainsonnette" value="Mainsonnette" />
            </Picker>
            {errors.propertyType && touched.propertyType ? (
              <Text style={styles.errorText}>{errors.propertyType}</Text>
            ) : null}
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
              <Picker.Item color="gray" label="Furniture Type (optional)" />
              <Picker.Item label="Furnished" value="Furnished" />
              <Picker.Item label="Unfurnished" value="Unfurnished" />
              <Picker.Item label="Part Furnished" value="Part Furnished" />
            </Picker>
            {errors.furnitureType && touched.furnitureType ? (
              <Text style={styles.errorText}>{errors.furnitureType}</Text>
            ) : null}
            <TextInput
              style={styles.input1}
              placeholder="Number of Bedroom (required)"
              onChangeText={handleChange("bedRoom")}
              onBlur={handleBlur("bedRoom")}
              value={values.bedRoom}
            />
            {errors.bedRoom && touched.bedRoom ? (
              <Text style={styles.errorText}>{errors.bedRoom}</Text>
            ) : null}
            <View style={styles.calendar}>
              <TextInput
                style={[styles.input1, { flexGrow: 1, color: "black" }]}
                editable={false}
                placeholder={dateInput ? dateInput : "Date and Time (required)"}
                value={values.dateTime}
                name="dateTime"
              />
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
            <TextInput
              style={styles.input1}
              placeholder="Address (required)"
              onChangeText={handleChange("address")}
              onBlur={handleBlur("address")}
              value={values.address}
            />
            {errors.address && touched.address ? (
              <Text style={styles.errorText}>{errors.address}</Text>
            ) : null}
            <TextInput
              style={styles.input1}
              placeholder="Monthly rent price (required)"
              onChangeText={handleChange("monthyRentPrice")}
              onBlur={handleBlur("monthyRentPrice")}
              value={values.monthyRentPrice}
            />
            {errors.monthyRentPrice && touched.monthyRentPrice ? (
              <Text style={styles.errorText}>{errors.monthyRentPrice}</Text>
            ) : null}
            <TextInput
              style={styles.input1}
              placeholder="Note (optional)"
              onChangeText={handleChange("note")}
              onBlur={handleBlur("note")}
              value={values.note}
            />
            {errors.note && touched.note ? (
              <Text style={styles.errorText}>{errors.note}</Text>
            ) : null}
            <TextInput
              style={styles.input1}
              placeholder="Reporter Name (required)"
              onChangeText={handleChange("reporterName")}
              onBlur={handleBlur("reporterName")}
              value={values.reporterName}
            />
            {errors.reporterName && touched.reporterName ? (
              <Text style={styles.errorText}>{errors.reporterName}</Text>
            ) : null}
            <CustomButton
              onPress={() => {
                for (let x in values) {
                  if (values[x] === "") return;
                }
                setConfirmModal(values);
                setModalVisible(true);
              }}
              text="Submit"
            />
          </View>
        )}
      </Formik>
      <ConfirmModal
        confirmModal={confirmModal}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        formRef={formRef}
      />
    </ScrollView>
  );
};

export default AddProperty;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  form: {
    flex: 1,
  },
  input1: {
    height: 50,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    fontSize: 18,
  },
  btnSubmit: {
    display: "flex",
    color: "blue",
    marginHorizontal: 10,
    marginTop: 5,
  },
  errorText: {
    color: "red",
    fontWeight: "bold",
    marginVertical: 5,
    marginHorizontal: 15,
  },
  picker: {
    marginVertical: 10,
    marginLeft: 10,
  },
  icon: {
    backgroundColor: "coral",
  },
  calendar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingRight: 12,
  },
});
