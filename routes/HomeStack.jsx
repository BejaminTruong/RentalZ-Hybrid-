import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DemoProject from "../DemoProject";
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
        component={DemoProject}
      />
      <Stack.Screen name="Details" component={DetailsStack} />
    </Stack.Navigator>
  );
};

export default HomeStack;
