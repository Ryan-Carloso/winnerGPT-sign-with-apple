import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://tlaihqorrptgeflxarvm.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRsYWlocW9ycnB0Z2VmbHhhcnZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjIxMDgxMzksImV4cCI6MjAzNzY4NDEzOX0.B5fs0W2dXZPSmKmZ2yoMxVg4n6JBEpdBQh8ZRHOxoBY';
export const supabase = createClient(supabaseUrl, supabaseKey);

const trackUserAnalytics = async () => {
  try {
    let userId = await AsyncStorage.getItem('user_id');
    const isNew = !userId;

    if (!userId) {
      // Crie um novo ID para o usuário
      userId = Math.random().toString(36).substring(2, 15);
      await AsyncStorage.setItem('user_id', userId);
    }

    // Registre no Supabase
    const { error } = await supabase.from('user_analytics').insert([
      { user_id: userId, is_new: isNew }
    ]);

    if (error) {
      console.error('Erro ao registrar analytics:', error);
    }
  } catch (error) {
    console.error('Erro ao salvar usuário localmente:', error);
  }
};

export default trackUserAnalytics;