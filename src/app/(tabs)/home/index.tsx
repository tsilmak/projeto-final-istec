import { Text } from '@/components/ui/text';
import type { Post } from '@/components/post/types';
import { ScrollView, View } from 'react-native';
import { PostCard } from '@/components/post/post-card';
import { useHomeFeed } from '@/context/home/feed-context';

const airportPhoto = require('../../../../assets/feed-post-airport-gate.jpg');
const terminalPhoto = require('../../../../assets/feed-post-airport-pexels.jpg');

const posts: Post[] = [
  {
    id: 'markos',
    authorName: 'MarkOS',
    timeAgo: 'Há 2 dias',
    images: [airportPhoto, terminalPhoto],
    imageAlts: [
      'Avião na pista visto através da janela do terminal.',
      'Passageiros à espera junto à janela do terminal.',
    ],
  },
  {
    id: 'quinn',
    authorName: 'Quinn Choi',
    timeAgo: 'Há 2 dias',
    images: [terminalPhoto, airportPhoto],
    imageAlts: [
      'Passageiros à espera junto à janela do terminal.',
      'Avião na pista visto através da janela do terminal.',
    ],
  },
];

export default function HomeScreen() {
  const { activeFeed } = useHomeFeed();

  return (
    <View className="flex-1">
      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 24 }}>
        <View className="gap-5">
          {activeFeed === 'Amigos' ? (
            posts.map((post) => <PostCard key={post.id} post={post} />)
          ) : (
            <Text className="text-center text-muted-foreground">
              Ainda não há publicações no feed do Ginásio.
            </Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
