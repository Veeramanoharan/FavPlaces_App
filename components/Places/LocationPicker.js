import { StyleSheet, Alert, View, Text } from "react-native";
import CustomButton from "../UI/CustomButton";
import { Colors } from "../../constants/Colors";
import { getCurrentPositionAsync, useForegroundPermissions, PermissionStatus } from "expo-location";
import { useEffect, useState } from "react";
import { useNavigation,useRoute, useIsFocused } from "@react-navigation/native";
import MapView,{Marker}  from "react-native-maps";

function LocationPicker(){
    const navigation = useNavigation();
    const[permissionInfo, requestPermission] =  useForegroundPermissions();
    const [pickedLocation,setPickedLocation] = useState();
    const isFocused = useIsFocused();


    const route = useRoute();

        useEffect(() => {

            if(isFocused && route.params){
             const mapPickedLocation =
                {
                    lat: route.params.selectedLat,
                    lang: route.params.selectedLang
                };
                setPickedLocation(mapPickedLocation);

            }
        },[route, isFocused])

    async function verifyLocationPermissions(){
        if (permissionInfo.status === PermissionStatus.UNDETERMINED){
            const permissionResponse = await requestPermission();
            return permissionResponse.granted;
        }
        if(permissionInfo.status === PermissionStatus.DENIED){
            Alert.alert('Access Denied!, Allow location permission to use this app.');
            return false;
        }

        return true;
    }
    

   async function getLocationHandler(){
   let hasPermission = await verifyLocationPermissions();
    if(!hasPermission){
        return;
    }
    const location =  await getCurrentPositionAsync();
    console.log("User Location", location);
        setPickedLocation({
            lat: location.coords.latitude,
            long: location.coords.longitude
        });
    }
    function pickOnMapHandler(){
        navigation.navigate('MapScreen');
    }

let locationPreview = <Text>No locations picked yet!</Text>

if(pickedLocation){
    locationPreview = <MapView style={styles.map_preview} initialRegion={{
        latitude: pickedLocation.lat,
        longitude: pickedLocation.lang,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02
    }}>
    <Marker
        coordinate={{
            latitude: pickedLocation.lat,
            longitude: pickedLocation.lang,
        }}
    />
</MapView>
}
    return (
        <View>
            <View style={styles.map_preview}>
                 {locationPreview}
            </View>
            <View style={styles.actions}>
                <CustomButton icon={'location'} 
                    onButtonPress={getLocationHandler}>
                     Locate User
                </CustomButton>
                <CustomButton icon={'map'}
                     onButtonPress={pickOnMapHandler}>
                        Pick on Map 
                </CustomButton>
            </View>
        </View>
    );
}

export default LocationPicker;

const styles = StyleSheet.create({
        map_preview:{
            width: '100%',
            height: 200,
            marginVertical: 7,
            justifyContent:'center',
            alignItems:'center',
            backgroundColor: Colors.primary100,
            borderRadius: 3,
        },
        actions:{
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems:'center'
        }
});