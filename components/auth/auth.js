import React, { useState } from 'react';
import { View, StyleSheet, Platform, Text, SafeAreaView } from 'react-native';
import * as AppleAuthentication from 'expo-apple-authentication';
import { createClient } from '@supabase/supabase-js';
import AsyncStorage from "@react-native-async-storage/async-storage";
import 'react-native-url-polyfill/auto';

const supabase = createClient(
  "https://tlaihqorrptgeflxarvm.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRsYWlocW9ycnB0Z2VmbHhhcnZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjIxMDgxMzksImV4cCI6MjAzNzY4NDEzOX0.B5fs0W2dXZPSmKmZ2yoMxVg4n6JBEpdBQh8ZRHOxoBY",
  {
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  }
);

export default function Auth({ setIsLoggedIn }) { // Add setIsLoggedIn prop
  const [error, setError] = useState(null); // Initialize error state to null

  const handleAppleSignIn = async () => {
    try {      
      if (credential.identityToken) {
        const {
          error,
          data: { user },
        } = await supabase.auth.signInWithIdToken({
          provider: 'apple',
          token: credential.identityToken,
        });
        console.log(JSON.stringify({ error, user }, null, 2));
        if (!error) {
          // User is signed in.
          console.log("User signed in successfully");
          await AsyncStorage.setItem('isLoggedIn', 'true'); // Store login status
          setIsLoggedIn(true); // Update the parent component's state
        } else {
          throw error;
        }
      } else {
        throw new Error('No identityToken.');
      }
    } catch (e) {
      if (e.code === 'ERR_REQUEST_CANCELED') {
        console.log('Apple Sign In was canceled');
      } else {
        setError(e.message || 'An error occurred during sign in');
      }
    }
  };

  if (Platform.OS === 'ios') {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>Welcome</Text>
          <Text style={styles.subtitle}>Sign in to continue</Text>
          <AppleAuthentication.AppleAuthenticationButton
            buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
            buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
            cornerRadius={10}
            style={styles.appleButton}
            onPress={handleAppleSignIn}
          />
          {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Welcome</Text>
        <Text style={styles.subtitle}>Sign in options not available</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 30,
    color: '#666',
    textAlign: 'center',
  },
  appleButton: {
    width: '100%',
    height: 50,
    marginBottom: 20,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
  },
});