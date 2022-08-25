import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 3,
        backgroundColor:"#efefef",
        paddingTop: 20,
     },
     Tasks:{
      width:"100%",
      flexDirection:"row",
      justifyContent:"space-around",
      marginTop:5,
     },
     deleteTask:{
       justifyContent:"center",
       padding: 12,
     },
     DescriptionTask:{
      width: "85%",
      alignContent: "flex-start",
      backgroundColor: "#fff",
      padding: 12, 
      paddingHorizontal: 20,
      borderRadius: 10,
      color: "#282b2db5",
      fontSize: 16,
     },
     buttonNewTask:{
      width:60,
      height:60,
      position:"absolute",
      bottom: 30,
      left:20,
      backgroundColor:"#5568fc",
      borderRadius:50,
      justifyContent:"center",
      alignItems: "center"
     },
     iconButton:{
      color:"#ffffff",
      fontSize:25,
      fontWeight:"bold",
    },
    buttonLogout:{
      width:60,
      height:60,
      position:"absolute",
      bottom: 30,
      right:20,
      justifyContent:"center",
      alignItems: "center"
    },
    viewTabs:{
      flexDirection: "row",
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 20,
      marginTop: 10,
    },
    btnAtividades:{
      alignItems: "center",
      justifyContent: "center",
      width: 140,
      height: 50,
      backgroundColor: "#5568fc",
      borderRadius: 5,
      marginRight: 5,
    },
    btnEncerradas:{
      alignItems: "center",
      justifyContent: "center",
      width: 140,
      height: 50,
      backgroundColor: "#ff6961",
      borderRadius: 5,
      marginLeft: 5,
    },
    textBtnEncerradas:{
      color: '#fff',
    },
    textBtnAtividades:{
      color: '#fff',
    }

    
})

export default styles