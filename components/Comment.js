import { Text, View, Image, StyleSheet } from "react-native";
import { monthNames } from "../constants/months";
import { useSelector } from "react-redux";
import { defaultAvatar } from "../constants/defaultAvatar";

export default Comment = ({ comment }) => {
  const {
    comment: commentText,
    createdAt,
    user: { uid, photoURL },
  } = comment.item.data;

  const user = useSelector((state) => state.auth.user);

  const isCurrentUserComment = uid === user.uid;

  const normalizeNumber = (number) => {
    return number.toString().length === 2 ? number : `0${number}`;
  };

  const transformData = (createdAt) => {
    const date = createdAt.toDate();

    const day = normalizeNumber(date.getDate());
    const month = date.getMonth();
    const year = date.getFullYear();
    const minutes = normalizeNumber(date.getMinutes());
    const hours = normalizeNumber(date.getHours());

    return `${day} ${monthNames[month]}, ${year} | ${hours}:${minutes}`;
  };

  return (
    <View
      style={{
        ...styles.wrap,
        flexDirection: isCurrentUserComment ? "row-reverse" : "row",
      }}
    >
      <Image
        style={styles.avatar}
        source={{
          uri: photoURL ? photoURL : defaultAvatar,
        }}
      />
      <View
        style={{
          ...styles.commentInfo,
          borderTopLeftRadius: isCurrentUserComment ? 6 : 0,
          borderTopRightRadius: isCurrentUserComment ? 0 : 6,
        }}
      >
        <Text style={styles.text}>{commentText}</Text>
        <Text style={styles.time}>{transformData(createdAt)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    flexDirection: "row",
    gap: 16,
  },
  avatar: {
    borderRadius: 28,
    width: 28,
    height: 28,
    overflow: "hidden",
  },
  commentInfo: {
    borderRadius: 6,
    // borderTopLeftRadius: 0,
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    padding: 16,
  },
  text: {
    color: "#212121",
    fontFamily: "Roboto-Regular",
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 8,
  },
  time: {
    fontFamily: "Roboto-Regular",
    color: "#BDBDBD",
    fontSize: 10,
    textAlign: "right",
  },
});
