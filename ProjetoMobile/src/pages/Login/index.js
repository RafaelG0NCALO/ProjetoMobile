import react, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, KeyboardAvoidingView, Alert } from "react-native";
import firebase from '../../config/firebaseconfig'
import styles from "./style";
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { TextInput } from "react-native-gesture-handler";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login({ navigation }){

    const [email, setEmail] = useState("")
    const [password, setpassword] = useState("")
    const [errorLogin, setErrorLogin] = useState("")

    function hadleForgotPassword(){
        firebase.auth().sendPasswordResetEmail(email)
        .then(() => Alert.alert("Redefinir senha","Enviamos Para o seu email"))
        .catch(()=> Alert.alert ("Preencha o campo E-mail"))
    }

    const loginFirebase =  ()=>{

        firebase.auth().signInWithEmailAndPassword(email, password)
        .then( async (userCredential) => {
            let user = userCredential.user;
            await AsyncStorage.setItem('idUser', user.uid)
            navigation.navigate("Task", { idUser: user.uid })
        })

        .catch((error) => {
            setErrorLogin(true)
            let errorCode = error.code;
            let errorMessage = error.message;
        });

    }

    useEffect(()=> {
        firebase.auth().onAuthStateChanged((user) => {
            // console.log(user)
            if (user) {
                navigation.navigate("Task", { idUser: user.uid })
            }
          });
    },[]);

    return(
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
        >
            <Text style={styles.title}>Task</Text>

            <TextInput style={styles.input} placeholder={"Coloque seu E-mail"} type="text" value={email} 
            onChangeText={(text) => setEmail(text)} />

            <TextInput style={styles.input} placeholder={"Coloque sua senha"} type="text" value={password}
            secureTextEntry={true} 
            onChangeText={(text) => setpassword(text)} />

            {errorLogin === true ? 
                <View style={styles.contentAlert}>
                    <MaterialCommunityIcons name="alert-circle" size={24} color="#bdbdbd"/>
                    <Text style={styles.WarningAlert}> E-mail e/ou Senha inválido</Text>
                </View> 
            : 
                <View/>
            }

            {email === "" || password === "" ? 
                <TouchableOpacity disabled={true} style={styles.buttonLogin}>
                    <Text style={styles.textButtonLogin}>Entrar</Text>
                </TouchableOpacity>
            :
                <TouchableOpacity style={styles.buttonLogin} onPress={ loginFirebase }>
                    <Text style={styles.textButtonLogin}>Entrar</Text>
                </TouchableOpacity>
            }

            <Text style={styles.registration}>
                Não é cadastrado?
                <Text
                    style={styles.linkSubscribe}
                    onPress={()=> navigation.navigate("NewUser")}
                > Registrar</Text>
            </Text>
            <Text style={styles.linkEsqueci} onPress={hadleForgotPassword}> 
                Esqueci a senha 
            </Text>
            <View style={{height:100}} />
            
        </KeyboardAvoidingView>
    );
}