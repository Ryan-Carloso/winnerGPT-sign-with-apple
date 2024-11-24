import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Platform, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { format } from 'date-fns';
import { Calendar, Clock, Trophy, ChevronRight } from 'lucide-react-native';
import { useLanguage } from './globalize/context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { purchaseItem, getPurchaseHistory } from 'react-native-iap'; // Import from react-native-iap
import { Colors } from 'react-native/Libraries/NewAppScreen';


import { sendNotification } from './notify/notify';


const { width: SCREEN_WIDTH } = Dimensions.get('window');

const COLORS = {
  primary: '#1E88E5',
  white: '#FFFFFF',
  background: '#F8FAFF',
  text: '#2B2B2B',
  border: '#E3F2FD',
  lightBlue: '#F5F9FF',
};

export default function GameItem({ item, numColumns = 1 }) {
  const { translate } = useLanguage();
  const router = useRouter();
  const [isPressed, setIsPressed] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [hasSubscription, setHasSubscription] = useState(false); // Add state for subscription status

  const getItemWidth = () => {
    const padding = 32;
    const spacing = 16;
    const availableWidth = SCREEN_WIDTH - padding;
    return (availableWidth - spacing * (numColumns - 1)) / numColumns;
    
  };

  const tryit = async () => {
    try {
      console.log('iniciate');
  
      // Check if user has a subscription
      const purchaseHistory = await getPurchaseHistory();
      const hasActiveSubscription = purchaseHistory.some(
        (purchase) => purchase.productId === 'rc499mo' || purchase.productId === 'rc1999yearly'
      );
  
      // Log if the user has a subscription or not
      if (hasActiveSubscription) {
        console.log('User has an active subscription');
      } else {
        console.log('User does not have an active subscription');
      }
  
      setHasSubscription(hasActiveSubscription);
    } catch (error) {
      console.error('Error fetching purchase history:', error);
    }
  };
  
  const handlePressTeam = async () => {
    if (!hasSubscription) { //put an ! here  if (!hasSubscription) {

  
      // Set the click count and mark the button as pressed
      setClickCount(prevCount => prevCount + 1);
      setIsPressed(true);
  
      // Navigate to the team page
      router.push({
        pathname: `/team/${item.home_team_id}`,
        params: { gameData: JSON.stringify(item) },
      });
    } else {
      // User doesn't have a subscription, check click count limit
      if (clickCount >= 5) { //here need to be 5 if (clickCount >= 5) {
        sendNotification(
          translate('titleProNotify'),
          translate('bodyProNotify'),
          { type: 'subscription_upgrade' }
        );
        Alert.alert(translate('AlertTitle'), translate('AlertDesc'));
        router.push('/subs');
        return;
      }
  
      // Proceed with the click logic for users without subscription
      console.log('User does not have an active subscription.'); // Log if the user doesn't have a subscription
      setClickCount(prevCount => prevCount + 1);
      setIsPressed(true);
  
      // Navigate to the team page
      router.push({
        pathname: `/team/${item.home_team_id}`,
        params: { gameData: JSON.stringify(item) },
      });
    }
  };

  useEffect(() => {
    const loadClickCount = async () => {
      try {
        const storedCount = await AsyncStorage.getItem('clickCount');
        const lastClickDate = await AsyncStorage.getItem('lastClickDate');
        const currentDate = new Date().toDateString();

        if (storedCount !== null && lastClickDate === currentDate) {
          setClickCount(parseInt(storedCount));
        } else {
          setClickCount(0);
        }
      } catch (e) {
        console.error('Erro ao carregar clickCount', e);
      }
    };

    loadClickCount();
  }, []);

  useEffect(() => {
    const saveClickCount = async () => {
      try {
        const currentDate = new Date().toDateString();
        await AsyncStorage.setItem('clickCount', clickCount.toString());
        await AsyncStorage.setItem('lastClickDate', currentDate);
      } catch (e) {
        console.error('Erro ao salvar clickCount', e);
      }
    };

    saveClickCount();
  }, [clickCount]);

  const date = new Date(item.fixture_date);
  const formattedDate = format(date, 'MMM dd, yyyy');
  const formattedTime = format(date, 'HH:mm');

  return (
    <View style={[styles.container, { width: getItemWidth() }]}>
      <View
        colors={[COLORS.white, COLORS.background]}
        style={styles.card}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <TouchableOpacity onPress={handlePressTeam}>
          <View style={styles.header}>
            <View style={styles.dateTimeContainer}>
              <View style={styles.infoRow}>
                <Calendar width={14} height={14} color={COLORS.primary} />
                <Text style={styles.dateText}>{formattedDate}</Text>
              </View>
              <View style={styles.infoRow}>
                <Clock width={14} height={14} color={COLORS.primary} />
                <Text style={styles.timeText}>{formattedTime}</Text>
              </View>
            </View>
          </View>

          <View style={styles.teamsSection}>
            <Text style={styles.teamName} numberOfLines={1}>
              {item.home_team_name}
            </Text>
            <View style={styles.vsContainer}>
              <View style={styles.vsLine} />
              <Text style={styles.vsText}>VS</Text>
              <View style={styles.vsLine} />
            </View>
            <Text style={styles.teamName} numberOfLines={1}>
              {item.away_team_name}
            </Text>
          </View>

          <TouchableOpacity
            onPress={handlePressTeam}
            style={[styles.actionButton, isPressed && styles.actionButtonPressed]}
            activeOpacity={0.9}
          >
            <Trophy width={16} height={16} color={COLORS.white} />
            <Text style={styles.actionButtonText}>{translate('seestats')}</Text>
            <ChevronRight width={18} height={18} color={COLORS.white} />
          </TouchableOpacity>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
    margin: 'auto'
  },
  card: {
    borderRadius: 20,
    padding: 16,
    color: Colors.background,
    backgroundColor: Colors.white,
    ...Platform.select({
      ios: {
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  header: {
    marginBottom: 16,
  },
  dateTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: COLORS.white,
    padding: 12,
    borderRadius: 12,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  dateText: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '600',
  },
  timeText: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '700',
  },
  teamsSection: {
    backgroundColor: COLORS.lightBlue,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  teamName: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.text,
    textAlign: 'center',
    marginVertical: 8,
  },
  vsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
    gap: 12,
  },
  vsLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E0E0E0',
    maxWidth: 80,
  },
  vsText: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.primary,
    letterSpacing: 1,
  },
  predictionContainer: {
    backgroundColor: COLORS.lightBlue,
    borderRadius: 16,
    padding: 10,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  predictionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  predictionLabel: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '600',
  },
  predictionText: {
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.primary,
    textAlign: 'center',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    paddingHorizontal: 29,
    borderRadius: 12,
    gap: 8,
    ...Platform.select({
      ios: {
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  actionButtonPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  actionButtonText: {
    color: COLORS.white,
    fontWeight: '700',
    fontSize: 15,
  },
})
