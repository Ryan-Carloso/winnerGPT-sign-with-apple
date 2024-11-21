import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';

// Configure notification behavior
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export const initializeNotifications = async () => {
  // Request permission (required for iOS)
  if (Platform.OS === 'ios') {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== 'granted') {
      alert('You need to enable notifications to use this feature!');
      return;
    }
  }
};

export const scheduleLocalDailyNotification = async () => {
  try {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'New Games just out!',
        body: 'Hey! It’s 12 PM! Check the app for updates! on new games',
        data: { type: 'daily_reminder' },
      },
      trigger: {
        hour: 12, // 12 PM (local time)
        minute: 0,
        repeats: true, // Ensures it repeats daily
      },
    });
    console.log('Daily notification scheduled for 12 PM local time!');
  } catch (error) {
    console.log('Error scheduling daily notification:', error);
  }
};

// New function to send custom notifications
export const sendNotification = async (title, body, data) => {
  try {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: title,
        body: body,
        data: data,
      },
      trigger: null,
    });
  } catch (error) {
    console.log('Error sending notification:', error);
  }
};