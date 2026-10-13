import { Stack } from 'expo-router';

export default function RouteLayout() {
  return (
    <Stack screenOptions={{ headerTitleAlign: 'center' }}>
      <Stack.Screen name="index" options={{ title: 'Perfil' }} />
    </Stack>
  );
}