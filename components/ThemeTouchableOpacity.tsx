import { StyleSheet,TouchableOpacity, TouchableOpacityProps } from "react-native";

const styles = StyleSheet.create({
    button: {
        borderRadius: 60,
        backgroundColor:"#7B52AB",
        margin: 10,
        padding: 10,
        alignItems: "center",
        justifyContent: "center",},
    fab: {
            position: "absolute",
            bottom: 70,
            right: 20,
            backgroundColor: "#7B52AB",
            width: 60,
            height: 60,
            borderRadius: 30,
            justifyContent: "center",
            alignItems: "center",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 3,
        elevation: 5,
          },
});

type Props = TouchableOpacityProps &{
    variant?:keyof typeof styles,
    color?:string
}

export function ThemeTouchableOpacity( {variant , color, ...rest}: Props){
    return <TouchableOpacity  style= {styles [variant ?? "button"]}{...rest }/> 
}

