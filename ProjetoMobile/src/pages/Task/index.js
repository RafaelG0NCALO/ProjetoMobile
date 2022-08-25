import React, { useEffect, useState } from "react";
import { FlatList, TouchableOpacity, View, Text } from "react-native";
import firebase from "../../config/firebaseconfig.js"
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons"
import styles from "./style";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Task({ navigation, route }) {
    const [userID, setUserID] = useState("")
    const [task, setTask] = useState([])
    const database = firebase.firestore()

    async function Logout(){
        AsyncStorage.clear();
        firebase.auth().signOut().then(() => {
            navigation.navigate("Login")
        }).catch((error) => {

        })
    }

    function deleteTasks(id){
        console.log(id)
        database.collection(userID).doc(id).delete()
    }

    async function teste(){
        const value = await AsyncStorage.getItem('idUser')
        setUserID(value) 
        database.collection(`${value}`).onSnapshot((query) => {
            const list = []
            query.forEach((doc) => {
                list.push({...doc.data(), id: doc.id})
            })
            setTask(list)
        })
    }

    useEffect(() => {
        teste()
    }, [])

    return(
        <View style={styles.container}>
            
         
                <View style={styles.viewTabs}>
                    <TouchableOpacity style={styles.btnAtividades}>
                        <Text style={styles.textBtnAtividades}>Atividades</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnEncerradas}>
                        <Text style={styles.textBtnEncerradas}>Encerradas</Text>
                    </TouchableOpacity>
                </View>
          

            <FlatList showsVerticalScrollIndicator={false} data={task}
                renderItem={( { item } )=>{
                    return(
                    <View style={styles.Tasks}>

                        <TouchableOpacity style={styles.deleteTask} onPress={() => { deleteTasks(item.id) }}>
                            <FontAwesome name="star" size={23} color="#5568fc"></FontAwesome>
                        </TouchableOpacity>

                        <Text style={styles.DescriptionTask}
                            onPress={()=>
                                navigation.navigate("Details",{
                                    id: item.id,
                                    description: item.description,
                                    idUser: route.params?.idUser,   
                            })}
                        >
                        {item.description}  
                        </Text>  

                    </View>
                    )
                }}
            />
            <TouchableOpacity style={styles.buttonNewTask} 
            onPress={() => navigation.navigate("New Task", { idUser: route.params?.idUser })}>
                <Text style={styles.iconButton}>+</Text>
            </TouchableOpacity>

                <TouchableOpacity style={styles.buttonLogout}
                onPress={()=>{ Logout() }}>
                    <Text style={styles.iconButtonLogout}>
                        <MaterialCommunityIcons name="location-exit" size={23} color="#333" />
                    </Text>
                </TouchableOpacity>

        </View>
    )
}