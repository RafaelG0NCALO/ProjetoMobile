import react, { useState } from "react";
import {  KeyboardAvoidingView, TextInput, TouchableOpacity, View, Text } from "react-native";
import styles from "./style";
import firebase from "../../config/firebaseconfig"
import { MaterialCommunityIcons } from '@expo/vector-icons'

export default function NewUser( { navigation } ){

    const [email, setEmail] = useState("")
    const [password, setpassword] = useState("")
    const [errorRegister, setErrorRegister] = useState("")

    const register = ()=>{
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
            let user = userCredential.user;
            navigation.navigate("Task", { idUser: user.uid })
        })

        .catch((error) => {
            setErrorRegister(true)
            let errorCode = error.code;
            let errorMessage = error.message;
        });
    }

    return(
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
        >

            <Text style={styles.title}>Criar conta</Text>
            <TextInput style={styles.input} placeholder={"Coloque seu E-mail"} type="text" value={email} 
            onChangeText={(text) => setEmail(text)} />

            <TextInput style={styles.input} placeholder={"Coloque sua senha"} type="text" value={password}
            secureTextEntry={true} 
            onChangeText={(text) => setpassword(text)} />

            {errorRegister === true ? 
                <View style={styles.contentAlert}>
                    <MaterialCommunityIcons name="alert-circle" size={24} color="#bdbdbd"/>
                    <Text style={styles.WarningAlert}> E-mail e/ou Senha inválido</Text>
                </View> 
            : 
                <View/>
            }

            {email === "" || password === "" ? 
                <TouchableOpacity disabled={true} style={styles.buttonRegister}>
                    <Text style={styles.textButtonRegister}>Cadastrar</Text>
                </TouchableOpacity>
                
            :
                <TouchableOpacity style={styles.buttonRegister} onPress={ register }>
                    <Text style={styles.textButtonRegister}>Cadastrar</Text>
                </TouchableOpacity>
            }

            <Text style={styles.registration}>
                Já possui uma conta ?
                <Text
                    style={styles.linkSubscribe}
                    onPress={()=> navigation.navigate("Login")}
                > Entrar</Text>
            </Text>
            <View style={{height:100}} />
            

        </KeyboardAvoidingView>
    );
}