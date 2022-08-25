import { processColor, StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#efefef",
        marginTop: 20,
    },
    label: {
        width: "100%",
        margin: 10,
        fontSize: 18,
        color: "#5568fc"
    },
    input:{
        width: "94%",
        height: 45,
        padding: 12,
        backgroundColor: "#fff",
        marginLeft: "auto",
        marginRight: "auto",
        borderRadius: 7,
        fontSize: 16,
        borderColor: "#5568fc",
        borderWidth: 1,
    },  
    buttonNewTask:{
        width: "94%",
        height:60,
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: 20,
        backgroundColor:"#5568fc",
        borderRadius: 10,
        justifyContent:"center",
        alignItems: "center",
    },
    iconButton:{
        color:"#ffffff",
        fontSize: 18,
        fontWeight:"bold",
    },
    textDate: {
       fontSize: 18, 
       marginTop: 10,
       textAlign: 'center',
       width: '94%',
       backgroundColor: "#5568fc",
       color: "#fff",
       marginLeft: "auto",
       marginRight: "auto",
       borderRadius: 10,
       padding: 10,
    },
});

export default styles