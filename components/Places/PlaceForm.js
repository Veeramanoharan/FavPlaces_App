import { useState } from "react";
import { View,Text, ScrollView, TextInput,StyleSheet } from "react-native";
import { Colors } from "../../constants/Colors";
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";


function PlaceForm(){

    const [enteredTitle,setEnteredTitle] = useState('');

    function changeTitleHandler(enteredText){
            setEnteredTitle(enteredText);
    }
    return (
        <ScrollView style={style.form}>
            <View>
                <Text style={style.label} >Title</Text>
                <TextInput style={style.input}
                    onChange={changeTitleHandler} value={enteredTitle}/>
            </View>
            <ImagePicker />
            <LocationPicker />
        </ScrollView>
    )
}

export default PlaceForm;

const style = StyleSheet.create({
    form:{
        flex: 1,
        padding: 25
    },
    label:{
        fontWeight:'bold',
        marginBottom: 4,
        color: Colors.primary500,
    },
    input:{
        marginVertical: 7,
        paddingHorizontal: 4,
        paddingVertical: 7,
        borderBottomColor:Colors.primary700,
        fontSize: 16,
        borderBottomWidth: 2,
        backgroundColor: Colors.primary100
    }
});