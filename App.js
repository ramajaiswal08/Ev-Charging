import React, { useEffect, useState } from 'react';
import 'react-native-get-random-values';

import { ClerkProvider } from '@clerk/clerk-expo';
import { StyleSheet, View, Text, ActivityIndicator, StatusBar } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import * as Location from 'expo-location';
import LoginScreen from './App/Screen/LoginScreen/LoginScreen';
import TabNavigation from './App/Navigations/TabNavigation';
import { SignedIn, SignedOut } from '@clerk/clerk-expo';
import { UserLocationContext } from './App/Context/UserLocationContext';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);

  const [fontsLoaded, fontError] = useFonts({
    outfit: require('./assets/fonts/Outfit-Regular.ttf'),
    'outfit-medium': require('./assets/fonts/Outfit-SemiBold.ttf'),
    'outfit-bold': require('./assets/fonts/Outfit-Bold.ttf'),
  });

  // Ensure fonts are loaded before hiding the splash screen
  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  // ✅ Move hooks BEFORE returning anything
  useEffect(() => {
    let isMounted = true; // ✅ Fix: Prevent updating state if component unmounts

    (async () => {
      try {
        console.log('🔍 Requesting location permissions...');
        let { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== 'granted') {
          console.log('❌ Permission denied');
          if (isMounted) {
            setErrorMsg('Permission denied. Please enable location in settings.');
            setLoading(false);
          }
          return;
        }

        console.log('📍 Fetching user location...');
        await new Promise((resolve) => setTimeout(resolve, 1000));

        let loc = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        });

        if (!loc || !loc.coords) {
          throw new Error('Location not found');
        }

        console.log('✅ Location fetched:', loc.coords);
        if (isMounted) {
          setLocation(loc.coords);
          console.log(location)
        }
      } catch (error) {
        console.error('⚠️ Error fetching location:', error.message);
        if (isMounted) {
          setErrorMsg('Failed to fetch location. Ensure GPS is on.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    })();

    return () => {
      isMounted = false; // ✅ Cleanup function to prevent memory leaks
    };
  }, []);

  console.log('🚀 Rendering component...');

  // Ensure fonts are loaded before rendering UI
  if (!fontsLoaded && !fontError) {
    return null; // ✅ Moved after all hooks
  }

  if (loading) {
    console.log('⏳ Waiting for location...');
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="blue" />
        <Text>Fetching location...</Text>
      </View>
    );
  }

  if (errorMsg) {
    console.log('❌ Error Message:', errorMsg);
    return (
      <View style={styles.centered}>
        <Text style={{ color: 'red' }}>{errorMsg}</Text>
      </View>
    );
  }

  console.log('🗺️ Attempting to Render App...');

  return (
    <SafeAreaProvider>
      <ClerkProvider publishableKey="pk_test_Y29vbC1idWxsZG9nLTIzLmNsZXJrLmFjY291bnRzLmRldiQ">
        <SafeAreaView style={styles.container}>
          <UserLocationContext.Provider value={{location,setLocation}}>
          <SignedIn>
            <NavigationContainer>
              <TabNavigation />
            </NavigationContainer>
          </SignedIn>
          <SignedOut>
            <LoginScreen />
          </SignedOut>

          <StatusBar style="auto"/>
          </UserLocationContext.Provider>
        </SafeAreaView>
        
      </ClerkProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    width: "100%",
    height: "500%",
    borderWidth: 2,
    borderColor: "red",
  },
});
