import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigation();
  const { setToken } = useContext(AuthContext);
  const { setUser } = useContext(AuthContext);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://movie-review-c8di.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        AsyncStorage.setItem("token", data.token);
        AsyncStorage.setItem("user", JSON.stringify(data.user));
        setToken(data.token);
        setUser(data.user);
        setSuccess(true);
        navigate.navigate("Main", {
          screen: "Home",
          params: { showLoginSuccess: true },
        });
        setSuccess(false);
      } else {
        setError(true);
        setTimeout(() => setError(false), 3000); // Error mesajını 3 saniye göster
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    // make a Login screen implementation with a form
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.messageContainer}>
          {success && (
            <Text style={{ color: "green", backgroundColor: "lightgreen" }}>
              Login Successful!
            </Text>
          )}
          {error && (
            <Text style={styles.errorMessage}>
              Login Failed. Please try again.
            </Text>
          )}
        </View>
        <Text style={styles.text}>Login</Text>
        <TextInput
          placeholder="Email"
          placeholderTextColor={"gray"}
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          placeholderTextColor={"gray"}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />
        <TouchableOpacity onPress={handleLogin} style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "black",
  },
  messageContainer: {
    marginBottom: 10,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    borderColor: "white",
    borderWidth: 1,
    backgroundColor: "#222",
    padding: 10,
    borderRadius: 12,
    marginBottom: 10,
    marginTop: 60,
    width: "70%",
    height: "40%",
    justifyContent: "center",
    alignItems: "center",
  },
  errorMessage: {
    color: "red",
    fontWeight: "bold",
    backgroundColor: "#444",
    padding: 6,
    borderRadius: 8,
    textAlign: "center",
  },
  input: {
    width: 250,
    height: 50,
    marginBottom: 12,
    padding: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    color: "white",
  },
  button: {
    backgroundColor: "#444",
    padding: 10,
    borderRadius: 4,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  text: {
    color: "white",
    fontWeight: "bold",
    fontSize: 24,
    marginBottom: 6,
  },
});
