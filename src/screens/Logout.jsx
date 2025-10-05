import { View, Text } from "react-native";
import React, { useContext,useState,useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Logout() {
  const { setToken } = useContext(AuthContext);
  const { setUser } = useContext(AuthContext);
  const [success, setSuccess] = useState(false);
  const navigation = useNavigation();

  const handleLogout = async () => {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("user");
    setToken(null);
    setUser(null);
    setSuccess(true);
    setSuccess(false);
    navigation.navigate("Main", { screen: "Home" });
  };

  useEffect(() => {
    handleLogout();
  }, []);

  return (
    <View>
      <Text>Logging out...</Text>
    </View>
  );
}
