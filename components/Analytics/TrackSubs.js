import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Localization from 'expo-localization';
import { createClient } from '@supabase/supabase-js';

// Configuração do Supabase
const supabaseUrl = 'https://tlaihqorrptgeflxarvm.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRsYWlocW9ycnB0Z2VmbHhhcnZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjIxMDgxMzksImV4cCI6MjAzNzY4NDEzOX0.B5fs0W2dXZPSmKmZ2yoMxVg4n6JBEpdBQh8ZRHOxoBY';
export const supabase = createClient(supabaseUrl, supabaseKey);

const trackSubsAnalytics = async () => {
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
    const { data, error } = await supabase.from('Subs_analytics').insert([
      {
        user_id: userId,
        locale: locale,
        timezone: timezone,
        is_new: isNew,
        last_seen: lastSeen,
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

export default trackSubsAnalytics;