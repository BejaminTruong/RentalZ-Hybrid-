import React, { useState } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import EditModel from "../components/EditModel";
import DescriptionModal from "../components/DescriptionModal";
import { ScrollView } from "react-native-gesture-handler";
import { db } from "../firebase";
const DetailsStack = ({ route }) => {
  const {
    key,
    propertyType,
    bedRoom,
    dateTime,
    address,
    monthyRentPrice,
    furnitureType,
    note,
    reporterName,
    description,
  } = route.params.item;
  const [modalEdit, setModalEdit] = useState(false);
  const [modalDescription, setModalDescription] = useState(false);
  const [descriptionState, setDescription] = useState(description);
  const [details, setDetails] = useState({
    propertyType,
    bedRoom,
    dateTime,
    address,
    monthyRentPrice,
    furnitureType,
    note,
    reporterName,
  });
  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <View style={{ paddingHorizontal: 10 }}>
          <Text style={styles.text}>Property type: {details.propertyType}</Text>
          <Text style={styles.text}>
            Furniture type: {details.furnitureType}
          </Text>
          <Text style={styles.text}>Bed room: {details.bedRoom}</Text>
          <Text style={styles.text}>
            Date and Time: {details.dateTime}
          </Text>
          <Text style={styles.text}>
            Address: {details.address}
          </Text>
          <Text style={styles.text}>
            Price per month: {details.monthyRentPrice}
          </Text>
          <Text style={styles.text}>Note: {details.note}</Text>
          <Text style={styles.text}>Reporter Name: {details.reporterName}</Text>
        </View>
        <View style={{ marginTop: 10 }}>
          <FontAwesome.Button
            style={styles.icon}
            name="edit"
            size={24}
            color="white"
            onPress={() => setModalEdit(true)}
          />
          <EditModel
            modalEdit={modalEdit}
            setModalEdit={setModalEdit}
            setDetails={setDetails}
            item={route.params.item}
          />
        </View>
      </View>
      <View style={styles.descriptionView}>
        {!descriptionState ? (
          <FontAwesome.Button
            style={styles.icon}
            onPress={() => setModalDescription(true)}
            name="plus"
            size={24}
            color="white"
          >
            <Text style={{ fontSize: 20, color: "white", marginBottom: 3 }}>
              Description
            </Text>
          </FontAwesome.Button>
        ) : (
          <View style={styles.descriptionDetails}>
            <View
              style={{
                borderBottomColor: "coral",
                borderBottomWidth: 2,
              }}
            />
            <Text style={{ textAlign: "center", fontSize: 24 }}>
              Property Additional Description
            </Text>
            <View
              style={{
                flex: 1,
                justifyContent: "flex-end",
              }}
            >
              <ScrollView>
                <Text style={styles.descriptionText}>{descriptionState}</Text>
              </ScrollView>
            </View>
            <View style={styles.btnGroup}>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  db.collection("rentals")
                    .doc(key)
                    .update({ description: null });
                  setDescription(null);
                }}
              >
                <Text style={[styles.textStyle, styles.buttonText]}>
                  Delete
                </Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonOpen]}
                onPress={() => {
                  setModalDescription(true);
                }}
              >
                <Text style={[styles.textStyle, styles.buttonText]}>Edit</Text>
              </Pressable>
            </View>
          </View>
        )}

        <DescriptionModal
          modalDescription={modalDescription}
          setModalDescription={setModalDescription}
          item={route.params.item}
          setDescription={setDescription}
        />
      </View>
    </View>
  );
};

export default DetailsStack;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  text: {
    fontSize: 20,
    marginTop: 10,
  },
  body: {
    backgroundColor: "#fff",
    borderRadius: 6,
    elevation: 3,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: "#333",
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginHorizontal: 4,
    marginVertical: 6,
    maxWidth: "85%",
    alignSelf: "center",
  },
  icon: {
    backgroundColor: "coral",
    justifyContent: "center",
  },
  descriptionView: {
    flex: 1,
    marginTop: 10,
    marginBottom: 5,
    width: "85%",
    alignSelf: "center",
  },
  descriptionDetails: {
    flex: 1,
  },
  descriptionText: {
    fontSize: 20,
    borderWidth: 1,
    backgroundColor: "white",
    padding: 5,
    minHeight: 160,
  },
  btnGroup: {
    flexDirection: "row",
  },
  button: {
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    width: "50%",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
  },
  buttonOpen: {
    backgroundColor: "coral",
  },
  buttonClose: {
    backgroundColor: "teal",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
