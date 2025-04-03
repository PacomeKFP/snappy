import { StyleSheet, Text,TextProps } from "react-native"

const styles =StyleSheet.create({
    single:{
        fontSize:16
    },
    titre:{
        fontSize:18,
        fontWeight:"bold"
    },
    time:{
        fontSize: 10,
        
    }
})
type Props = TextProps &{
    variant?:keyof typeof styles,
    color?:string
}

export function ThemeText( {variant , color, ...rest}: Props){
    return <Text  style= {styles [variant ?? "single"]}{...rest }/> 
}

