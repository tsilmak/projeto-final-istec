import { Text } from '@/components/ui/text';
import { useThemeColors } from '@/lib/theme';
import { Pressable, View } from 'react-native';
import type { PostComment } from './types';

type PostCommentsPreviewProps = {
  comments: PostComment[];
  totalCount?: number;
  onViewAll?: () => void;
};

export const PostCommentsPreview = ({
  comments,
  totalCount,
  onViewAll,
}: PostCommentsPreviewProps) => {
  const colors = useThemeColors();
  const total = totalCount ?? comments.length;
  const visibleComments = comments.slice(0, 2);
  const remainingCount = Math.max(0, total - visibleComments.length);

  if (total === 0) return null;

  return (
    <View className="w-full gap-1">
      {remainingCount > 0 && (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Ver os ${remainingCount} comentários restantes`}
          onPress={onViewAll}>
          <Text className="text-sm" style={{ color: colors.mutedForeground }}>
            Ver os {remainingCount} comentários restantes
          </Text>
        </Pressable>
      )}

      {visibleComments.map((comment) => (
        <Text
          key={comment.id}
          className="text-sm"
          numberOfLines={2}
          style={{ color: colors.foreground }}>
          <Text className="font-semibold">{comment.author} </Text>
          {comment.text}
        </Text>
      ))}
    </View>
  );
};
