import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import {
  requestMediaLibraryPermissionsAsync,
  launchImageLibraryAsync,
  MediaTypeOptions,
} from "expo-image-picker";

import { register } from "../redux/auth/authOperations";
import { uriToBlob } from "../helpers/uriToBlob";

import Title from "../components/Title";
import StartInput from "../components/StartInput";
import Button from "../components/Button";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase/config";

export default function RegistrationScreen({ setIsKeyboardShown }) {
  const [hasGalleryPermission, setHasGalleryPermission] = useState(false);

  const [avatar, setAvatar] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const { status } = await requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(status === "granted");
    })();
  }, []);

  const pickImage = async () => {
    const { assets, canceled } = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
    });

    if (canceled) return;

    setAvatar(assets[0].uri);
  };

  const uploadPhoto = async () => {
    try {
      const file = await uriToBlob(avatar);

      const avatarId = avatar.slice(-41, -5);
      const imgRef = ref(storage, `avatars/${avatarId}`);

      await uploadBytes(imgRef, file);

      return await getDownloadURL(imgRef);
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async () => {
    const avatarURL = await uploadPhoto();

    const userData = { name, email, password, avatarURL };
    dispatch(register(userData));
  };

  return (
    <>
      <View style={styles.avatarWrap}>
        <Image style={styles.avatar} source={{ uri: avatar }} />
        <TouchableOpacity
          style={styles.plus}
          activeOpacity={0.8}
          onPress={pickImage}
        >
          <EvilIcons name="plus" size={32} color="#FF6C00" />
        </TouchableOpacity>
      </View>
      <Title title="Реєстрація" />
      <View style={styles.inputsWrap}>
        <StartInput
          placeholder="Логін"
          setIsKeyboardShown={setIsKeyboardShown}
          onChangeText={setName}
        />
        <StartInput
          placeholder="Адреса електронної пошти"
          setIsKeyboardShown={setIsKeyboardShown}
          onChangeText={setEmail}
        />
        <StartInput
          placeholder="Пароль"
          isPassword
          setIsKeyboardShown={setIsKeyboardShown}
          onChangeText={setPassword}
        />
      </View>
      <Button btnText="Зареєстуватися" onPress={onSubmit} />
      <Text style={styles.navText}>
        Вже є акаунт?{" "}
        <Text style={styles.link} onPress={() => navigation.navigate("Login")}>
          Увійти
        </Text>
      </Text>
    </>
  );
}

const styles = StyleSheet.create({
  avatarWrap: {
    position: "absolute",
    left: "50%",
  },
  avatar: {
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
    transform: [{ translateX: -44 }, { translateY: -60 }],
  },
  plus: {
    position: "absolute",
    transform: [{ translateX: 60 }, { translateY: 21 }],
  },
  inputsWrap: {
    marginBottom: 43,
    marginTop: 32,
    gap: 16,
  },
  navText: {
    color: "#1B4371",
    textAlign: "center",
    fontSize: 16,
    marginTop: 16,
  },
  link: {
    textDecorationLine: "underline",
  },
});
