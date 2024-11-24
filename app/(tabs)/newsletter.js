import React, { useState } from 'react';
import { View, ScrollView, SafeAreaView, Text, TextInput, TouchableOpacity, Alert, StyleSheet, ActivityIndicator, TouchableWithoutFeedback, Keyboard } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Localization from 'expo-localization';
import { createClient } from '@supabase/supabase-js';

// Configuração do Supabase
const supabaseUrl = 'https://tlaihqorrptgeflxarvm.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRsYWlocW9ycnB0Z2VmbHhhcnZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjIxMDgxMzksImV4cCI6MjAzNzY4NDEzOX0.B5fs0W2dXZPSmKmZ2yoMxVg4n6JBEpdBQh8ZRHOxoBY';
const supabase = createClient(supabaseUrl, supabaseKey);

// Função para registrar analytics
const trackSubsAnalytics = async (email, phone) => {
  try {
    // Obter ou criar um ID de usuário único
    let userId = await AsyncStorage.getItem('user_id');
    const isNew = !userId;

    if (!userId) {
      userId = Math.random().toString(36).substring(2, 15);
      await AsyncStorage.setItem('user_id', userId);
    }

    // Capturar dados do dispositivo e localidade
    const locale = Localization.locale || 'unknown';
    const timezone = Localization.timezone || 'unknown';
    const lastSeen = new Date().toISOString();

    // Inserir dados no Supabase
    const { data, error } = await supabase.from('newsletter_data').insert([
      {
        user_id: userId,
        locale: locale,
        timezone: timezone,
        is_new: isNew,
        last_seen: lastSeen,
        email: email,
        phone: phone,
      },
    ]);

    // Verificar erro
    if (error) {
      console.error('Erro ao registrar analytics:', error.message);
      console.error('Detalhes do erro:', error.details);
    } else {
      console.log('Analytics registrados com sucesso:', data);
    }
  } catch (error) {
    console.error('Erro ao salvar analytics:', error);
  }
};

// Função para validar email
const isValidEmail = (email) => {
  const regex = /\S+@\S+\.\S+/;  // Expressão regular simples para validação de e-mail
  return regex.test(email);
};

// Função para validar telefone
const isValidPhone = (ddd, phoneNumber) => {
  return (ddd && phoneNumber && phoneNumber.length >= 8); // Ambos DDD e número devem ser preenchidos e o número deve ter pelo menos 8 dígitos
};

export default function NewsLetter() {
  const [email, setEmail] = useState('');
  const [ddd, setDDD] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    setLoading(true);

    // Se o e-mail for válido ou se o telefone completo for fornecido (DDD + número), continua o processo
    if (email && !isValidEmail(email)) {
      Alert.alert('Invalid email', 'Please enter a valid email address.');
      setLoading(false);
      return;
    }

    // Se o telefone for fornecido, valida se ambos DDD e número estão preenchidos
    if ((ddd || phoneNumber) && !(ddd && phoneNumber)) {
      Alert.alert('Invalid phone number', 'Please enter both DDD and phone number.');
      setLoading(false);
      return;
    }

    try {
      // Concatena o número do telefone (DDD + número) se ambos forem fornecidos
      const fullPhoneNumber = ddd && phoneNumber ? ddd + phoneNumber : '';

      // Chama o trackSubsAnalytics para registrar os dados de analytics (informando que o email foi enviado)
      await trackSubsAnalytics(email, fullPhoneNumber);

      Alert.alert('Success', 'You have successfully subscribed to our newsletter!');
      setEmail('');
      setDDD('');
      setPhoneNumber('');
    } catch (error) {
      console.error('Error inserting data into Supabase:', error);
      Alert.alert('Error', 'There was an issue subscribing. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.container}>
            <Text style={styles.title}>News About Soccer</Text>

            <Text style={styles.description}>
              Stay up to date with the latest tips and predictions for soccer betting! 
              Our newsletter will keep you informed about upcoming matches, 
              and help you make the best betting decisions by analyzing team matchups and stats.
            </Text>

            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              keyboardType="email-address"
              style={styles.input}
              placeholderTextColor={COLORS.secondaryText}
            />

            <Text style={styles.optionalText}>Or if you prefer, enter your number for WhatsApp newsletter</Text>

            <View style={styles.phoneInputContainer}>
              <TextInput
                value={ddd}
                onChangeText={setDDD}
                placeholder="DDD"
                keyboardType="phone-pad"
                style={styles.dddInput}
                placeholderTextColor={COLORS.secondaryText}
                maxLength={2}
              />
              <TextInput
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                placeholder="Phone number"
                keyboardType="phone-pad"
                style={styles.phoneInput}
                placeholderTextColor={COLORS.secondaryText}
              />
            </View>

            <TouchableOpacity
              onPress={handleSubscribe}
              style={[styles.button, loading && styles.buttonDisabled]}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color={COLORS.white} />
              ) : (
                <Text style={styles.buttonText}>Subscribe Now</Text>
              )}
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </SafeAreaView>
  );
}

const COLORS = {
  primary: '#1E88E5',
  white: '#FFFFFF',
  background: '#F8FAFF',
  text: '#333333',
  secondaryText: '#666666',
  border: '#E0E0E0',
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollView: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: COLORS.background,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: COLORS.text,
    marginBottom: 15,
    lineHeight: 24,
  },
  input: {
    height: 50,
    borderColor: COLORS.border,
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 15,
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: COLORS.white,
    color: COLORS.text,
  },
  phoneInputContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  dddInput: {
    height: 50,
    borderColor: COLORS.border,
    borderWidth: 1,
    paddingHorizontal: 15,
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: COLORS.white,
    color: COLORS.text,
    width: '20%',
    marginRight: '2%',
  },
  phoneInput: {
    height: 50,
    borderColor: COLORS.border,
    borderWidth: 1,
    paddingHorizontal: 15,
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: COLORS.white,
    color: COLORS.text,
    width: '78%',
  },
  optionalText: {
    fontSize: 16,
    color: COLORS.text,
    marginBottom: 15,
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: COLORS.white,
    fontWeight: 'bold',
  },
  buttonDisabled: {
    backgroundColor: COLORS.secondaryText,
  },
});