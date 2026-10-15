import { useEffect } from 'react';
import { Platform, View } from 'react-native';
import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import { useColorScheme } from 'nativewind';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import CollapsedWorkout from '@/components/workout/workout-collapsed';
import '../../global.css';

export default function RootLayout() {
  const { colorScheme } = useColorScheme();

  useEffect(() => {
    if (Platform.OS === 'web') {
      document.documentElement.classList.toggle('light', colorScheme === 'light');
    }
  }, [colorScheme]);

  return (
    <SafeAreaProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <View className="flex-1">
          <Stack screenOptions={{ headerShown: false }} />
          <CollapsedWorkout />
        </View>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
