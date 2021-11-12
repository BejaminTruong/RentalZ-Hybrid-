import React from "react";
import { StyleSheet } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
const CustomCheckbox = ({ item, handleCheck }) => {
  return (
    <BouncyCheckbox
      text={item.text}
      style={{ marginBottom: 15 }}
      textStyle={{
        fontSize: 24,
      }}
      onPress={handleCheck}
    />
  );
};

export default CustomCheckbox;

const styles = StyleSheet.create({});
