import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { useThemeColors } from '@/lib/theme';
import { Icon } from '@expo/ui';
import { MenuView } from '@expo/ui/community/menu';
import { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';
import type { PostHeaderProps, PostMenuAction } from './types';

const shareIcon = Icon.select({
  ios: 'square.and.arrow.up',
  android: import('@expo/material-symbols/share.xml'),
});

const unfollowIcon = Icon.select({
  ios: 'person.badge.minus',
  android: import('@expo/material-symbols/person_remove.xml'),
});

const reportIcon = Icon.select({
  ios: 'flag',
  android: import('@expo/material-symbols/flag.xml'),
});

const getInitials = (name: string) =>
  name
    .trim()
    .split(/\s+/)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

export const PostHeader = ({
  authorName,
  timeAgo,
  following,
  onFollow,
  onMenuAction,
}: PostHeaderProps) => {
  const colors = useThemeColors();

  return (
    <View className="flex-row items-center gap-3 px-4 py-3.5">
      <Avatar alt={authorName} className="size-14">
        <AvatarFallback>
          <Text className="font-semibold">{getInitials(authorName)}</Text>
        </AvatarFallback>
      </Avatar>

      <View className="flex-1 flex-row items-center gap-3">
        <View className="shrink">
          <Text className="text-lg font-semibold leading-7" numberOfLines={1}>
            {authorName}
          </Text>
          <Text className="text-muted-foreground">{timeAgo}</Text>
        </View>

        {!following && (
          <Button
            size="sm"
            variant="secondary"
            className="rounded-full px-4"
            accessibilityLabel={`Seguir ${authorName}`}
            onPress={onFollow}>
            <Text className="text-sm font-semibold">Seguir</Text>
          </Button>
        )}
      </View>

      <MenuView
        actions={[
          { id: 'share', title: 'Partilhar publicação', image: shareIcon },
          {
            id: 'unfollow',
            title: 'Deixar de seguir',
            image: unfollowIcon,
            attributes: { hidden: !following },
          },
          {
            id: 'report',
            title: 'Denunciar',
            image: reportIcon,
            attributes: { destructive: true },
          },
        ]}
        onPressAction={(e) => onMenuAction(e.nativeEvent.event as PostMenuAction)}>
        <Button accessibilityLabel="Mais opções" variant="ghost" size="icon" className="h-8 w-8">
          <Ionicons name="ellipsis-horizontal" size={24} color={colors.foreground} />
        </Button>
      </MenuView>
    </View>
  );
};
