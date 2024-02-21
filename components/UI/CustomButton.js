import { Pressable,Text,StyleSheet } from "react-native";
import {Ionicons} from '@expo/vector-icons';
import { Colors } from "../../constants/Colors";


function CustomButton({onButtonPress,icon,children}){
    return(
        <Pressable style={({pressed}) => [styles.button, pressed && styles.pressed]} 
            onPress={onButtonPress}>
            <Ionicons style={styles.icon} name={icon} size={18} color={Colors.accent500}/>
            <Text style={styles.buttonText}> {children} </Text>
        </Pressable>
    );
}

export default CustomButton;


const styles = StyleSheet.create({

    button:{
        paddingHorizontal: 10,
        paddingVertical: 5,
        margin: 3,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Colors.accent500,
        flexDirection: 'row'
    },
    pressed:{
        opacity: 0.75,
    },
    icon:{
        marginRight: 5,
    },
    buttonText:{
        color:Colors.accent500
    }
});