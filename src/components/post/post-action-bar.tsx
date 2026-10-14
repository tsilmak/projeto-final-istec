import type { ComponentProps } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Text, View } from 'react-native';
import { useThemeColors } from '@/lib/theme';
import { Button } from '../ui/button';
import type { PostActionBarProps } from './types';

type ActionButtonProps = {
  name: ComponentProps<typeof Ionicons>['name'];
  label: string;
  color: string;
  count: number;
  onPress: () => void;
};

const ActionButton = ({ name, label, color, count, onPress }: ActionButtonProps) => (
  <View className="flex-row items-center">
    <Button
      variant="ghost"
      size="icon"
      className="rounded-full"
      accessibilityLabel={label}
      onPress={onPress}>
      <Ionicons name={name} size={24} color={color} />
    </Button>
    <Text className="text-sm font-medium" style={{ color }}>
      {count}
    </Text>
  </View>
);

export const PostActionBar = ({
  liked,
  likeCount,
  commentCount,
  onLike,
  onComment,
}: PostActionBarProps) => {
  const { like, mutedForeground } = useThemeColors();

  return (
    <View className="-ml-2 flex-row gap-1.5">
      <ActionButton
        name={liked ? 'heart' : 'heart-outline'}
        label={liked ? 'Retirar gosto' : 'Gosto'}
        color={liked ? like : mutedForeground}
        count={likeCount}
        onPress={onLike}
      />
      <ActionButton
        name="chatbubble-outline"
        label="Comentários"
        color={mutedForeground}
        count={commentCount}
        onPress={onComment}
      />
    </View>
  );
};
