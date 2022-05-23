import { ArrowLeft } from "phosphor-react-native";
import React, {useState} from "react";
import { View, TextInput, Text, Image, TouchableOpacity } from "react-native";
import { theme } from "../../theme";
import { styles } from "./style";
import { FeedbackType } from "../widget/index";
import { feedbackTypes } from "../../utils/feedbackTypes";
import { ScreenshotButton } from "../screenshotButton";
import { Buttom } from "../Buttom";
import { captureScreen } from "react-native-view-shot";
import { api } from "../../libs/api";
import * as FileSystem from "expo-file-system";

interface Props{
    feedbackType: FeedbackType;
    onFeedbackTypeCanceled: ()=>void;
    onFeedbackSent: ()=>void;
}

export function Form({feedbackType, onFeedbackTypeCanceled, onFeedbackSent}: Props){
    const [isSendingFeedback, setIsSendingFeedback] = useState(false);
    const [screenshot, setScreenshot] = useState<null | string>(null);
    const [comment, setComment] = useState("");

    const feedbackTypeInfo = feedbackTypes[feedbackType];

    function handleScreenshot(){
        captureScreen({
            format: "jpg",
            quality: 0.8
        }).then((uri)=>{
            setScreenshot(uri)
        }).catch((err)=>{
            console.log("Erro ao realizar a captura de tela. Erro: " + err)
        })
    }

    function handleScreenshotRemove(){
        setScreenshot(null);
    }

    async function handleSendFeedback() {
        if(isSendingFeedback){
            return ;
        } else{
            setIsSendingFeedback(true);

            const screenshotBase64 = screenshot && await FileSystem.readAsStringAsync(screenshot, {encoding: "base64"});

            try {
                await api.post("/feedbacks",{
                    type: feedbackType,
                    comment: comment,
                    image: `data:image/png;base64, ${screenshotBase64}`
                })

                onFeedbackSent();
            } catch (error) {
                console.log(error);
                setIsSendingFeedback(false);
            }
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={onFeedbackTypeCanceled} >
                    <ArrowLeft size={24} weight={"bold"} color={theme.colors.text_secondary}/>
                </TouchableOpacity>

                <View style={styles.titleContainer}>
                    <Image source={feedbackTypeInfo.image} style={styles.image} />
                    <Text style={styles.titleText}>
                        {feedbackTypeInfo.title}
                    </Text>
                </View>
            </View>

            <TextInput onChangeText={setComment} multiline style={styles.input} placeholder={"Algo não está funcionando bem? Queremos corrigir. Conte com detalhes o que está acontecendo..."} placeholderTextColor={theme.colors.text_secondary} />

            <View style={styles.footer}>
                <ScreenshotButton onTakeShot={handleScreenshot} onRemoveShot={handleScreenshotRemove} screenshot={screenshot} />
                <Buttom onPress={handleSendFeedback} isLoading={isSendingFeedback} />
            </View>
        
        </View>
    )
}