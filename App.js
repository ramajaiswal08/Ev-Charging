import React from 'react';
import { ClerkProvider } from '@clerk/clerk-expo';
import { StyleSheet, View, Text } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import LoginScreen from './App/Screen/LoginScreen/LoginScreen';
import { SignedIn, SignedOut } from '@clerk/clerk-expo';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    'outfit': require('./assets/fonts/Outfit-Regular.ttf'),
    'outfit-medium': require('./assets/fonts/Outfit-SemiBold.ttf'),
    'outfit-bold': require('./assets/fonts/Outfit-Bold.ttf'),
  });

  React.useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <ClerkProvider publishableKey="pk_test_Y29vbC1idWxsZG9nLTIzLmNsZXJrLmFjY291bnRzLmRldiQ">
      <View style={styles.container}>
        <SignedIn>
          <Text style={styles.welcomeText}>✅ You are Signed In!</Text>
        </SignedIn>
        <SignedOut>
          <LoginScreen />
        </SignedOut>
      </View>
    </ClerkProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 20,
    fontFamily: 'outfit-bold',
    color: '#4CAF50',
    textAlign: 'center',
  },
});
