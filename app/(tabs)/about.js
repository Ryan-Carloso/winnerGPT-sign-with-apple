import React from 'react'
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  Pressable,
  Linking,
  StyleSheet,
  Platform,
} from 'react-native'
import { AntDesign, FontAwesome5 } from '@expo/vector-icons'
import { useLanguage } from '../../components/globalize/context'

const COLORS = {
  primary: '#1E88E5',
  white: '#FFFFFF',
  background: '#F8FAFF',
  text: '#333333',
  secondaryText: '#666666',
}

const AboutScreen = () => {
  const { translate } = useLanguage()

  const openLink = () => {
    Linking.openURL(url)
  }

  const socialLinks = [
    { icon: 'linkedin-square', url: 'https://www.linkedin.com/in/ryancarlos/', type: 'AntDesign' },
    { icon: 'instagram', url: 'https://instagram.com/make4ryan', type: 'AntDesign' },
    { icon: 'tiktok', url: 'https://www.tiktok.com/@make4ryan', type: 'FontAwesome5' },
  ]

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
        <Text style={styles.title}>{translate('aboutTitle')}</Text>
        <Text style={styles.description}>{translate('description')}</Text>

        <Text style={styles.sectionTitle}>{translate('featuresTitle')}</Text>
        <View>
          {translate('features').map((feature, index) => (
            <Text key={index} style={styles.featureItem}>
              • {feature}
            </Text>
          ))}
        </View>

        <Text style={styles.sectionTitle}>{translate('creatorsTitle')}</Text>
        <Text style={styles.description}>{translate('creatorsDescription')}</Text>

        <Text style={styles.sectionTitle}>{translate('contactTitle')}</Text>
        <Text style={styles.description}>{translate('contactDescription')}</Text>

        <Text style={styles.sectionTitle}>{translate('disclaimerTitle')}</Text>
        <Text style={styles.disclaimer}>{translate('disclaimerDescription')}</Text>

        <View style={styles.socialContainer}>
          {socialLinks.map((link, index) => (
            <Pressable
              key={index}
              onPress={() => openLink(link.url)}
              style={({ pressed }) => [
                styles.socialButton,
                pressed && styles.socialButtonPressed,
              ]}
              accessibilityLabel={`Open ${link.icon} profile`}
            >
              {link.type === 'AntDesign' ? (
                <AntDesign name={link.icon} size={24} color={COLORS.primary} />
              ) : (
                <FontAwesome5 name={link.icon} size={24} color={COLORS.primary} />
              )}
            </Pressable>
          ))}
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
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: COLORS.primary,
    marginTop: 20,
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: COLORS.text,
    marginBottom: 15,
    lineHeight: 24,
  },
  featureItem: {
    fontSize: 16,
    color: COLORS.text,
    marginBottom: 8,
    lineHeight: 24,
  },
  disclaimer: {
    fontSize: 14,
    color: COLORS.secondaryText,
    fontStyle: 'italic',
    marginTop: 10,
    marginBottom: 20,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  socialButton: {
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 8,
    backgroundColor: COLORS.white,
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
  socialButtonPressed: {
    opacity: 0.7,
  },
})

export default AboutScreen