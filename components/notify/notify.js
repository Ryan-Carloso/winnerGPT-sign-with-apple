import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Configure notification behavior
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

// Initialize notification permissions
export const initializeNotifications = async () => {
  if (Platform.OS === 'ios') {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== 'granted') {
      alert('You need to enable notifications to use this feature!');
      return;
    }
  }
};

// Schedule daily notification if not already scheduled
export const scheduleLocalDailyNotification = async () => {
  const NOTIFICATION_KEY = 'dailyNotificationScheduled';

  try {
    const alreadyScheduled = await AsyncStorage.getItem(NOTIFICATION_KEY);

    if (alreadyScheduled === 'true') {
      console.log('Daily notification already scheduled.');
      return;
    }

    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'New Games just out!',
        body: 'Hey! It’s 12 PM! Check the app for updates on new games!',
        data: { type: 'daily_reminder' },
      },
      trigger: {
        hour: 12, // 12 PM (local time)
        minute: 0,
        repeats: true,
      },
    });

    // Mark as scheduled in AsyncStorage
    await AsyncStorage.setItem(NOTIFICATION_KEY, 'true');
    console.log('Daily notification scheduled for 12 PM local time!');
  } catch (error) {
    console.log('Error scheduling daily notification:', error);
  }
};

// New function to send custom notifications
export const sendNotification = async (title, body, data) => {
  try {
    const twoHoursFromNow = new Date();
    twoHoursFromNow.setHours(twoHoursFromNow.getHours() + 2); // Adiciona 2 horas ao horário atual

    await Notifications.scheduleNotificationAsync({
      content: {
        title: title,
        body: body,
        data: data,
      },
      trigger: {
        date: twoHoursFromNow, // Horário específico para a notificação
      },
    });

    console.log('Notification scheduled for 2 hours from now!');
  } catch (error) {
    console.log('Error scheduling notification:', error);
  }
};