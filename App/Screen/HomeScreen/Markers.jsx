import React from "react";
import { View, Image } from "react-native";
import { Marker } from "react-native-maps";

export default function Markers({ place }) {
  if (!place?.location?.latitude || !place?.location?.longitude){
    console.warn("⚠️ Invalid marker location:", place);
    return null;
  } 

  return (
    <Marker
      coordinate={{
        latitude: place.location.latitude,
        longitude: place.location.longitude,
      }}
      title={place.name || "EV Station"}
      description={place.vicinity || ""}
    >
      <View style={{ alignItems: "center" }}>
        <Image
          source={require("../../../assets/images/car-maker.png")} // Replace with your icon
          style={{ width: 40, height: 40, resizeMode: "contain" }}
        />
      </View>
    </Marker>
  );
}
