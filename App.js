import React from "react";
import { StyleSheet, View, Platform, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { DataProvider } from "./DataProvider";
import AddProperty from "./routes/AddProperty";
import HomeStack from "./routes/HomeStack";
import { LogBox } from "react-native";
import ExtraFeatures from "./routes/ExtraFeatures";
LogBox.ignoreLogs(["Setting a timer for a long period of time"]);
export default function App() {
  const Drawer = createDrawerNavigator();
  return (
    <DataProvider>
      <View style={styles.container}>
        <NavigationContainer>
          <Drawer.Navigator
            initialRouteName="Home"
            screenOptions={{
              drawerActiveTintColor: "coral",
              headerShown: false,
            }}
          >
            <Drawer.Screen name="HomeStack" component={HomeStack} />
            <Drawer.Screen name="Add Property" component={AddProperty} />
            <Drawer.Screen name="Extra features" component={ExtraFeatures}/>
          </Drawer.Navigator>
        </NavigationContainer>
      </View>
    </DataProvider>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
