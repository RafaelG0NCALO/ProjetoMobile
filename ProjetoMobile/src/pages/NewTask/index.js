import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity} from "react-native";
import firebase from '../../config/firebaseconfig.js'
import styles from "./style";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { serverTimestamp } from "firebase/firestore";
import CalendarPicker from "react-native-calendar-picker";

export default function NewTask({ navigation, route }, props) {

    const [userID, setUserID] = useState("")
    const [description, setDescription] = useState(null);
    const database = firebase.firestore()
   
    async function teste(){
        const value = await AsyncStorage.getItem('idUser')
        setUserID(value)
    }
    useEffect(()=>{
        teste()
    },[])
    
    function addTask(){
      database.collection(userID).add({
        description: description,
        status: false,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      })
      navigation.navigate("Task");
    }

    const [date, setDate] = useState('')
    const addZero = (a) => {
        if(a < 10 && a > 0){
            return '0' + a.toString();
        } else {
            return a;
        }
    }

    const getCurrentDate = () => {
        var date = new Date().getDate()
        var month = new Date().getMonth() + 1
        var year = new Date().getFullYear()
        return year + '-' + addZero(month) + '-' + addZero(date) // yyyy-mm-dd
    }

    const getMinDate = () => {
        var date = new Date().getDate()
        var month = new Date().getMonth() + 1
        var year = new Date().getFullYear()
        return year + '-' + addZero(month) + '-' + addZero(date) // yyyy-mm-dd
    }


    return(
        <View style={styles.container}>

           <Text style={styles.label}>Descrição</Text>
           <TextInput
                style={styles.input}
                placeholder="Ex: estudar javascript"
                onChangeText={setDescription}
                value={description}
           />
           
           <View>
            <Text>{startDate}</Text>
           </View>
           <CalendarPicker
           onDateChange={this.onDateChange}
           />
           
           <TouchableOpacity 
                style={styles.buttonNewTask}
                onPress={()=>{
                addTask()
            }}
            > 
                <Text style={styles.iconButton}>Salvar</Text>
            </TouchableOpacity>

        </View>
    )
    
}