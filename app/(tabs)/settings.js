import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useLanguage } from '../../components/globalize/context'; // Ajuste o caminho conforme necessário

const SettingsScreen = () => {
  const { setLanguage, translate } = useLanguage();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{translate('settingsTitle')}</Text>

      {/* Botões para mudar o idioma */}
      <TouchableOpacity style={styles.button} onPress={() => setLanguage('en')}>
        <Text style={styles.buttonText}>{translate('languageEnglish')}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => setLanguage('es')}>
        <Text style={styles.buttonText}>{translate('languageSpanish')}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => setLanguage('fr')}>
        <Text style={styles.buttonText}>{translate('languageFrench')}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => setLanguage('pt')}>
        <Text style={styles.buttonText}>{translate('languagePortuguese')}</Text>
      </TouchableOpacity>

      <Text style={styles.infoText}>{translate('infoText')}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#4CAF50', // Verde vibrante
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '600',
  },
  infoText: {
    fontSize: 16,
    color: '#777',
    marginTop: 30,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});

export default SettingsScreen;
