import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  Linking,
  Keyboard,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';
import { useLanguage } from '../globalize/context';

const { width, height } = Dimensions.get('window');

// Calculate responsive sizes
const buttonWidth = width * 0.75;
const buttonHeight = height < 700 ? 50 : 60; // Adjust height for smaller screens

const CODES = [
  'A3J7K9X2', 'Z8Y6P3L9', 'W4F5G2H7', 'Q1D3S8T5', 'B2N9V5X1', 
  'L3M6J8P4', 'U5Y7T4W9', 'X2K5J1B7', 'V9Q3M4L6', 'H7P8D2N3', 
  'codetest'
];

export default function Auth({ setIsLoggedIn }) {
  const { translate } = useLanguage();
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const inputRef = useRef(null);

  const handleLogin = () => {
    if (CODES.includes(code)) {
      setIsLoggedIn(true);
      setError('');
    } else {
      setError('Código incorreto. Tente novamente.');
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSupport = async () => {
    const supportUrl = 'https://wa.me/+351962248268?text=Hello,%20I%20would%20like%20help%20you%20access%20the%20app.%20Could%20you%20please%20tell%20me%20how%20to%20do%20that%3F';
    await Linking.openURL(supportUrl);
  };

  const handleKeyboardDismiss = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={handleKeyboardDismiss}>
      <LinearGradient colors={['#F5F5F5', '#ffff']} style={styles.gradient}>
        <SafeAreaView style={styles.container}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.content}
          >
            <View style={styles.logoContainer}>
              <Image
                source={require('../../assets/icon.png')}
                style={{ width: 100, height: 100 }}
              />
            </View>
            <Text style={styles.title}>{translate('welcome')}</Text>
            <Text style={styles.subtitle}>{translate('enterCode')}</Text>
            <View style={styles.inputContainer}>
              <TextInput
                ref={inputRef}
                style={styles.input}
                onChangeText={setCode}
                value={code}
                placeholder={translate('placeholderCode')}
                placeholderTextColor="#A0AEC0"
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity style={styles.passwordButton} onPress={toggleShowPassword}>
                <FontAwesome name={showPassword ? 'eye-slash' : 'eye'} size={20} color="#A0AEC0" />
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>{translate('loginButton')}</Text>
            </TouchableOpacity>
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
          </KeyboardAvoidingView>
          <View style={styles.supportContainer}>
            <TouchableOpacity style={styles.supportButton} onPress={handleSupport}>
              <Text style={styles.supportButtonText}>{translate('support')}</Text>
            </TouchableOpacity>
            <Text style={styles.supportText}>
              {translate('noCode')}
            </Text>
          </View>
        </SafeAreaView>
      </LinearGradient>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logoContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#E2E8F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#4A5568',
    marginBottom: 30,
    textAlign: 'center',
  },
  inputContainer: {
    width: buttonWidth,
    marginBottom: 20,
    position: 'relative',
  },
  input: {
    height: 60,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 20,
    fontSize: 18,
    color: '#2D3748',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  passwordButton: {
    position: 'absolute',
    right: -30,
    top: 20,
  },
  button: {
    width: buttonWidth,
    height: buttonHeight,
    backgroundColor: '#4299E1',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: "#4299E1",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  errorText: {
    color: '#E53E3E',
    marginTop: 10,
    fontSize: 16,
    textAlign: 'center',
  },
  supportContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  supportButton: {
    width: buttonWidth,
    height: buttonHeight,
    backgroundColor: '#48BB78',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: "#48BB78",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  supportButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  supportText: {
    fontSize: 14,
    color: '#4A5568',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});
