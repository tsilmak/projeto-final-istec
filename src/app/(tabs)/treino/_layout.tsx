import { Pressable } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useThemeColors } from '@/lib/theme';

export default function TreinoLayout() {
  const router = useRouter();
  const colors = useThemeColors();

  const minimize = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/treino');
    }
  };

  return (
    <Stack screenOptions={{ headerShown: false, animation: 'simple_push' }}>
      <Stack.Screen name="index" />
      <Stack.Screen
        name="[id]"
        options={{
          headerShown: true,
          title: '',
          headerLeft: () => (
            <Pressable onPress={minimize} hitSlop={12} accessibilityLabel="Minimizar treino">
              <Ionicons name="chevron-down" size={28} color={colors.foreground} />
            </Pressable>
          ),
        }}>
        <Stack.Toolbar placement="right">
          <Stack.Toolbar.Button icon="timer" onPress={() => {}} />
          <Stack.Toolbar.Button variant="prominent" separateBackground onPress={() => {}}>
            Concluir
          </Stack.Toolbar.Button>
        </Stack.Toolbar>
      </Stack.Screen>
    </Stack>
  );
}
