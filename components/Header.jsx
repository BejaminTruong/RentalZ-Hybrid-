import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
const Header = ({ navigation, title }) => {
  return (
    <View style={styles.header}>
      <View style={styles.icon}>
        <Ionicons.Button
          onPress={() => {
            navigation.openDrawer();
          }}
          style={styles.icon}
          name="menu"
          size={48}
          color="white"
        />
      </View>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    backgroundColor: "coral",
    alignItems: "center",
  },
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  icon: {
    backgroundColor: "coral",
    width: 70,
    marginRight: 20,
  },
});
