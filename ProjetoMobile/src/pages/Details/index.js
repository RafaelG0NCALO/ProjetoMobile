import React, { useEffect, useState } from "react"
import {View, Text, TextInput, TouchableOpacity}  from "react-native"
import firebase from "../../config/firebaseconfig.js"
import styles from "./style"
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Details({ navigation, route }) {

    const [userID, setUserID] = useState("")
    const [descriptionEdit, setDescriptionEdit] = useState(route.params?.description)
    const idTask = route.params?.id
    const database = firebase.firestore()

    async function teste(){
      const value = await AsyncStorage.getItem('idUser')
      setUserID(value)
    }
    useEffect(()=>{
      teste()
    },[])
   
    function editTask(description, id){
      database.collection(userID).doc(id).update({
        description: description,
      })
      navigation.navigate("Task")
    }

    return(
        <View style={styles.container}>
            <Text style={styles.label}>Editar</Text>
            <TextInput
            style={styles.input}
            placeholder="Ex: estudar javascript"
            onChangeText={setDescriptionEdit}
            value={descriptionEdit}
            />
            <TouchableOpacity 
            style={styles.buttonNewTask}
            onPress={()=>{
                editTask(descriptionEdit, idTask)
            }}
            >
                <Text style={styles.iconButton}>Salvar</Text>
             </TouchableOpacity>
      </View>
    )
}