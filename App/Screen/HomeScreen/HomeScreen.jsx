
import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import AppMapView from './AppMapView';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from "./Header";
import GlobalApi from '../../utils/GlobalApi';
import SearchBar from './SearchBar';
import PlaceListView from './PlaceListView';
import * as Location from 'expo-location';
import { UserLocationContext } from "../../Context/UserLocationContext";

export default function HomeScreen() {
  const [location, setLocation] = useState(null);
  const [placeList, setPlaceList] = useState([]);
  const mapRef = useRef();

  useEffect(() => {
    if (location) {
      GetNearbyPlace();
    }
  }, [location]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }
  
      let loc = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      });
    })();
  }, []);

  const GetNearbyPlace = async () => {
    if (!location) return;
  
    try {
      const places = await GlobalApi.NewNearByPlace(
        location.latitude,
        location.longitude,
        20,
        10
      );
  
      const formattedPlaces = places.map(place => ({
        ...place,
        location: {
          latitude: place?.geometry?.location?.lat,
          longitude: place?.geometry?.location?.lng,
        }
      }));
      console.log("✅ Formatted Places:", formattedPlaces);
      setPlaceList(formattedPlaces);
    } catch (error) {
      console.error("❌ Error fetching EV stations:", error);
      setPlaceList([]);
    }
  };
  

  const handleStationSelect = (place) => {
    console.log("🔍 Station clicked:", place.name, place.location);

    if (place?.location?.latitude && place?.location?.longitude) {
      mapRef.current?.moveToLocation(place.location.latitude, place.location.longitude);
      setLocation({
        latitude: place.location.latitude,
        longitude: place.location.longitude
      });
    }
    else {
      console.log("⚠️ No location data in place");
    }
  };

  return (
    <UserLocationContext.Provider value={{ location, setLocation }}>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        <View style={{ flex: 1 }}>
          <View style={styles.headerContainer}>
            <Header />
            <SearchBar
  searchedLocation={(loc) => {
    setLocation(loc);  // Update user location state
    mapRef.current?.moveToLocation(loc.latitude, loc.longitude); // Animate map
  }}
/>

          </View>

          {placeList.length > 0 && (
            <View style={styles.stationCountBadge}>
              <Text style={styles.stationCountText}>
                🚗 {placeList.length} Stations Found
              </Text>
            </View>
          )}

          <AppMapView ref={mapRef} placeList={placeList} />

          <View style={styles.placeListContainer}>
            <PlaceListView
              placeList={placeList}
              onStationClick={handleStationSelect}
            />
          </View>
        </View>
      </SafeAreaView>
    </UserLocationContext.Provider>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    position: 'absolute',
    zIndex: 10,
    padding: 10,
    width: "100%",
  },
  stationCountBadge: {
    position: 'absolute',
    top: 130,
    alignSelf: 'center',
    backgroundColor: '#4caf50',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    zIndex: 20
  },
  stationCountText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  placeListContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    width: '100%',
    maxHeight: 250,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingBottom: 10,
    paddingHorizontal: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  }
});