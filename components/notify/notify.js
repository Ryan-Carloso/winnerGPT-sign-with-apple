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
export const scheduleLocalDailyNotification = async (title, body, data) => {
  const NOTIFICATION_KEY = 'dailyNotificationScheduled';

  try {
    const alreadyScheduled = await AsyncStorage.getItem(NOTIFICATION_KEY);

    if (alreadyScheduled === 'true') {
      console.log('Daily notification already scheduled.');
      return;
    }

    await Notifications.scheduleNotificationAsync({
      content: {
        title: title,
        body: body,
        data: data,
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

export const sendNotification = async (title, body, data) => {
  try {
    // Envia a notificação imediatamente
    await Notifications.scheduleNotificationAsync({
      content: {
        title: title,
        body: body,
        data: data,
      },
      trigger: null, // Envia imediatamente
    });

    console.log('Notification sent immediately!');

    // Agenda a notificação para 2 horas depois
    const twoHoursFromNow = new Date();
    twoHoursFromNow.setHours(twoHoursFromNow.getHours() + 2);

    await Notifications.scheduleNotificationAsync({
      content: {
        title: title, // Opcional: título diferenciado
        body: body,
        data: data,
      },
      trigger: {
        date: twoHoursFromNow,
      },
    });

    console.log('Notification scheduled for 2 hours from now!');
  } catch (error) {
    console.log('Error sending or scheduling notifications:', error);
  }
};