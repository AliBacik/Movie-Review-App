
import AntDesign from '@expo/vector-icons/AntDesign';
import { StyleSheet, Text, View } from "react-native";

export default function ReviewList({ reviews }) {

  // Remove direct access to reviews[0].rating
  // console.log(reviews);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reviews</Text>
      {(!reviews || reviews.length === 0) ? (
        <Text style={styles.noReviews}>No reviews yet.</Text>
      ) : (
        <View>
          {reviews.map((review) => (
            review && (
              <View key={review._id} style={styles.reviewItem}>
                <Text style={styles.userInfo}>
                  {review.user?.username} • Rate: {[...Array(review.rating || 0)].map((_, i) => (
                    <AntDesign key={i} name="star" size={16} color="#FFD700" />
                  ))}
                </Text>
                <Text style={styles.date}>{review.createdAt ? new Date(review.createdAt).toLocaleDateString() : ''}</Text>
                <View style={styles.commentBox}>
                  <Text style={styles.comment}>{review.comment}</Text>
                </View>
              </View>
            )
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    maxWidth: 640,
    marginTop: 24,
    paddingHorizontal: 12,
    backgroundColor: "#222",
    borderRadius: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 8,
    color: "white",
  },
  noReviews: {
    color: "gray",
    fontStyle: "italic",
    marginBottom: 8,
  },
  reviewItem: {
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#444",
    paddingBottom: 8,
  },
  userInfo: {
    fontWeight: "600",
    color: "#FFD700",
    marginBottom: 2,
  },
  date: {
    fontSize: 12,
    color: "gray",
    marginBottom: 4,
  },
  commentBox: {
    backgroundColor: "#333",
    padding: 8,
    borderRadius: 8,
  },
  comment: {
    color: "white",
    fontSize: 15,
  },
});

