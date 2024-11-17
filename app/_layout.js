import { Stack } from 'expo-router';
import { LanguageProvider } from '../components/globalize/context';
import * as Sentry from '@sentry/react-native';

Sentry.init({
  dsn: 'https://4b81db075d0df459dc59e9f2c9df9809@o4507664027287552.ingest.de.sentry.io/4507693065961552',

  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // enableSpotlight: __DEV__,
});

export default function AppLayout() {
  return (
    <LanguageProvider>
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{ headerShown: false,
            title: 'Home' // Substitua 'Título da Tela' pelo título desejado

           }}
        />
        <Stack.Screen
          name="team/[teamId]"
          options={{ 
            headerShown: true,
            title: 'Team Stats' // Substitua 'Título da Tela' pelo título desejado
          }}
        />
      </Stack>
    </LanguageProvider>
  );
}
