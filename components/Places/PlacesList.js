import { FlatList, View, StyleSheet, Text } from "react-native";
import { Colors } from "../../constants/Colors";
import PlaceItem from "./PlaceItem";

function PlacesList({places}){

    if(!places || places.length === 0){
        return(
            <View style = {styles.container}>
                <Text  style = {styles.text}>No places added yet. Start adding!</Text>
            </View>
        )
    }
    return (
        <FlatList data={places} keyExtractor={(item) => item.id}
         renderItem = {({item}) => <PlaceItem  place={item}/>}
        />
    )
}

export default PlacesList;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text:{
        fontSize:16,
        color: Colors.primary200,

    }
});
