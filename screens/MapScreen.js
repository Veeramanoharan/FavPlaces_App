import MapView,{Marker} from "react-native-maps";
import { Alert, StyleSheet } from "react-native";
import { useCallback, useLayoutEffect, useState } from "react";
import IconButton from "../components/UI/IconButton";

function MapScreen({navigation}){

    const[selectedLocation,setSelectedLocation] = useState();
    const region = {
        latitude: 12.9166,
        longitude: 77.6382,
        latitudeDelta: 0.03,
        longitudeDelta: 0.03
      };
      
      function selectLocationHandler(event){
        const lat = event.nativeEvent.coordinate.latitude;
        const lang = event.nativeEvent.coordinate.longitude;
        // console.log("Event Log:",event);

        setSelectedLocation({
            lat: lat,
            lang: lang });

      }

      const saveSelectedLocationHandler = useCallback(() => {
        if(!selectedLocation){
                Alert.alert('No locations picked!',
                'You have to pick a location from the map first.'
                );
                return;
        }
            navigation.navigate("AddPlace",
                {
                    selectedLat : selectedLocation.lat,
                    selectedLang : selectedLocation.lang
                });
      },[navigation,selectedLocation]);

      useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: ({tintColor}) =>   
                 <IconButton icon='save' size= {24}
                        color= {tintColor} onPress={saveSelectedLocationHandler} />
        });
      },[navigation,saveSelectedLocationHandler]);
 
    return(
        <MapView style={styles.map} initialRegion={region} 
             onPress={selectLocationHandler}>

               { selectedLocation && (
                <Marker 
                    title="Picked Location" 
                    coordinate={
                    {latitude: selectedLocation.lat, 
                    longitude: selectedLocation.lang}
                }/>)}
        </MapView>
    );
}

export default MapScreen;

const styles = StyleSheet.create({
    map:{
        flex: 1
    },
});


