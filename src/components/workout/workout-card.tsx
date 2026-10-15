import { Alert, Image, ScrollView, View } from 'react-native';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import { useThemeColors } from '@/lib/theme';
import { Ionicons } from '@expo/vector-icons';
import { MenuView } from '@expo/ui/community/menu';
import { Icon } from '@expo/ui';
import { Workout } from './types';

const editIcon = Icon.select({
  ios: 'pencil',
  android: import('@expo/material-symbols/edit.xml'),
});

const duplicateIcon = Icon.select({
  ios: 'doc.on.doc',
  android: import('@expo/material-symbols/content_copy.xml'),
});

const deleteIcon = Icon.select({
  ios: 'trash',
  android: import('@expo/material-symbols/delete.xml'),
});

type WorkoutCardProps = {
  workout: Workout;
  onEdit?: (workout: Workout) => void;
  onDuplicate?: (workout: Workout) => void;
  onDelete?: (workout: Workout) => void;
  onStart?: (workout: Workout) => void;
};

export function WorkoutCard({ workout, onEdit, onDuplicate, onDelete, onStart }: WorkoutCardProps) {
  const colors = useThemeColors();

  const handleMenuAction = (action: string) => {
    switch (action) {
      case 'edit':
        onEdit?.(workout);
        break;

      case 'duplicate':
        onDuplicate?.(workout);
        break;

      case 'delete':
        Alert.alert(
          'Apagar treino',
          `Tens a certeza de que queres apagar permanentemente o treino "${workout.name}"?`,
          [
            {
              text: 'Cancelar',
              style: 'cancel',
            },
            {
              text: 'Apagar',
              style: 'destructive',
              onPress: () => onDelete?.(workout),
            },
          ]
        );
        break;
    }
  };

  return (
    <Card className="gap-4 rounded-2xl border border-border py-4">
      <CardHeader className="flex-row items-center justify-between px-4">
        <CardTitle className="flex-1 text-xl" numberOfLines={1}>
          {workout.name}
        </CardTitle>

        <MenuView
          actions={[
            {
              id: 'edit',
              title: 'Editar treino',
              image: editIcon,
            },
            {
              id: 'duplicate',
              title: 'Duplicar treino',
              image: duplicateIcon,
            },
            {
              id: 'delete',
              title: 'Apagar treino',
              image: deleteIcon,
              attributes: { destructive: true },
            },
          ]}
          onPressAction={(event) => {
            handleMenuAction(event.nativeEvent.event);
          }}>
          <Button
            accessibilityLabel={`Opções do treino ${workout.name}`}
            variant="ghost"
            size="icon"
            className="h-8 w-8">
            <Ionicons name="ellipsis-horizontal" size={20} color={colors.foreground} />
          </Button>
        </MenuView>
      </CardHeader>

      <CardContent className="px-4">
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="flex-row gap-3">
            {workout.exercises.map((exercise) => (
              <View key={exercise.id} className="w-16 gap-1.5">
                <Image
                  source={{ uri: exercise.imgURL }}
                  className="h-16 w-16 rounded-xl bg-muted"
                  resizeMode="cover"
                  accessible={false}
                />

                <Text className="text-center text-muted-foreground" numberOfLines={1}>
                  {exercise.name}
                </Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </CardContent>

      <CardFooter className="px-4">
        <Button
          variant="default"
          size="lg"
          className="flex-1"
          accessibilityLabel={`Iniciar treino ${workout.name}`}
          onPress={() => onStart?.(workout)}>
          <Text className="text-base">Iniciar treino</Text>
          <Ionicons name="play" size={18} color={colors.background} />
        </Button>
      </CardFooter>
    </Card>
  );
}
