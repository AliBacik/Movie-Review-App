import React, { useContext } from "react";
import HomeScreen from "../screens/HomeScreen";
import MovieDetailScreen from "../screens/MovieDetailScreen";
import Login from "../screens/Login";
import Searchbar from "../../components/Searchbar";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Logout from "../screens/Logout";
import { AuthContext } from "../../context/AuthContext";

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{ contentStyle: { backgroundColor: "#000" } }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MovieDetail"
        component={MovieDetailScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default function RootNavigator() {
  const { token } = useContext(AuthContext);
  const { user } = useContext(AuthContext);

  return (
    <Drawer.Navigator
      screenOptions={{
        headerTintColor: "white",
        headerStyle: { backgroundColor: "black" },
        drawerContentStyle: { backgroundColor: "black" },
        drawerInactiveTintColor: "white",
        drawerActiveTintColor: "white",
        drawerActiveBackgroundColor: "#444",
      }}
    >
      <Drawer.Screen
        name="Main"
        component={HomeStack}
        options={({ route }) => ({
          headerRight: () => <Searchbar />,
          headerTitle: user?.username ? user.username : "",
          headerTitleStyle: { fontSize: 15, color: "white"},
        })}
      />
      {!token && <Drawer.Screen name="Login" component={Login} />}
      {token && <Drawer.Screen name="Logout" component={Logout} />}
    </Drawer.Navigator>
  );
}
