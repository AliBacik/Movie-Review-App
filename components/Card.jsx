import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import React from "react";

export default function Card({ movie, onPress, specificMovie }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.card}>
        <Image
          source={{ uri: movie?.primaryImage?.url }}
          style={styles.Image}
          resizeMode="cover"
        />
        <Text numberOfLines={1} style={styles.title}>{movie?.originalTitle}</Text>
        <View style={styles.infoContainer}>
          <Text style={styles.genre}>{movie?.genres?.[0] ? movie?.genres?.[0] : movie?.type}</Text>
          <FontAwesome5 name="imdb" color="white" size={32} style={styles.icon} />
          <Text style={styles.rating}>
            {movie?.rating?.aggregateRating ? movie?.rating?.aggregateRating : specificMovie?.rating?.aggregateRating}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#444",
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
    width: 275,
    height: 400,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  title: {
    backgroundColor: "#222",
    padding: 6,
    borderRadius: 12,
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 8,
    textAlign: "center",
  },
  Image: {
    borderWidth: 2,
    borderColor: "white",
    resizeMode: "cover",
    width: 270,
    height: 300,
    borderRadius: 12,
  },
  infoContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    width: "100%",
    marginTop: 8,
    marginBottom: 10
  },
  rating:{
    backgroundColor: "gold",
    width: 40,
    textAlign: "center",
    padding: 4,
    borderRadius: 4,
    fontWeight: "bold",
  },
  genre: {
    backgroundColor: "gray",
    color: "white",
    padding: 4,
    borderRadius: 4,
    fontWeight: "bold",
    textAlign: "center",
    textTransform: "uppercase",
  },
  icon:{
    position: "absolute",
    right: 45,
    bottom: -3,
    zIndex: 1,
  }
});
