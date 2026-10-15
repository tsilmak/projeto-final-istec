import { ScrollView, View } from 'react-native';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { useThemeColors } from '@/lib/theme';
import { Ionicons } from '@expo/vector-icons';
import { Workout } from '@/components/workout/types';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WorkoutCard } from '@/components/workout/workout-card';

const BASE_URL = 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises';

const TREINOS: Workout[] = [
  {
    id: 'treino-1',
    name: 'Treino titulo',
    exercises: [
      { id: 'agachamento', name: 'Agachamento', imgURL: `${BASE_URL}/Barbell_Squat/0.jpg` },
      {
        id: 'supino',
        name: 'Supino',
        imgURL: `${BASE_URL}/Barbell_Bench_Press_-_Medium_Grip/0.jpg`,
      },
      { id: 'peso-morto', name: 'Peso morto', imgURL: `${BASE_URL}/Barbell_Deadlift/0.jpg` },
      { id: 'remada', name: 'Remada', imgURL: `${BASE_URL}/Bent_Over_Barbell_Row/0.jpg` },
      {
        id: 'press-ombros',
        name: 'Press ombros',
        imgURL: `${BASE_URL}/Barbell_Shoulder_Press/0.jpg`,
      },
      { id: 'avancos', name: 'Avanços', imgURL: `${BASE_URL}/Barbell_Lunge/0.jpg` },
      { id: 'flexoes', name: 'Flexões', imgURL: `${BASE_URL}/Pushups/0.jpg` },
      { id: 'prancha', name: 'Prancha', imgURL: `${BASE_URL}/Plank/0.jpg` },
    ],
  },
];

export default function TreinoScreen() {
  const colors = useThemeColors();

  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-background">
      <ScrollView className="flex-1" contentContainerClassName="gap-8 p-4">
        <Button variant="outline" size="lg">
          <Ionicons name="add" size={20} color={colors.foreground} />
          <Text className="text-base">Iniciar Treino Vazio</Text>
        </Button>

        <View className="gap-3">
          <View className="flex-row items-center justify-between">
            <Text className="font-medium text-muted-foreground">
              Os Meus Treinos ({TREINOS.length})
            </Text>
            <Button variant="ghost">
              <Ionicons name="add" size={16} color={colors.foreground} />
              <Text>Criar Treino</Text>
            </Button>
          </View>

          {TREINOS.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
