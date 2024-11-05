import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Platform,
} from 'react-native'
import { useLanguage } from '../../components/globalize/context'

const COLORS = {
  primary: '#1E88E5',
  white: '#FFFFFF',
  background: '#F8FAFF',
  text: '#333333',
  secondaryText: '#666666',
}

const SettingsScreen = () => {
  const { setLanguage, translate, currentLanguage } = useLanguage()

  const languages = [
    { code: 'en', name: 'languageEnglish' },
    { code: 'es', name: 'languageSpanish' },
    { code: 'fr', name: 'languageFrench' },
    { code: 'pt', name: 'languagePortuguese' },
  ]

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.container}>
          <Text style={styles.title}>{translate('settingsTitle')}</Text>

          <View style={styles.languageContainer}>
            {languages.map((lang) => (
              <TouchableOpacity
                key={lang.code}
                style={[
                  styles.button,
                  currentLanguage === lang.code && styles.activeButton,
                ]}
                onPress={() => setLanguage(lang.code)}
                accessibilityLabel={translate(lang.name)}
                accessibilityState={{ selected: currentLanguage === lang.code }}
              >
                <Text
                  style={[
                    styles.buttonText,
                    currentLanguage === lang.code && styles.activeButtonText,
                  ]}
                >
                  {translate(lang.name)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.infoText}>{translate('infoText')}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollView: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 30,
    textAlign: 'center',
  },
  languageContainer: {
    width: '100%',
    marginBottom: 20,
  },
  button: {
    backgroundColor: COLORS.white,
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginVertical: 10,
    width: '100%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.primary,
    ...Platform.select({
      ios: {
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  activeButton: {
    backgroundColor: COLORS.primary,
  },
  buttonText: {
    fontSize: 18,
    color: COLORS.primary,
    fontWeight: '600',
  },
  activeButtonText: {
    color: COLORS.white,
  },
  infoText: {
    fontSize: 16,
    color: COLORS.secondaryText,
    marginTop: 30,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
})

export default SettingsScreen