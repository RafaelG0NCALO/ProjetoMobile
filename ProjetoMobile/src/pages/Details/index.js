import React, { useEffect, useState } from "react"
import {View, Text, TextInput, TouchableOpacity}  from "react-native"
import firebase from "../../config/firebaseconfig.js"
import styles from "./style"
import AsyncStorage from '@react-native-async-storage/async-storage';
import CalendarPicker from "react-native-calendar-picker";

export default function Details({ navigation, route }) {

    const [userID, setUserID] = useState("")
    const [descriptionEdit, setDescriptionEdit] = useState(route.params?.description)
    const [dateTaskEdit, setDateTaskEdit] = useState(null);
    const idTask = route.params?.id
    const database = firebase.firestore()
    const minDate = new Date();

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
        timestamp: dateTaskEdit ? `${dateTaskEdit}` : `${new Date()}`
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

          <CalendarPicker 
            onDateChange={(e) => setDateTaskEdit(e)}
            minDate={minDate} 
            previousTitle="Anterior"
            nextTitle="Próximo"
            weekdays={['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom']}
            months={['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']}
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