import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: Platform.OS === "ios" ? 0 : 50,
    },
    title:{
        fontSize: 30,
        color: '#5568fc',
        marginBottom: 15,
        fontWeight: 'bold'
    },
    input:{
        width: 300,
        marginTop: 10,
        padding: 10,
        height: 50,
        borderWidth: 1,
        borderColor: "#5568fc",
        borderRadius: 7,
        marginLeft: "auto",
        marginRight: "auto",
        color: "#333",
        fontSize: 16
    },
    buttonRegister:{
        width: 300,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#5568fc',
        borderRadius: 7,
        marginTop: 25,
    },
    textButtonRegister:{
        color: "#fff",
        fontSize: 16
    },
    contentAlert:{
        marginTop: 15,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    warningAlert:{
        paddingLeft: 10,
        color: '#bdbdbd',
        fontSize: 16,
    },
    registration:{
        marginTop: 20,
        color: '#333',
    },
    linkSubscribe:{
        color: '#5568fc',
        fontSize: 16
    }
});

export default styles