import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import Button from "../components/Button";
import { Camera } from "expo-camera";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";

export default CreatePostsScreen = () => {
  const [isName, setIsName] = useState(false);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");

  const takePhoto = () => {
    console.log("takePhoto");
  };

  const onNameChange = (value) => {
    if (!value) {
      setIsName(false);
    } else if (value && !isName) {
      setIsName(true);
    }

    setName(value);
  };

  const onLocationChange = (value) => {
    setLocation(value);
  };

  return (
    <View style={styles.container}>
      <View style={styles.camera}>
        <TouchableOpacity
          style={styles.cameraBtn}
          onPress={takePhoto}
          activeOpacity={0.8}
        >
          <MaterialIcons name="photo-camera" size={24} color="#BDBDBD" />
        </TouchableOpacity>
      </View>
      <Text style={styles.text}>Завантажте фото</Text>
      <View style={styles.inputWrap}>
        <View style={styles.input}>
          <TextInput
            style={{
              ...styles.inputText,
              fontFamily: isName ? "Roboto-Medium" : "Roboto-Regular",
            }}
            placeholder="Назва..."
            onChange={() => setIsName(true)}
            value={name}
            onChangeText={onNameChange}
          />
        </View>
        <View style={{ ...styles.input, marginBottom: 16 }}>
          <Feather name="map-pin" size={24} color="#BDBDBD" />
          <TextInput
            style={styles.inputText}
            placeholder="Місцевість..."
            value={location}
            onChangeText={onLocationChange}
          />
        </View>
      </View>
      <Button btnText="Опубліковати" isDisabled />
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
    borderRadius: 8,
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
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
