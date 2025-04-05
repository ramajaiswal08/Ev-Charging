import { View, FlatList, StyleSheet, TouchableOpacity, Text } from 'react-native';
import React from 'react';
import PlaceItem from './PlaceItem';

export default function PlaceListView({ placeList = [], onStationClick }) {
  console.log("📋 Rendering PlaceListView with:", placeList);

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => onStationClick(item)} style={styles.itemWrapper}>
      <PlaceItem place={item} />
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1 }}>
      {placeList.length === 0 ? (
        <Text style={styles.emptyText}>No places found</Text>
      ) : (
        <FlatList
          data={placeList}
          horizontal={true}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  itemWrapper: {
    marginRight: 10,
  },
  emptyText: {
    padding: 10,
    textAlign: 'center',
    fontSize: 16,
    color: 'gray',
  },
});
