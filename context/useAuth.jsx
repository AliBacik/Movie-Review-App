import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import AsyncStorage from '@react-native-async-storage/async-storage';

export function AuthProvider({ children }) {

  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadAuth = async () => {
      try {
        const storedToken = await AsyncStorage.getItem("token");
        const storedUser = await AsyncStorage.getItem("user");
        if (storedUser) setUser(JSON.parse(storedUser));
        if (storedToken) setToken(storedToken);
      } catch (e) {
        setUser(null);
        setToken(null);
      }
    };
    loadAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ token, setToken , user, setUser}}>
      {children}
    </AuthContext.Provider>
  );
}
