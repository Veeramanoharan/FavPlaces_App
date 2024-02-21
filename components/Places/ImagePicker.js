import { Alert, View, Image, Text, StyleSheet } from "react-native";
import { launchCameraAsync, useCameraPermissions,PermissionStatus } from "expo-image-picker";
import { useState } from "react";
import { Colors } from "../../constants/Colors";
import CustomButton from "../UI/CustomButton";



function ImagePicker(){
    const [permissionInfo,requestPermission] = useCameraPermissions();
    const [imgURI,setImageURI] = useState('');
   
    async function verifyPermissions(){
       if (permissionInfo.status === PermissionStatus.UNDETERMINED){
            const permissionResponse = await requestPermission();
            return permissionResponse.granted;
        }
        if(permissionInfo.status === PermissionStatus.DENIED){
            Alert.alert('Access Denied!, Allow camera permission to use this app.');
            return false;
        }

        return true;
    }


    async function takePicHandler(){
      const hasPermission =  await verifyPermissions();

      if(!hasPermission){
        return;
      }
        const picture = await launchCameraAsync({
            allowsEditing: true,
            aspect:[16,9],
            quality: 0.5
        });
        console.log("Picture taken through camera",picture);
        setImageURI(picture.assets[0].uri);
    }

    let imgPreview = <Text> No pics Taken yet! </Text>

    if(imgURI){
        imgPreview = <Image style={styles.img} source={{uri:imgURI}}/>;
    }

    return(
        <View>
            <View style={styles.imgPreview}>
                {imgPreview}
            </View>
            <CustomButton icon={`camera`} onButtonPress={takePicHandler}>Click a Pic</CustomButton>
        </View>
    );
}

export default ImagePicker;

const styles = StyleSheet.create({
    imgPreview:{
        width: '100%',
        height: 200,
        marginVertical: 7,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: Colors.primary100,
        borderRadius: 3,
    },
    img:{
        width:'100%',
        height:'100%',
    }
});