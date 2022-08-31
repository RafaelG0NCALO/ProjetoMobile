import React, { useEffect, useState } from "react";
import { FlatList, TouchableOpacity, View, Text } from "react-native";
import firebase from "../../config/firebaseconfig.js"
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons"
import styles from "./style";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign } from '@expo/vector-icons';

export default function Task({ navigation, route }) {
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

  async function teste() {
    const value = await AsyncStorage.getItem("idUser");
    setUserID(value);
    database.collection(`${value}`).onSnapshot((query) => {
      const list = [];
      query.forEach((doc) => {
        list.push({ ...doc.data(), id: doc.id });
      });
      setTask(list);
    });
  }

  function checkDate(timestamp, id) {
    const timestemp = timestamp; // retorno que vem do banco
    const convertDate = new Date(parseInt(timestemp)); // converte data
    const date = convertDate.toLocaleString();
    const day = date.split("/")[0];
    const month = date.split("/")[1];

    return {
      color: "#FF6961",
      id: id,
    };
  }

  useEffect(() => {
    teste();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.viewTabs}>
        <TouchableOpacity style={styles.btnAtividades}>
          <Text style={styles.textBtnAtividades}>Atividades</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnEncerradas}>
          <Text style={styles.textBtnEncerradas}>Encerradas</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        showsVerticalScrollIndicator={false}
        data={task}
        renderItem={({ item }) => {
          
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
                    checkDate(item?.timestamp, item.id).color
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
                      {new Date(parseInt(item?.timestamp)).toLocaleDateString(
                        "pt-BR",
                        {
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                        }
                      )}
                  </Text>
              </View>

              </Text>
            </View>
          );
        }}
      />
      <TouchableOpacity
        style={styles.buttonNewTask}
        onPress={() =>
          navigation.navigate("New Task", { idUser: route.params?.idUser })
        }
      >
        <Text style={styles.iconButton}>+</Text>
      </TouchableOpacity>

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