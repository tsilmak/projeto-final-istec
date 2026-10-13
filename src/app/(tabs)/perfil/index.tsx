import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from 'nativewind';
import { ScrollView, View } from 'react-native';

import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { useThemeColors } from '@/lib/theme';

export default function PerfilScreen() {
  const { colorScheme, setColorScheme } = useColorScheme();
  const colors = useThemeColors();
  const isDark = colorScheme === 'dark';
  const nextScheme = isDark ? 'light' : 'dark';

  return (
    <View className="flex-1 bg-background">
      <ScrollView className="flex-1">
        <View className="gap-4 p-6 pb-40">
          <Text variant="h2">Perfil</Text>
          <View className="gap-2 rounded-xl border border-border bg-card p-5">
            <Text variant="large">A tua conta</Text>
            <Text className="text-muted-foreground">
              A tua informação e as tuas preferências vão aparecer aqui.
            </Text>
          </View>
          <View className="gap-3 rounded-xl border border-border bg-card p-5">
            <Text variant="large">Aparência</Text>
            <Button
              variant="outline"
              className="h-12 justify-start gap-3 rounded-xl bg-card dark:bg-card"
              onPress={() => setColorScheme(nextScheme)}
              accessibilityLabel={`Mudar para modo ${nextScheme === 'light' ? 'claro' : 'escuro'}`}>
              <Ionicons
                name={isDark ? 'sunny-outline' : 'moon-outline'}
                size={20}
                color={colors.foreground}
              />
              <Text className="text-base font-medium">
                {isDark ? 'Mudar para modo claro' : 'Mudar para modo escuro'}
              </Text>
            </Button>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
