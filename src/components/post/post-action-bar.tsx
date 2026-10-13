import { useState, type ComponentProps } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Text, View } from 'react-native';
import { useThemeColors } from '@/lib/theme';
import { Button } from '../ui/button';
import type { PostActionBarProps } from './types';

type PostIconButtonProps = {
  name: ComponentProps<typeof Ionicons>['name'];
  label: string;
  color: string;
  onPress: () => void;
  count: number;
};

const PostActionButton = ({ name, label, color, onPress, count }: PostIconButtonProps) => (
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
  postId,
  likeCount = 0,
  commentCount = 0,
  onLike,
  onComment,
}: PostActionBarProps) => {
  const { like, mutedForeground } = useThemeColors();
  const [liked, setLiked] = useState(false);

  return (
    <View className="w-full flex-row">
      <View className="flex-row gap-1.5">
        <PostActionButton
          name={liked ? 'heart' : 'heart-outline'}
          label={liked ? 'Retirar gosto' : 'Gosto'}
          color={liked ? like : mutedForeground}
          count={likeCount + (liked ? 1 : 0)}
          onPress={() => {
            setLiked(!liked);
            onLike?.(postId, !liked);
          }}
        />
        <PostActionButton
          name="chatbubble-outline"
          label="Comentários"
          color={mutedForeground}
          count={commentCount}
          onPress={() => onComment?.(postId)}
        />
      </View>
    </View>
  );
};
