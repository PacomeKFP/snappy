import { StyleSheet,TextInput, TextInputProps } from "react-native";


const styles = StyleSheet.create({
    searchBar: {
        flex: 1,
        padding: 8,
        borderRadius: 20,
        backgroundColor: "#eFeFeF"},
    searchInput: {
        flex: 1,
        padding: 10,
        borderRadius: 20,},
        input: {
            width: "100%",
            padding: 10,
            borderWidth: 1,
            borderColor: "#ccc",
            marginBottom: 10,
            borderRadius: 5,
          },
    })

    type Props = TextInputProps &{
        variant?:keyof typeof styles,
        color?:string
    }

    export function ThemeTextInput( {variant , color, ...rest}: Props){
        return <TextInput  style= {styles [variant ?? "searchBar"]}{...rest }/> 
    }