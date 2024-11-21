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

export const sendAppOpenNotification = async () => {
  try {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Welcome Back! 👋',
        body: 'Thank you for opening our app',
        data: { type: 'app_open' },
      },
      trigger: null, // null means the notification triggers immediately
    });
  } catch (error) {
    console.log('Error sending notification:', error);
  }
};