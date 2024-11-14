import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

import { useLanguage } from '../../components/globalize/context'


export default function TabsLayout() {
  const { translate } = useLanguage();

  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: translate('home'),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
            <Tabs.Screen
        name="subs"
        options={{
          title: translate('subs'),
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="crown" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: translate('settings'),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: translate('about'),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="information-circle" size={size} color={color} />
          ),
        }}
      />

    </Tabs>

  );
}