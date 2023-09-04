import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
} from "react-native";
import { EvilIcons, Feather } from "@expo/vector-icons";
import {
  MediaTypeOptions,
  launchImageLibraryAsync,
  requestMediaLibraryPermissionsAsync,
} from "expo-image-picker";

import PostList from "../components/PostList";
import Title from "../components/Title";

import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase/config";
import { selectUserPosts } from "../redux/selectors";
import { logout, update } from "../redux/auth/authOperations";
import { defaultAvatar } from "../constants/defaultAvatar";
import { uriToBlob } from "../helpers/uriToBlob";

export default ProfileScreen = () => {
  const [hasGalleryPermission, setHasGalleryPermission] = useState(false);
  const { name, photoURL } = useSelector((state) => state.auth.user);

  const userPosts = useSelector(selectUserPosts);

  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(logout());
  };

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

    const avatarURL = await uploadPhoto(assets[0].uri);

    dispatch(update({ photoURL: avatarURL }));
  };

  const uploadPhoto = async (avatar) => {
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

  return (
    <ImageBackground
      source={require("../assets/images/register-bg.jpg")}
      resizeMode="cover"
      style={styles.image}
    >
      <View style={styles.content}>
        <View style={styles.avatarWrap}>
          <Image
            style={styles.avatar}
            source={{ uri: photoURL ? photoURL : defaultAvatar }}
          />
          <TouchableOpacity
            style={styles.plus}
            activeOpacity={0.8}
            onPress={pickImage}
          >
            <EvilIcons name="plus" size={32} color="#FF6C00" />
          </TouchableOpacity>
        </View>
        <Feather
          style={styles.logout}
          name="log-out"
          size={24}
          color="#BDBDBD"
          onPress={onLogout}
        />

        <Title title={name} />
        <PostList
          posts={userPosts}
          defaultText="You haven't published any post yet"
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: "flex-end",
  },
  content: {
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: "#ffffff",
    paddingHorizontal: 16,
    paddingTop: 92,
    fontFamily: "Roboto-Regular",
    flex: 0.8,
  },
  avatarWrap: {
    position: "absolute",
    left: "50%",
  },
  logout: {
    position: "absolute",
    top: 22,
    right: 16,
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
});
