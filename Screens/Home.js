import PostsScreen from "./PostsScreen";
import CommentsScreen from "./CommentsScreen";
import MapScreen from "./MapScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { useSelector } from "react-redux";

const NestedScreen = createStackNavigator();

export default Home = () => {
  const state = useSelector((state) => state);
  console.log("🚀 ~ file: Home.js:12 ~ state:", state);

  return (
    <NestedScreen.Navigator>
      <NestedScreen.Screen
        name="Posts"
        component={PostsScreen}
        options={{
          title: "Публікації",
          header: ({ route, options }) => (
            <Header route={route} options={options} />
          ),
        }}
      />
      <NestedScreen.Screen
        name="Comments"
        component={CommentsScreen}
        options={{
          title: "Коментарі",
          header: ({ route, options }) => (
            <Header route={route} options={options} />
          ),
        }}
      />
      <NestedScreen.Screen
        name="Map"
        component={MapScreen}
        options={{
          title: "Карта",
          header: ({ route, options }) => (
            <Header route={route} options={options} />
          ),
        }}
      />
    </NestedScreen.Navigator>
  );
};
