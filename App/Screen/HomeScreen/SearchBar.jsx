import { View, Text, TextInput, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import Color from "../../utils/Color";
import { Ionicons } from "@expo/vector-icons";

export default function EVSearch({ searchedLocation }) {
  const [query, setQuery] = useState("");
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchPlaces = async (text) => {
    setQuery(text);

    if (text.length < 3) {
      setPlaces([]);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(text)}`,
        {
          headers: {
            "User-Agent": "MyEVApp/1.0 (ramajaiswal829111@gmail.com)",
          },
        }
      );
      const data = await response.json();
      setPlaces(data);
    } catch (error) {
      console.error("❌ Error fetching places:", error);
    }
    setLoading(false);
  };

  const handleSelectPlace = (item) => {
    setQuery(item.display_name);
    setPlaces([]);
    searchedLocation({
      latitude: parseFloat(item.lat),
      longitude: parseFloat(item.lon),
    });
  };

  return (
    <View style={{ padding: 10 }}>
      <View style={{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: Color.WHITE,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: "#ccc",
        paddingHorizontal: 10,
      }}>
        <Ionicons name="location-sharp" size={24} color={Color.GRAY} style={{ marginRight: 10 }} />
        <TextInput
          placeholder="Search EV Charging Station"
          value={query}
          onChangeText={searchPlaces}
          style={{ flex: 1, height: 50, fontSize: 16 }}
        />
      </View>

      {loading && <ActivityIndicator size="large" color="blue" style={{ marginTop: 10 }} />}

      <FlatList
        data={places}
        keyExtractor={(item) => item.place_id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: "#ddd" }}
            onPress={() => handleSelectPlace(item)}
          >
            <Text style={{ fontSize: 16 }}>{item.display_name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
