import { TouchableOpacity, StyleSheet, View, Alert } from "react-native";
import {Entypo} from "@expo/vector-icons"

export default function CameraButton(){
  const handlePress = () => {
    // Define the action you want to perform when the button is pressed
    Alert.alert("Button Pressed");
    
  };

        return(
            <View style={styles.container}>
      <TouchableOpacity style={styles.circle} onPress={handlePress}>
                <Entypo name="camera" size={28} color={"#FFFFFF"}></Entypo>
            </TouchableOpacity>
            </View>
        )


}

const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    circle: {
      marginTop: 15,
      marginBottom: 15,
      width: 100,
      height: 75,
      borderRadius: 50,
      backgroundColor: 'blue',
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 2,
      borderColor: 'white'
    },
  });

