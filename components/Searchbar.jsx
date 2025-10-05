import { View, TextInput, StyleSheet } from "react-native";
import React, { useState } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useDispatch } from "react-redux";
import { setResults } from "../hooks/store/searchSlice";

export default function Searchbar() {
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");

  const handleChange = async (text) => {
    setQuery(text);

    if (text.length > 2) {
      const response = await fetch(
        `https://api.imdbapi.dev/search/titles?query=${query}`
      );
      const data = await response.json();
      dispatch(setResults(data.titles || []));
    } else if (text.length < 2) {
      dispatch(setResults([]));
    }
  };

  return (
    <View style={styles.container}>
      <FontAwesome style={styles.icon} name="search" size={24} color="white" />
      <View>
        <TextInput
          placeholder="Type..."
          placeholderTextColor={"white"}
          style={styles.input}
          value={query}
          onChangeText={handleChange}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginRight: 10,
    width: 250,
    marginTop: 5,
  },
  input: {
    marginLeft: 10,
    width: 190,
    padding: 10,
    backgroundColor: "#444",
    borderRadius: 15,
    color: "white",
  },
  icon: {
    position: "absolute",
    zIndex: 1,
    left: 205,
    top: 0,
    marginTop: 8,
  },
});
