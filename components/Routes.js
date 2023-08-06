import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { SharedStartScreenWrap } from "../screens/SharedStartScreenWrap";
import HomeScreen from "../screens/Home";
import PostsScreen from "../screens/PostsScreen";
import CreatePostsScreen from "../screens/CreatePostsScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { Feather } from "@expo/vector-icons";
import TabBar from "./TabBar";
import Header from "./Header";
import { useState } from "react";

const AuthStack = createStackNavigator();
const MainTab = createBottomTabNavigator();

export default Routes = () => {
  const [isAuth, setIsAuth] = useState(true);

  if (!isAuth) {
    return (
      <AuthStack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
        }}
      >
        <AuthStack.Screen name="Register">
          {() => <SharedStartScreenWrap setIsAuth={setIsAuth} />}
        </AuthStack.Screen>
        <AuthStack.Screen name="Login">
          {() => <SharedStartScreenWrap isLogin setIsAuth={setIsAuth} />}
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
            <Header route={route} options={options} setIsAuth={setIsAuth} />
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
