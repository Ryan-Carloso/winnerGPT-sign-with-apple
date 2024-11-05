// app/about.js
import React from 'react';
import { View, Text, ScrollView, SafeAreaView, Pressable, Linking } from 'react-native';
import { AntDesign, FontAwesome5 } from '@expo/vector-icons';
import { styles } from '../../styles/GlobalStyles';

import { useLanguage } from '../../components/globalize/context'; // Adjust the path as necessary

const AboutScreen = () => {
  const { translate } = useLanguage();

  const openLink = (url) => {
    Linking.openURL(url);
  };

  return (
    <ScrollView style={styles.containerAbout}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>{translate('aboutTitle')}</Text>
        <Text style={styles.description}>{translate('description')}</Text>

        <Text style={styles.sectionTitle}>{translate('featuresTitle')}</Text>
        <View style={styles.description}>
          {translate('features').map((feature, index) => (
            <Text key={index} style={styles.featureItem}>• {feature}</Text>
          ))}
        </View>

        <Text style={styles.sectionTitle}>{translate('creatorsTitle')}</Text>
        <Text style={styles.description}>{translate('creatorsDescription')}</Text>

        <Text style={styles.sectionTitle}>{translate('contactTitle')}</Text>
        <Text style={styles.description}>{translate('contactDescription')}</Text>

        <Text style={styles.sectionTitle}>{translate('disclaimerTitle')}</Text>
        <Text style={styles.disclaimer}>{translate('disclaimerDescription')}</Text>

        <View style={styles.socialContainer}>
          <Pressable onPress={() => openLink('https://www.linkedin.com/in/ryancarlos/')}>
            <AntDesign name="linkedin-square" size={24} color="black" />
          </Pressable>
          <Pressable onPress={() => openLink('https://instagram.com/make4ryan')}>
            <AntDesign name="instagram" size={24} color="black" />
          </Pressable>
          <Pressable onPress={() => openLink('https://www.tiktok.com/@make4ryan')}>
            <FontAwesome5 name="tiktok" size={24} color="black" />
          </Pressable>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default AboutScreen;
