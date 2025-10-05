// ReviewForm component for submitting movie reviews

import React, { useState,useContext } from "react";
import { View, Text, TextInput, StyleSheet, Alert,TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { AuthContext } from "../context/AuthContext";

function ReviewForm({ movieId, onReviewSubmitted }) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const user = useContext(AuthContext).user?.username || "Anonymous";
  const { token } = useContext(AuthContext);

  const handleSubmit = async () => {
    if (!token) {
      Alert.alert("You must be logged in to submit a review.");
      return;
    }
    try {
      const response = await fetch(
        "https://movie-review-c8di.onrender.com/api/reviews",
        {
          credentials: "include",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ movieId, user, rating, comment }),
        }
      );
      if (response.ok) {
        setRating(5);
        setComment("");
        if (onReviewSubmitted) onReviewSubmitted();
      } else {
        Alert.alert("Failed to submit review");
      }
    } catch (error) {
      Alert.alert("Error submitting review:", error.message);
    }
  };

  return (
    <View style={styles.form}>
      <Text style={styles.label}>Rating</Text>
      <Picker
        selectedValue={rating}
        style={styles.picker}
        enabled={!!token}
        onValueChange={(value) => setRating(Number(value))}
      >
        {[1, 2, 3, 4, 5].map((num) => (
          <Picker.Item key={num} label={num.toString()} value={num} />
        ))}
      </Picker>
      <Text style={styles.label}>Comment:</Text>
      <TextInput
        placeholder={token ? "Write your review here..." : "Log in to write a review"}
        placeholderTextColor={"#aaa"}
        value={comment}
        editable={!!token}
        onChangeText={setComment}
        style={styles.textarea}
        multiline
        numberOfLines={4}
      />
      <TouchableOpacity
        onPress={handleSubmit}
        style={styles.submitButton}
        disabled={!token}
      >
        <Text style={{ color: "black", fontSize: 16, fontWeight: "bold" }}>Submit Review</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    padding: 16,
    backgroundColor: "#222",
    borderRadius: 12,
    width: 300,
    height: 400,
    marginVertical: 24
  },
  submitButton: {
    backgroundColor: "#FFD700",
    padding: 10,
    alignItems: "center",
    borderRadius: 8,
    width: '100%',
  },
  label: {
    color: "white",
    fontWeight: "bold",
    marginBottom: 8,
    fontSize: 16,
  },
  picker: {
    backgroundColor: "#444",
    color: "white",
    marginBottom: 16,
  },
  textarea: {
    backgroundColor: "#444",
    color: "white",
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
    minHeight: 160,
    fontSize: 15,
    textAlignVertical: "top",
  },
});

export default ReviewForm;
