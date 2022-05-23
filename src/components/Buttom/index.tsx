import React from "react";
import { TouchableOpacity, TouchableOpacityProps, Text, ActivityIndicator } from "react-native";
import { styles } from "./style";
import { theme } from "../../theme"

interface Props extends TouchableOpacityProps{
    isLoading: boolean;
}

export function Buttom({isLoading, ...rest}: Props){
    return (
        <TouchableOpacity style={styles.container} {...rest} >
            {
                isLoading ? <ActivityIndicator color={theme.colors.text_on_brand_color} /> : <Text style={styles.title}>Enviar Feedback</Text>
            }
        </TouchableOpacity>
    );
}