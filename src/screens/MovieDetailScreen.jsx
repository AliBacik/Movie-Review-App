import React, { useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import ReviewForm from "../../components/ReviewForm";
import ReviewList from "../../components/ReviewList";
import Chat from "../../components/chat/Chat";
import DetailsCard from "../../components/DetailsCard";

export default function MovieDetailScreen({ route, navigation }) {
  const [reviews, setReviews] = React.useState([]);
  const [refreshReviews, setRefreshReviews] = React.useState(false);
  const [specificMovie, setSpecificMovie] = React.useState("");

  useEffect(() => {
    let isMounted = true;
    const fetchReviews = async (id) => {

      try {

        const response = await fetch(
          `https://movie-review-c8di.onrender.com/api/reviews/movie/${id}`,
          { credentials: "include" }
        );

        const movieResponse = await fetch(
          `https://api.imdbapi.dev/titles/${id}`
        );

        const movieData = await movieResponse.json();  
        const data = await response.json();

        setSpecificMovie(movieData);
        setReviews(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to fetch reviews:", err);
      }
    };
    fetchReviews(route.params?.movie.id);
    return () => {
      isMounted = false;
    };
  }, [route.params?.movie.id, refreshReviews]);

  const { movie } = route.params;
  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ alignItems: "center" }}
      >
        <Ionicons
          style={styles.Icon}
          name="chevron-back-circle"
          size={40}
          color="white"
          onPress={() => {
            if (navigation.canGoBack()) {
            }
            navigation.goBack();
          }}
        />
        <DetailsCard movie={movie} specificMovie={specificMovie} />
        <Text style={styles.plotText}>{specificMovie?.plot ? specificMovie?.plot : "No information found related to this movie."}</Text>
        <ReviewForm
          movieId={movie.id}
          onReviewSubmitted={() => setRefreshReviews(!refreshReviews)}
        />
        <Chat movieId={movie.id} />
        <ReviewList reviews={reviews} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "black",
    justifyContent: "start",
    alignItems: "center",
  },
  Icon: {
    position: "absolute",
    top: -6,
    left: -1,
    marginBottom: 10,
    marginTop: 10,
  },
  plotText: {
    color: "white",
    backgroundColor: "#222",
    padding: 10,
    textAlign: "center",
    borderRadius: 12,
    fontSize: 16,
    marginTop: 10,
  },
});
