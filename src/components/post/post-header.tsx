import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { useThemeColors } from '@/lib/theme';
import { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';

type PostHeaderProps = {
  authorName: string;
  timeAgo: string;
  onMenuPress?: () => void;
};

const getInitials = (name: string) =>
  name
    .trim()
    .split(/\s+/)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

export const PostHeader = ({ authorName, timeAgo, onMenuPress }: PostHeaderProps) => {
  const { mutedForeground } = useThemeColors();

  return (
    <View className="flex-row items-center gap-3 px-4 py-3.5">
      <Avatar alt={authorName} className="size-14">
        <AvatarFallback>
          <Text className="font-semibold">{getInitials(authorName)}</Text>
        </AvatarFallback>
      </Avatar>

      <View className="flex-1">
        <Text className="text-lg font-semibold leading-7" numberOfLines={1}>
          {authorName}
        </Text>
        <Text className="text-muted-foreground">{timeAgo}</Text>
      </View>

      <Button
        variant="ghost"
        size="icon"
        className="rounded-full"
        accessibilityLabel="Mais opções"
        onPress={onMenuPress}>
        <Ionicons name="ellipsis-horizontal" size={24} color={mutedForeground} />
      </Button>
    </View>
  );
};
