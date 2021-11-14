import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainProject from "../Main Project";
import DetailsStack from "./DetailsStack";
const HomeStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: "coral",
      }}
    >
      <Stack.Screen
        options={{ headerShown: false }}
        name="Home"
        component={MainProject}
      />
      <Stack.Screen name="Details" component={DetailsStack} />
    </Stack.Navigator>
  );
};

export default HomeStack;
