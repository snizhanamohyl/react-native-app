import { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { SharedStartScreenWrap } from "../screens/SharedStartScreenWrap";
import CreatePostsScreen from "../screens/CreatePostsScreen";
import Home from "../screens/Home";
import ProfileScreen from "../screens/ProfileScreen";
import TabBar from "./TabBar";
import Header from "./Header";
import { useSelector } from "react-redux";

const AuthStack = createStackNavigator();
const MainTab = createBottomTabNavigator();

export default Routes = ({ isAuth }) => {
  // const [isAuth, setIsAuth] = useState(false);
  const user = useSelector((state) => state.auth.email);
  console.log("🚀 ~ file: Routes.js:19 ~ user:", user);

  if (!user) {
    return (
      <AuthStack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
        }}
      >
        <AuthStack.Screen name="Register">
          {() => <SharedStartScreenWrap />}
        </AuthStack.Screen>
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
      <MainTab.Screen name="Home" options={{ headerShown: false }}>
        {() => <Home />}
      </MainTab.Screen>
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
