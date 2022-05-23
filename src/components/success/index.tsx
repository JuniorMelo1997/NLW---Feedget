import React from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import {styles} from "./style"
import { successImg } from "../../assets/success.png";
import { Copyright } from "../copyrights";

interface Props{
    onSendAnotherFeedback: ()=>void;
}

export function Success({onSendAnotherFeedback}: Props){
    return (
        <View style={styles.container}>
            <Image source={{uri: successImg}} style={styles.image} />
            <Text  style={styles.title}>
                Obrigado pelo seu feedback
            </Text>

            <TouchableOpacity onPress={onSendAnotherFeedback} style={styles.button}>
                <Text style={styles.buttonTitle}>
                    Enviar outro feedback
                </Text>
            </TouchableOpacity>

            <Copyright />
        </View>
    )
}