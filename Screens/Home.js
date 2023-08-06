import PostsScreen from "./PostsScreen";
import CommentsScreen from "./CommentsScreen";
import MapScreen from "./MapScreen";
import { createStackNavigator } from "@react-navigation/stack";

const NestedScreen = createStackNavigator();

export default Home = ({ setIsAuth }) => {
  return (
    <NestedScreen.Navigator>
      <NestedScreen.Screen
        name="Posts"
        component={PostsScreen}
        options={{
          title: "Публікації",
          header: ({ route, options }) => (
            <Header route={route} options={options} setIsAuth={setIsAuth} />
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
