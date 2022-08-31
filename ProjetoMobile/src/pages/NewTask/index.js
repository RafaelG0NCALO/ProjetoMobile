import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import firebase from "../../config/firebaseconfig.js";
import styles from "./style";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { serverTimestamp } from "firebase/firestore";
import CalendarPicker from "react-native-calendar-picker";

export default function NewTask({ navigation, route }, props) {
  const [userID, setUserID] = useState("");
  const [description, setDescription] = useState(null);
  const [dateTask, setDateTask] = useState(null);
  const database = firebase.firestore();

  async function teste() {
    const value = await AsyncStorage.getItem("idUser");
    setUserID(value);
  }
  useEffect(() => {
    teste();
  }, []);

  function addTask() {
   
    if(description === null){
        Alert.alert('Preencha a descrição')
        return
    }
    if(dateTask === null){
        Alert.alert('Preencha a data')
        return
    }
    database.collection(userID).add({
      description: description,
      status: false,
      timestamp: dateTask ? `${dateTask}` : `${new Date()}`,
    });
    navigation.navigate("Task");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Descrição</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: estudar javascript"
        onChangeText={setDescription}
        value={description}
      />

      <CalendarPicker onDateChange={(e) => setDateTask(e)} />

      <TouchableOpacity
        style={styles.buttonNewTask}
        onPress={() => {
          addTask();
        }}
      >
        <Text style={styles.iconButton}>Salvar</Text>
      </TouchableOpacity>
    </View>
  );
}