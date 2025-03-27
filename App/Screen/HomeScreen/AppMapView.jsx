import { View, Text, Platform } from "react-native";
import React from "react";

let MapView;

if (Platform.OS !== "web") {
  MapView = require("react-native-maps").default;
}

export default function AppMapView() {
  return (
    <View style={{ flex: 1 }}>
      {Platform.OS === "web" ? (
        <Text>Google Maps is not supported on web.</Text>
      ) : (
        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      )}
    </View>
  );
}
