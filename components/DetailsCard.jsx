import { View, Text, StyleSheet, Image } from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import React from "react";

export default function DetailsCard({ movie, specificMovie }) {
  return (
    <View style={styles.rootContainer}>

      <View style={styles.card}>
        <Image
          source={{ uri: movie?.primaryImage?.url }}
          style={styles.Image}
          resizeMode="cover"
        />
        <Text numberOfLines={1} style={styles.title}>
          {movie?.originalTitle}
        </Text>
      </View>

      <View style={styles.infoContainer}>
        <View
          style={{ flexDirection: "row", alignItems: "flex-start", gap: 2 }}
        >
          <Text style={styles.genre}>
            {specificMovie?.genres?.[0] ? specificMovie?.genres?.[0] : "N/A"}
          </Text>
          <Text style={styles.type}>
            {specificMovie?.type ? specificMovie?.type : "N/A"}
          </Text>
        </View>

        <FontAwesome5 name="imdb" color="white" size={32} style={styles.icon} />
        <Text style={styles.rating}>
          {specificMovie?.rating?.aggregateRating
            ? specificMovie?.rating?.aggregateRating
            : "N/A"}
        </Text>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
   rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
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
    height: 350,
    borderRadius: 12,
  },
  infoContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    width: "100%",
    marginTop: 8,
    marginBottom: 10,
  },
  rating: {
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
  type: {
    backgroundColor: "gray",
    color: "white",
    padding: 4,
    borderRadius: 4,
    fontWeight: "bold",
    textAlign: "center",
    textTransform: "uppercase",
  },
  icon: {
    position: "absolute",
    right: 45,
    bottom: -3.5,
    zIndex: 1,
  },
});
