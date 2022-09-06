import React, { useEffect, useState } from "react";
import { FlatList, TouchableOpacity, View, Text } from "react-native";
import firebase from "../../config/firebaseconfig.js"
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons"
import styles from "./style";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign } from '@expo/vector-icons';

export default function Encerradas({ navigation, route }) {
  const [userID, setUserID] = useState("");
  const [task, setTask] = useState([]);
  const database = firebase.firestore();

  // vence hoje vermelho
  // vence nos proximos 3 dias amarelo
  // restante branco

  async function Logout() {
    AsyncStorage.clear();
    firebase
      .auth()
      .signOut()
      .then(() => {
        navigation.navigate("Login");
      })
      .catch((error) => {});
  }

  function deleteTasks(id) {
    console.log(id);
    database.collection(userID).doc(id).delete();
  }

  function checkDate(timestamp, id) {
    let color = "";
    const timestemp = timestamp; // retorno que vem do banco
    const convertDate = new Date(parseInt(timestemp)); // converte data
    const date = convertDate.toLocaleString(); // pega data convertida em string

    const updatedTime = new Date(date) // transforma em formato de data para calcular
    const now = new Date() // data de hoje
  
    //math ceil converte numeros para cima, arredonda
    const days = Math.ceil((updatedTime - now) / (1000 * 3600 * 24)) // calcula os dias

    if(days >= 3 && !days <= 2){
      color = '#7cbc7c';
    }else if(days >= 1 && !days <= 3) {
      color = "#f7a334";
    }else {
      color = '#ff6961';
    }

    return {
      color,
      id: id,
      date,
      days: days,
    };
  }

  async function getUserAsyncStorage() {
    const value = await AsyncStorage.getItem("idUser");
    setUserID(value);
    database.collection(`${value}`).onSnapshot((query) => {
      //salva a lista
      const list = [];
      query.forEach((doc) => {
        list.push({ ...doc.data(), id: doc.id });
      });
      //mapeia a lista retornada e checa a data
      const newList = list.map((item) => {
        const infos = checkDate(item.timestamp, item.id);
        //retorna novo obj contendo info dos dias e cores
        if(infos.days < 0){
          return{}
        }

        return {
          ...infos,
          ...item,
        }
      })
      //Ordenando do menor para o maior utilizando a funcao sort
      setTask(newList?.sort((a,b)=> a.days - b.days));
    });
  }

  

  useEffect(() => {
    getUserAsyncStorage();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.viewTabs}>

        <TouchableOpacity style={styles.btnAtividades}
        onPress={()=> navigation.navigate("Task")}>
          <Text style={styles.textBtnAtividades}>Atividades</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnEncerradas}
        onPress={()=> navigation.navigate("Encerradas")}>
          <Text style={styles.textBtnEncerradas}>Encerradas</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        showsVerticalScrollIndicator={false}
        data={task}
        renderItem={({ item }) => {
          
          if(item.days){
            return
          }

          return (
            <View style={styles.Tasks}>
              <TouchableOpacity
                style={styles.deleteTask}
                onPress={() => {
                  deleteTasks(item.id);
                }}
              >
                <FontAwesome
                  name="star"
                  size={23}
                  color="#5568fc"
                ></FontAwesome>
              </TouchableOpacity>
              <Text
                style={{
                  ...styles.DescriptionTask,
                  backgroundColor: `${
                    item.color
                  }`,
                }}
                onPress={() =>
                  navigation.navigate("Details", {
                    id: item.id,
                    description: item.description,
                    idUser: route.params?.idUser,
                    timestamp: item?.timestamp,
                  })
                }
              >

              <View style={styles.contentTask}>
                  <Text style={styles.descricao}>
                    {item.description}  
                  </Text>

                  <Text style={styles.date}>
                  <AntDesign name="clockcircleo" size={18} color="#ebf3e7" />
                    {" "}
                    {new Date(parseInt(item?.timestamp)).getDate()}/
                {new Date(parseInt(item?.timestamp)).getMonth()}/
                {new Date(parseInt(item?.timestamp)).getFullYear()} 
                  </Text>
              </View>

              </Text>
            </View>
          );
        }}
      />
    
      <TouchableOpacity
        style={styles.buttonLogout}
        onPress={() => {
          Logout();
        }}
      >
        <Text style={styles.iconButtonLogout}>
          <MaterialCommunityIcons name="location-exit" size={23} color="#333" />
        </Text>
      </TouchableOpacity>
    </View>
  );
}