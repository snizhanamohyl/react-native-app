import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, View, TextInput } from "react-native";
import { Feather } from "@expo/vector-icons";
import * as Location from "expo-location";

import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../firebase/config";

import Button from "../components/Button";
import CameraWrap from "../components/CameraWrap";

import { uriToBlob } from "../helpers/uriToBlob";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

export default CreatePostsScreen = () => {
  const [hasLocPermission, setHasLocPermission] = useState(null);

  const [photo, setPhoto] = useState("");
  const [postName, setPostName] = useState("");
  const [photoLocation, setPhotoLocation] = useState("");

  const user = useSelector((state) => state.auth.user);

  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();

      setHasLocPermission(status === "granted");
    })();
  }, []);

  const checkIfDisabled = () => {
    return photo && postName && photoLocation ? false : true;
  };

  const uploadPhoto = async () => {
    try {
      const file = await uriToBlob(photo);

      const postId = Date.now().toString() + user.uid;
      const imgRef = ref(storage, `postImages/${postId}`);

      await uploadBytes(imgRef, file);

      return await getDownloadURL(imgRef);
    } catch (error) {
      console.log(error);
    }
  };

  const uploadPost = async (data) => {
    try {
      await addDoc(collection(db, "posts"), {
        ...data,
        createdAt: serverTimestamp(),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const resetState = () => {
    setPhoto("");
    setPostName("");
    setPhotoLocation("");
  };

  const getCoords = async () => {
    if (hasLocPermission) {
      const {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync({});

      return { latitude, longitude };
    }
  };

  const onPost = async () => {
    const photo = await uploadPhoto();
    const coords = await getCoords();

    const postData = {
      postName,
      photo,
      location: photoLocation,
      coords,
      userId: user.uid,
    };

    await uploadPost(postData);

    navigation.navigate("Posts", postData);

    resetState();
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
              fontFamily: postName ? "Roboto-Medium" : "Roboto-Regular",
            }}
            placeholder="Назва..."
            value={postName}
            onChangeText={setPostName}
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
