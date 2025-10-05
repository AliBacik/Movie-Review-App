// chat component for movie-specific chat
import React, { useState, useEffect, useContext, useRef } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { AuthContext } from "../../context/AuthContext";
import {io} from "socket.io-client";

const socket = io("https://movie-review-c8di.onrender.com");

export default function Chat({ movieId }) {
  const { user, token } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const scrollViewRef = useRef(null);

  useEffect(() => {
    if (movieId) {
      socket.emit("joinRoom", movieId);
      fetch(`https://movie-review-c8di.onrender.com/api/chat/${movieId}`)
        .then((res) => res.json())
        .then((data) => setMessages(data))
        .catch((err) => console.error("Failed to fetch messages:", err));
    }
  }, [movieId]);

  useEffect(() => {
    socket.on("newMessage", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });
    return () => {
      socket.off("newMessage");
    };
  }, []);

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim() === "" || !token) return;
    socket.emit("sendMessage", {
      movieId,
      user: user.username,
      text: newMessage,
    });
    setNewMessage("");
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Live Chat</Text>
      <ScrollView
        style={styles.scrollArea}
        ref={scrollViewRef}
        contentContainerStyle={{ paddingBottom: 10 }}
      >
        {messages.map((msg) => (
          <View key={msg._id} style={styles.messageItem}>
            <Text style={styles.user}>{msg.user}:</Text>
            <Text style={styles.text}>{msg.text}</Text>
          </View>
        ))}
      </ScrollView>
      {token && (
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            value={newMessage}
            onChangeText={setNewMessage}
            placeholder={token ? "Type your message..." : "Login to chat"}
            placeholderTextColor="#888"
            editable={!!token}
            onSubmitEditing={handleSendMessage}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={handleSendMessage}
            disabled={!token}
          >
            <Text style={styles.buttonText}>Send</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#222",
    borderRadius: 12,
    padding: 12,
    marginVertical: 12,
    width: "100%",
    maxWidth: 400,
    alignSelf: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginBottom: 8,
    textAlign: "center",
  },
  scrollArea: {
    height: 200,
    backgroundColor: "#333",
    borderRadius: 8,
    marginBottom: 8,
    padding: 6,
  },
  messageItem: {
    marginBottom: 8,
    backgroundColor: "#444",
    borderRadius: 6,
    padding: 8,
  },
  user: {
    color: "#FFD700",
    fontWeight: "bold",
    marginBottom: 2,
  },
  text: {
    color: "white",
    fontSize: 15,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  input: {
    flex: 1,
    backgroundColor: "#333",
    color: "white",
    borderRadius: 8,
    padding: 10,
    marginRight: 8,
  },
  button: {
    backgroundColor: "#FFD700",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  buttonText: {
    color: "#222",
    fontWeight: "bold",
  },
});
