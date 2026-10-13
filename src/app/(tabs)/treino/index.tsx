import { ScrollView, View } from 'react-native';

import { Text } from '@/components/ui/text';

export default function TreinoScreen() {
  return (
    <View className="flex-1 bg-background">
      <ScrollView className="flex-1">
        <View className="gap-4 p-6 pb-40">
          <Text variant="h2">Treino</Text>
          <View className="gap-2 rounded-xl border border-border bg-card p-5">
            <Text variant="large">A tua rotina</Text>
            <Text className="text-muted-foreground">Os teus treinos vão aparecer aqui.</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
