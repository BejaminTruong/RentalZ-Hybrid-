import React, { useContext, useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, View, Text } from "react-native";
import Header from "../components/Header";
import RentalItem from "../components/RentalItem";
import { RentalContext } from "../DataProvider";
import { FontAwesome } from "@expo/vector-icons";
import { TextInput } from "react-native-gesture-handler";
import { db } from "../firebase";
import * as Progress from "react-native-progress";
import CustomCheckbox from "../components/CustomCheckbox";
const DemoProject = ({ navigation }) => {
  const [rental, setRental] = useContext(RentalContext);
  const [filterData, setFilterData] = useState([]);
  const [search, setSearch] = useState("");
  const [checked, setChecked] = useState([]);
  const [display, setDisplay] = useState(false);
  const getDataFromDB = () => {
    return db
      .collection("rentals")
      .orderBy("createdAt")
      .onSnapshot(
        (querySnapshot) => {
          let dbVals = [];
          querySnapshot.forEach((doc) => {
            dbVals.push({ key: doc.id, ...doc.data() });
          });
          setFilterData(dbVals);
          setRental(dbVals);
        },
        (err) => console.log(err)
      );
  };
  useEffect(() => {
    getDataFromDB();
  }, []);

  useEffect(() => {
    navigation.addListener("focus", () => {
      getDataFromDB();
      setSearch("");
      handleSearch();
      setChecked([]);
      confirmChecked();
    });
  }, [navigation]);
  const handleSearch = (text) => {
    if (text) {
      const newData = rental.filter((item) => {
        const itemData = item.propertyType
          ? item.propertyType.toLowerCase()
          : "".toLowerCase();
        const textData = text.toLowerCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilterData(newData);
      setSearch(text);
    } else {
      setFilterData(rental);
      setSearch(text);
    }
  };
  const handleCheck = (isChecked, item) => {
    const newChecked = [...checked];
    if (isChecked) {
      newChecked.push(item.text);
    } else {
      newChecked.splice(checked.indexOf(item.text), 1);
    }
    setChecked(newChecked);
  };
  const confirmChecked = () => {
    const newArr = [];
    if (checked.length < 1) {
      setFilterData(rental);
      setDisplay(false);
      return;
    }
    rental.filter((itemFilter) => {
      for (let i = 0; i < checked.length; i++) {
        if (itemFilter.propertyType === checked[i]) {
          newArr.push(itemFilter);
          break;
        }
      }
    });
    setFilterData(newArr);
    setDisplay(false);
  };
  return (
    <View style={styles.container}>
      <Header navigation={navigation} title="Rental Apartments Finder" />
      <View style={styles.searchBar}>
        <TextInput
          onChangeText={(text) => handleSearch(text)}
          value={search}
          style={styles.search}
          placeholder="Search for property"
        />
        <FontAwesome name="search" size={24} color="coral" />
      </View>
      <View style={styles.content}>
        <View style={{ marginBottom: 15 }}>
          <FontAwesome.Button
            style={styles.icon}
            onPress={() => setDisplay(!display)}
            name="filter"
            size={24}
            color="white"
          />
          <View
            style={[
              styles.checkedStyle,
              {
                opacity: display ? null : 0,
                height: display ? null : 0,
              },
            ]}
          >
            <FlatList
              data={[
                { key: "1", text: "House" },
                { key: "2", text: "Flat" },
                { key: "3", text: "Resort" },
                { key: "4", text: "Bungalow" },
                { key: "5", text: "Villa" },
                { key: "6", text: "Penthouse" },
                { key: "7", text: "Mainsonnette" },
              ]}
              renderItem={({ item }) => (
                <CustomCheckbox
                  handleCheck={(isChecked) => handleCheck(isChecked, item)}
                  item={item}
                />
              )}
            />
            <View style={styles.btnGroup}>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setDisplay(!display)}
              >
                <Text style={[styles.textStyle, styles.buttonText]}>
                  Cancle
                </Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonOpen]}
                onPress={confirmChecked}
              >
                <Text style={[styles.textStyle, styles.buttonText]}>
                  Confirm
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
        <View>
          <FontAwesome.Button
            style={styles.icon}
            onPress={() => navigation.navigate("Add Property")}
            name="plus"
            size={24}
            color="white"
          />
        </View>
        <View style={styles.list}>
          {filterData.length < 1 ? (
            <View style={styles.progress}>
              <Progress.Circle
                borderWidth={3}
                borderColor="coral"
                size={150}
                indeterminate={true}
              />
            </View>
          ) : (
            <FlatList
              data={filterData}
              renderItem={({ item }) => (
                <RentalItem navigation={navigation} item={item} />
              )}
            />
          )}
        </View>
      </View>
    </View>
  );
};

export default DemoProject;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
    paddingHorizontal: 40,
    paddingTop: 20,
  },
  list: {
    flex: 1,
    marginTop: 10,
    marginBottom: 20,
  },
  icon: {
    backgroundColor: "coral",
    justifyContent: "center",
  },
  searchBar: {
    paddingHorizontal: 40,
    paddingTop: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  search: {
    flexGrow: 1,
    padding: 10,
    borderBottomWidth: 1,
    marginRight: 3,
    fontSize: 20,
  },
  progress: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  checkedStyle: {
    position: "absolute",
    backgroundColor: "white",
    zIndex: 99,
    width: "100%",
    borderWidth: 1,
    borderRadius: 5,
  },
  btnGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
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
});
