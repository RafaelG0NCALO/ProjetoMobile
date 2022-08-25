import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet } from "react-native";

import Task from "./src/pages/Task";
import NewTask from "./src/pages/NewTask";
import Details from "./src/pages/Details";

import NewUser from "./src/pages/NewUser";
import Login from "./src/pages/Login";

const Stack = createStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">

        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false
        }}
        />

        <Stack.Screen
          name="NewUser"
          component={NewUser}
          options={{
            headerShown: false
        }}
        />

        <Stack.Screen
          name="Task"
          component={Task}
          options={{
            headerTintColor: "#5568fc",
            headerLeft: null
        }}
        />
        <Stack.Screen
          name="New Task"
          component={NewTask}
          options={{
            headerTintColor: "#5568fc"
        }}
        />
        <Stack.Screen
          name="Details"
          component={Details}
          options={{
            headerTintColor: "#5568fc"
        }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
