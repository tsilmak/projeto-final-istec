import { useCallback } from 'react';
import { FlatList, View, type ListRenderItem } from 'react-native';
import { PostCard } from '@/components/post/post-card';
import type { Post } from '@/components/post/types';
import { Text } from '@/components/ui/text';
import { useHomeFeed } from '@/context/home/feed-context';
import { usePosts } from '@/hook/use-posts';

const PostSeparator = () => <View className="h-5" />;

export default function HomeScreen() {
  const { activeFeed } = useHomeFeed();
  const { posts, onFollow, onLike, onComment, onMenuAction } = usePosts();

  const feedPosts = activeFeed === 'Amigos' ? posts : [];

  const renderItem: ListRenderItem<Post> = useCallback(
    ({ item }) => (
      <PostCard
        post={item}
        onFollow={onFollow}
        onLike={onLike}
        onComment={onComment}
        onMenuAction={onMenuAction}
      />
    ),
    [onFollow, onLike, onComment, onMenuAction]
  );

  return (
    <View className="flex-1">
      <FlatList
        data={feedPosts}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 24 }}
        ItemSeparatorComponent={PostSeparator}
        ListEmptyComponent={
          <Text className="mt-6 text-center text-muted-foreground">
            {activeFeed === 'Ginásio'
              ? 'Ainda não há publicações no feed do Ginásio.'
              : 'Ainda não há publicações de amigos.'}
          </Text>
        }
      />
    </View>
  );
}
