import { MaterialIcons } from "@expo/vector-icons";
import { Camera } from "expo-camera";
import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as MediaLibrary from "expo-media-library";

export default CameraWrap = ({ photo, setPhoto, checkIfDisabled }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [isCameraReady, setIsCameraReady] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await MediaLibrary.requestPermissionsAsync();

      setHasPermission(status === "granted");
    })();
  }, []);

  const takePhoto = async () => {
    if (cameraRef) {
      const { uri } = await cameraRef.takePictureAsync();

      setPhoto(uri);
      // await MediaLibrary.createAssetAsync(uri);
    }
  };

  const unsetPhoto = () => {
    setPhoto("");
  };

  if (hasPermission === null) {
    return (
      <View style={styles.camera}>
        <TouchableOpacity
          style={styles.cameraBtn}
          onPress={takePhoto}
          activeOpacity={0.8}
        >
          <MaterialIcons name="photo-camera" size={24} color="#BDBDBD" />
        </TouchableOpacity>
      </View>
    );
  } else if (hasPermission === false) {
    return (
      <View style={styles.camera}>
        <Text>No access to camera</Text>
      </View>
    );
  } else {
    return (
      <>
        <View style={styles.cameraWarp}>
          {photo && <Image style={styles.photo} source={{ uri: photo }} />}
          {!photo && (
            <Camera
              style={styles.camera}
              ref={setCameraRef}
              onCameraReady={() => setIsCameraReady(true)}
            ></Camera>
          )}
          {isCameraReady && (
            <TouchableOpacity
              style={{
                ...styles.cameraBtn,
                backgroundColor: photo
                  ? "rgba(255, 255, 255, 0.30)"
                  : "#ffffff",
              }}
              onPress={photo ? unsetPhoto : takePhoto}
              activeOpacity={0.8}
            >
              <MaterialIcons
                name="photo-camera"
                size={24}
                color={photo ? "#ffffff" : "#BDBDBD"}
              />
            </TouchableOpacity>
          )}
        </View>
      </>
    );
  }
};
const styles = StyleSheet.create({
  cameraWarp: {
    height: 240,
    width: "100%",
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  camera: {
    height: "100%",
    width: "100%",
  },
  photo: {
    height: "100%",
    width: "100%",
  },
  cameraBtn: {
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -30 }, { translateY: -30 }],
  },
});
