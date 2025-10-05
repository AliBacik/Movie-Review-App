import React, { useState, useEffect } from "react";
import { View, FlatList, StyleSheet, Text } from "react-native";
import Card from "../../components/Card";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Snackbar } from "react-native-paper";
import { useSelector } from "react-redux";

export default function HomeScreen() {

  const searchResults = useSelector((state) => state.search.results);
  const [movies, setMovies] = useState([]);
  const navigation = useNavigation();
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const route = useRoute();

  const fetchMovies = async () => {
    try {
      const response = await fetch(
        "https://api.imdbapi.dev/titles?types=MOVIE"
      );
      const data = await response.json();
      setMovies(data.titles || []);

    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  useEffect(() => {
    if (route.params?.showLoginSuccess) {
      setSnackbarVisible(true);
      navigation.setParams({ showLoginSuccess: undefined }); // Reset the params
    }
    fetchMovies();
  }, [route.params]);

  //const moviesToRender = foundMovies.length > 0 ? foundMovies : movies;

  return (
    <View style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={searchResults.length > 0 ? searchResults : movies}
        keyExtractor={(item,index) => item.id ? item.id.toString() : index.toString()}
        renderItem={({ item }) => (
          <Card
            movie={item}
            onPress={() => navigation.navigate("MovieDetail", { movie: item })}
          />
        )}
      />
      <View style={styles.snackbar}>
        <Snackbar
          visible={snackbarVisible}
          onDismiss={() => setSnackbarVisible(false)}
          duration={3000}
          style={{ borderRadius: 15, backgroundColor: "#333" }}
        >
          <Text style={{ color: "white", textAlign: "center" }}>Login Successful!</Text>
        </Snackbar>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
    padding: 10,
  },
  snackbar: {
    position: "absolute",
    top: 120,
    left: 0,
    right: 0,
    zIndex: 999,
  },
});
