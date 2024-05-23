import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Image, Platform } from 'react-native';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';

export default function App() {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [imageUri, setImageUri] = useState(null);

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === 'granted');

      if (Platform.OS === 'android') {
        const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();
        setHasMediaLibraryPermission(mediaLibraryPermission.status === 'granted');
      } else {
        setHasMediaLibraryPermission(true); // Assume iOS has permission by default
      }
    })();
  }, []);

  const takePicture = async () => {
    if (camera && hasMediaLibraryPermission) {
      const photo = await camera.takePictureAsync();
      savePicture(photo.uri);
    }
  };

  const savePicture = async (uri) => {
    const asset = await MediaLibrary.createAssetAsync(uri);
    setImageUri(asset.uri);
  };

  if (hasCameraPermission === null || hasMediaLibraryPermission === null) {
    return <View />;
  }
  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }
  if (hasMediaLibraryPermission === false) {
    return <Text>No access to media library</Text>;
  }
  return (
    <View style={styles.container}>
      <Camera
        ref={ref => setCamera(ref)}
        style={styles.camera}
        type={Camera.Constants.Type.back}
      />
      {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
      <Button title="Take Picture" onPress={takePicture} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  camera: {
    width: '100%',
    height: '70%',
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
  },
});