import React from "react";
import { Alert, Button, StyleSheet, Text, View } from "react-native";
import { db } from "../firebase";
const RentalItem = ({ item, navigation }) => {
  return (
    <View style={styles.text}>
      <Text style={{ fontSize: 20 }}>{item.propertyType}</Text>
      <View style={styles.button}>
        <Button
          title="Details"
          onPress={() => navigation.navigate("Details", { item })}
        />
        <Button
          title="Delete"
          color="red"
          onPress={async () => {
            await db.collection("rentals").doc(item.key).delete();
            Alert.alert(null, "Property Deleted!", [], {
              cancelable: true,
            });
          }}
        />
      </View>
    </View>
  );
};

export default RentalItem;

const styles = StyleSheet.create({
  text: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    marginTop: 16,
    borderColor: "#bbb",
    borderWidth: 1,
    borderStyle: "dashed",
    borderRadius: 10,
  },
  button: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 150,
  },
});
