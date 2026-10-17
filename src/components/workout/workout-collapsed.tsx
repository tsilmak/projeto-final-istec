import { useEffect, useState } from 'react';
import { Alert, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useThemeColors } from '@/lib/theme';

import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { useActiveWorkoutStore } from '@/store/useActiveWorkoutStore';
import { usePathname, useRouter } from 'expo-router';

function formatElapsed(totalSeconds: number) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const pad = (value: number) => String(value).padStart(2, '0');

  return hours > 0
    ? `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`
    : `${pad(minutes)}:${pad(seconds)}`;
}

export default function CollapsedWorkout() {
  const router = useRouter();
  const pathname = usePathname();

  const { bottom } = useSafeAreaInsets();
  const { destructiveForeground } = useThemeColors();

  const workoutId = useActiveWorkoutStore((state) => state.workoutId);
  const startedAt = useActiveWorkoutStore((state) => state.startedAt);
  const hasHydrated = useActiveWorkoutStore((state) => state.hasHydrated);
  const finishWorkout = useActiveWorkoutStore((state) => state.finishWorkout);

  const isDoingAWorkout = workoutId !== null && pathname === `/treino/${workoutId}`;

  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    if (!workoutId || startedAt === null) {
      return;
    }

    const interval = setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, [workoutId, startedAt]);

  const elapsed =
    startedAt === null ? '00:00' : formatElapsed(Math.max(0, Math.floor((now - startedAt) / 1000)));

  const handleStopWorkout = () => {
    Alert.alert('Parar treino', 'Tens a certeza que desejas parar o treino atual?', [
      {
        text: 'Cancelar',
        style: 'cancel',
      },
      {
        text: 'Parar',
        style: 'destructive',
        onPress: finishWorkout,
      },
    ]);
  };

  if (!hasHydrated || !workoutId || startedAt === null || isDoingAWorkout) {
    return null;
  }

  return (
    <View
      pointerEvents="box-none"
      className="absolute left-4 right-4 z-[1000]"
      style={{
        bottom: bottom + 64,
        elevation: 1000,
      }}>
      <Button
        variant="outline"
        className="h-auto min-h-16 w-full justify-start gap-3 rounded-2xl bg-card px-3 py-2 hover:bg-card active:bg-card dark:bg-card dark:hover:bg-card dark:active:bg-card"
        onPress={() =>
          router.push({
            pathname: '/treino/[id]',
            params: { id: workoutId },
          })
        }>
        <View className="min-w-0 flex-1">
          <Text className="font-mono text-base font-semibold text-foreground">{elapsed}</Text>

          <Text className="text-base font-semibold text-foreground" numberOfLines={1}>
            Workout ativo
          </Text>
        </View>
      </Button>

      <View
        pointerEvents="box-none"
        className="absolute inset-0 flex-row items-center justify-end px-4">
        <Button
          variant="destructive"
          size="icon"
          className="rounded-full"
          accessibilityLabel="Parar treino"
          onPress={handleStopWorkout}>
          <Ionicons name="close" size={22} color={destructiveForeground} />
        </Button>
      </View>
    </View>
  );
}
