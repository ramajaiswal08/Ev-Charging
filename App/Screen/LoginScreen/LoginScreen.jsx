import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { useOAuth } from '@clerk/clerk-expo';
import * as Linking from 'expo-linking';

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' });

  const onPress = async () => {
    try {
      const { createdSessionId, setActive } = await startOAuthFlow();
      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
        console.warn('No session created.');
      }
    } catch (err) {
      console.error('OAuth error:', err);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('./../../../assets/images/logo.png')} style={styles.logoImage} />
      <Image source={require('./../../../assets/images/Ev-charger.png')} style={styles.bgImage} />
      <View style={styles.content}>
        <Text style={styles.heading}>Your Ultimate EV Charging Station Finder App</Text>
        <Text style={styles.desc}>
          Find EV charging stations near you, plan trips, and so much more in just one click!
        </Text>
        <TouchableOpacity style={styles.button} onPress={onPress}>
          <Text style={styles.buttonText}>Login With Google</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 70,
  },
  logoImage: {
    width: 300,
    height: 50,
    resizeMode: 'contain',
  },
  bgImage: {
    width: '100%',
    height: 180,
    marginTop: 20,
    resizeMode: 'cover',
  },
  content: {
    padding: 20,
  },
  heading: {
    fontSize: 25,
    fontFamily: 'outfit-bold',
    textAlign: 'center',
    marginTop: 20,
  },
  desc: {
    fontSize: 17,
    fontFamily: 'outfit',
    textAlign: 'center',
    marginTop: 15,
    color: '#888',
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 16,
    borderRadius: 99,
    marginTop: 50,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'outfit',
    fontSize: 17,
  },
});
