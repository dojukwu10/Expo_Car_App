import React, { useEffect, useState, useRef } from 'react';
import { View, Image, StyleSheet, Platform, Button, Text } from 'react-native';
import { Camera } from 'expo-camera';
import CameraButton from '../Components/CameraButton';
import * as MediaLibrary from 'expo-media-library';


function CameraPage() {
  const [cameraRef, setCameraRef] = useState(null);
  const [hasCamPermission, setHasCamPermission] = useState(null);
  const [imageUri, setImageUri] = useState(null);
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState(null);
  const [pictureTaken, setPictureTaken] = useState(false);

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      setHasCamPermission(cameraPermission.status === 'granted');

      if (Platform.OS === 'android') {
        const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();
        setHasMediaLibraryPermission(mediaLibraryPermission.status === 'granted');
      } else {
        setHasMediaLibraryPermission(true); // Assume iOS has permission by default
      }
    })();
  }, []);

  const retakePhoto = async () => {
    setPictureTaken(false);
    setImageUri(null);
  }

  const snapPhoto = async () => {
    if (cameraRef) {
      try {
        const photo = await cameraRef.takePictureAsync({skipProcessing: true});
        saveToGallery(photo.uri);
      } catch (error) {
        console.log('Error taking picture:', error);
      }
    }
  };

  const saveToGallery = async (uri) => {
    try {
      const asset = await MediaLibrary.createAssetAsync(uri);
      setImageUri(asset.uri);
      setPictureTaken(true);
    } catch (error) {
      console.log('Error saving to gallery:', error);
    }
  };


  if(!pictureTaken){
  return (
    <View style={{ flex: 1 }}>
      <Camera 
        style={{ flex: 1 }} 
        type={Camera.Constants.Type.back} 
        ref={ref => setCameraRef(ref)}
      />
  
      <View  style={styles.buttonContainer}>
      <Button title="Take Picture" onPress={snapPhoto}  style={styles.button} />
      </View>      
    </View>
  );
}
else{
  return (
    <View style={{ flex: 1 }}>
  
      {imageUri && <Image source={{ uri: imageUri }} style={{flex: 1}} />}
      <View  style={styles.buttonContainerPicTaken}>
      <Button title="retake" onPress={() => retakePhoto()}  style={styles.button} />
      <View style={styles.space} />
      <Button title="identify" onPress={snapPhoto}  style={styles.button} />
      </View>      
    </View>
  );

}
}

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
  },

  buttonContainer: {
    height: 65,
    color:'blue',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonContainerPicTaken: {
    flexDirection:"row",
    height: 65,
    color:'blue',
    justifyContent: 'center',
    alignItems: 'center'
  },

  space: {
    width: 50
  }


});

export default CameraPage;
