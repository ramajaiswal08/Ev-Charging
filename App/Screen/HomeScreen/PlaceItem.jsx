import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import React, { useEffect, useState } from 'react';

const fetchUnsplashPhoto = async (placeName) => {
  const apiKey = "OPEHsyAToqS1zKwn_JfDRKyAOWkkK4eaSH8hisrmWxY"; // Replace with your Unsplash API key
  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(placeName)}&client_id=${apiKey}`
    );
    const data = await response.json();

    if (data.results.length > 0) {
      return data.results[0].urls.small; // Returns the first image URL
    } else {
      return "https://via.placeholder.com/150"; // Default fallback image
    }
  } catch (error) {
    console.error("Error fetching Unsplash photo:", error);
    return "https://via.placeholder.com/150"; // Return fallback image on error
  }
};

export default function PlaceItem({ place }) {
  const [photoUrl, setPhotoUrl] = useState("https://via.placeholder.com/150"); // Default image

  useEffect(() => {
    const getPhoto = async () => {
      const photo = await fetchUnsplashPhoto(place.name);
      setPhotoUrl(photo);
    };

    getPhoto();
  }, [place.name]);

  return (
    <View style={styles.container}>
      <Image source={{ uri: photoUrl }} style={styles.image} />
      <Text style={styles.title}>{place.name}</Text>
      <Text style={styles.address}>{place.address}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width * 0.9,
    backgroundColor: 'white',
    padding: 10,
    marginBottom: 5,
    borderRadius: 5,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  image: {
    width: '100%',
    borderRadius: 10,
    height: 130,
  },
  title: {
    fontSize: 16,
    fontFamily: 'outfit-medium',
  },
  address: {
    fontSize: 14,
    color: 'gray',
    fontFamily: 'outfit',
  },
});
