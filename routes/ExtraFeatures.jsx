import React, { useEffect, useState } from "react";
import {
  Alert,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  Vibration,
  View,
} from "react-native";
import CustomButton from "../components/CustomButton";
import { Audio } from "expo-av";
import Header from "../components/Header";
const ExtraFeatures = ({ navigation }) => {
  const [modalFeatures, setModalFeatures] = useState(false);
  const [sound, setSound] = useState();
  async function ringBell() {
    const { sound } = await Audio.Sound.createAsync(
      require("../bellsound.mp3")
    );
    setSound(sound);
    await sound.playAsync();
  }

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);
  return (
    <View style={{ flex: 1 }}>
      <Header navigation={navigation} title="Extra features" />
      <View style={styles.container}>
        <CustomButton
          text="Press to open dialog"
          onPress={() => setModalFeatures(true)}
        />
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalFeatures}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalFeatures(!modalFeatures);
          }}
        >
          <View style={styles.modalView}>
            <Pressable
              style={[styles.button, styles.buttonOpen]}
              onPress={() => Vibration.vibrate()}
            >
              <Text style={[styles.textStyle, styles.buttonText]}>Vibrate</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonOpen]}
              onPress={ringBell}
            >
              <Text style={[styles.textStyle, styles.buttonText]}>
                Ring Bell
              </Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalFeatures(!modalFeatures)}
            >
              <Text style={[styles.textStyle, styles.buttonText]}>Cancle</Text>
            </Pressable>
          </View>
        </Modal>
      </View>
    </View>
  );
};

export default ExtraFeatures;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    marginTop: "30%",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginHorizontal: "5%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    height: 300,
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
});
