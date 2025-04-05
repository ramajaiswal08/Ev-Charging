import React, { useContext, forwardRef, useImperativeHandle, useRef } from "react";
import { View, StyleSheet, Image } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import MapViewStyle from "../../utils/MapViewStyle.json";
import { UserLocationContext } from "../../Context/UserLocationContext";

const AppMapView = forwardRef(({ placeList }, ref) => {
  const { location } = useContext(UserLocationContext);
  const mapRef = useRef(null);

  useImperativeHandle(ref, () => ({
    moveToLocation: (lat, lon) => {
      if (mapRef.current) {
        mapRef.current.animateToRegion({
          latitude: lat,
          longitude: lon,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }, 1000);
      }
    }
  }));

  return (
    <View style={styles.container}>
      {location?.latitude && (
        <MapView
          ref={mapRef}
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.0422,
            longitudeDelta: 0.0421,
          }}
          customMapStyle={MapViewStyle}
          showsUserLocation={true}
          showsMyLocationButton={true}
        >
          {placeList.map((place, index) => (
            place?.location?.latitude && place?.location?.longitude && (
              <Marker
                key={index}
                coordinate={{
                  latitude: place.location.latitude,
                  longitude: place.location.longitude
                }}
                title={place.name}
              >
              </Marker>
            )
          ))}
        </MapView>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});

export default AppMapView;
