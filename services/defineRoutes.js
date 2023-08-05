import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { SharedStartScreenWrap } from "../screens/SharedStartScreenWrap";
import HomeScreen from "../screens/Home";
import PostsScreen from "../screens/PostsScreen";
import CreatePostsScreen from "../screens/CreatePostsScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { Feather } from "@expo/vector-icons";
import TabBar from "../components/TabBar";
import Header from "../components/Header";

const AuthStack = createStackNavigator();
const MainTab = createBottomTabNavigator();

export default defineRoutes = (isAuth = false) => {
  if (!isAuth) {
    return (
      <AuthStack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
        }}
      >
        <AuthStack.Screen name="Register" component={SharedStartScreenWrap} />
        <AuthStack.Screen name="Login">
          {() => <SharedStartScreenWrap isLogin />}
        </AuthStack.Screen>
      </AuthStack.Navigator>
    );
  }

  return (
    <MainTab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
      }}
      tabBar={() => <TabBar />}
    >
      {/* <MainTab.Screen name="Home" component={Home} /> */}
      <MainTab.Screen
        name="Posts"
        component={PostsScreen}
        options={{
          title: "Публікації",
          header: ({ route, options }) => (
            <Header route={route} options={options} />
          ),
        }}
        tabBarButton={() => (
          <TouchableOpacity>
            <Feather name="log-out" size={24} color="#BDBDBD" />
          </TouchableOpacity>
        )}
      />
      <MainTab.Screen
        name="Create"
        component={CreatePostsScreen}
        options={{
          title: "Створити публікацію",
          header: ({ route, options }) => (
            <Header route={route} options={options} />
          ),
        }}
      />
      <MainTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
        }}
      />
    </MainTab.Navigator>
  );
};
