import { useActiveWorkoutStore } from '@/store/useActiveWorkoutStore';
import { usePathname } from 'expo-router';
import { NativeTabs } from 'expo-router/unstable-native-tabs';

export default function Navbar() {
  const pathname = usePathname();
  const workoutId = useActiveWorkoutStore((state) => state.workoutId);

  const isDoingAWorkout = workoutId !== null && pathname === `/treino/${workoutId}`;

  return (
    <NativeTabs hidden={isDoingAWorkout}>
      <NativeTabs.Trigger name="home">
        <NativeTabs.Trigger.Label>Feed</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="house.fill" md="home" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="treino">
        <NativeTabs.Trigger.Label>Treino</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="figure.run" md="fitness_center" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="perfil">
        <NativeTabs.Trigger.Label>Perfil</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="person.fill" md="person" />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
