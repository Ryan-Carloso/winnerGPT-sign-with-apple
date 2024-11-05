import { Stack } from 'expo-router';
import { LanguageProvider } from '../components/globalize/context';

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
