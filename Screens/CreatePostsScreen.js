import { Feather } from "@expo/vector-icons";
import * as Location from "expo-location";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";

import Button from "../components/Button";
import CameraWrap from "../components/CameraWrap";
import { useNavigation } from "@react-navigation/native";
import { ref, uploadBytes, uploadBytesResumable } from "firebase/storage";
import { storage } from "../firebase/config";

export default CreatePostsScreen = () => {
  const [hasLocPermission, setHasLocPermission] = useState(null);

  const [photo, setPhoto] = useState("");
  const [name, setName] = useState("");
  const [photoLocation, setPhotoLocation] = useState("");

  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      console.log("🚀 ~ file: CreatePostsScreen.js:20 ~ status:", status);

      setHasLocPermission(status === "granted");
    })();
  }, []);

  const uriToBlob = (uri) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        // return the blob
        resolve(xhr.response);
      };
      xhr.onerror = function () {
        reject(new Error("uriToBlob failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);

      xhr.send(null);
    });
  };

  const uploadPhoto = async () => {
    try {
      const file = await uriToBlob(photo);

      const storageRef = ref(storage, `postImages/${Date.now().toString}`);

      uploadBytes(storageRef, file)
        .then((snapshot) => {
          console.log("Uploaded a blob or file!");
        })
        .catch((error) => console.error(error));
    } catch (error) {
      console.log(error);
    }
  };

  const checkIfDisabled = () => {
    return photo && name && photoLocation ? false : true;
  };

  const resetState = () => {
    setPhoto("");
    setName("");
    setPhotoLocation("");
  };

  const onPost = async () => {
    // if (hasLocPermission) {
    const location = await Location.getCurrentPositionAsync({});

    const coordinates = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };

    const postData = {
      name,
      photoURI: photo,
      location: photoLocation,
      coordinates,
    };

    uploadPhoto();

    navigation.navigate("Posts", postData);

    resetState();
    // }
  };

  return (
    <View style={styles.container}>
      <CameraWrap
        photo={photo}
        setPhoto={setPhoto}
        checkIfDisabled={checkIfDisabled}
      />
      <Text style={styles.text}>Завантажте фото</Text>
      <View style={styles.inputWrap}>
        <View style={styles.input}>
          <TextInput
            style={{
              ...styles.inputText,
              fontFamily: name ? "Roboto-Medium" : "Roboto-Regular",
            }}
            placeholder="Назва..."
            value={name}
            onChangeText={setName}
          />
        </View>
        <View style={{ ...styles.input, marginBottom: 16 }}>
          <Feather name="map-pin" size={24} color="#BDBDBD" />
          <TextInput
            style={styles.inputText}
            placeholder="Місцевість..."
            value={photoLocation}
            onChangeText={setPhotoLocation}
          />
        </View>
      </View>
      <Button
        btnText="Опубліковати"
        onPress={onPost}
        isDisabled={checkIfDisabled()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 32,
    backgroundColor: "#ffffff",
    flex: 1,
  },
  camera: {
    height: 240,
    width: "100%",
    borderRadius: 8,
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
    // backgroundSize: "cover",
  },
  cameraBtn: {
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#BDBDBD",
    fontSize: 16,
  },
  inputText: {
    color: "#212121",
    fontSize: 16,
    height: "100%",
    width: "100%",
  },
  inputWrap: {
    marginVertical: 32,
  },
  input: {
    height: 50,
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
  },
});
