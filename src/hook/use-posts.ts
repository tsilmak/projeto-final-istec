import { useState } from 'react';
import { Alert, Share } from 'react-native';
import type { Post, PostMenuAction } from '@/components/post/types';

const INITIAL_POSTS: Post[] = [
  {
    id: 'markos',
    authorName: 'MarkOS',
    timeAgo: 'Há 2 dias',
    following: false,
    liked: false,
    images: [
      'https://picsum.photos/seed/markos-1/800/1000',
      'https://picsum.photos/seed/markos-2/800/1000',
    ],
    imageAlts: [
      'Avião na pista visto através da janela do terminal.',
      'Passageiros à espera junto à janela do terminal.',
    ],
    likeCount: 24,
    commentCount: 2,
    comments: [
      { id: '1', author: 'ana.silva', text: 'Wow! 😍' },
      { id: '2', author: 'joao_m', text: 'Boa viagem!' },
    ],
  },
  {
    id: 'quinn',
    authorName: 'Quinn Choi',
    timeAgo: 'Há 2 dias',
    following: true,
    liked: false,
    images: [
      'https://picsum.photos/seed/quinn-1/800/1000',
      'https://picsum.photos/seed/quinn-2/800/1000',
    ],
    imageAlts: [
      'Passageiros à espera junto à janela do terminal.',
      'Avião na pista visto através da janela do terminal.',
    ],
    likeCount: 15,
    commentCount: 1,
    comments: [{ id: '3', author: 'pedro_s', text: 'Grande foto!' }],
  },
];

export function usePosts() {
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);

  const updatePost = (postId: string, update: (post: Post) => Post) => {
    setPosts((prev) => prev.map((post) => (post.id === postId ? update(post) : post)));
  };

  const onFollow = (postId: string) => {
    updatePost(postId, (post) => ({ ...post, following: true }));
  };

  const onLike = (postId: string) => {
    updatePost(postId, (post) => ({
      ...post,
      liked: !post.liked,
      likeCount: post.likeCount + (post.liked ? -1 : 1),
    }));
  };

  const onComment = (postId: string) => {
    console.log('Abrir comentários da publicação:', postId);
  };

  const onMenuAction = (postId: string, action: PostMenuAction) => {
    switch (action) {
      case 'share':
        Share.share({ message: 'Vê esta publicação na app.' }).catch(() =>
          Alert.alert('Não foi possível partilhar.')
        );
        break;
      case 'unfollow':
        updatePost(postId, (post) => ({ ...post, following: false }));
        break;
      case 'report':
        Alert.alert('Denunciar publicação', 'Queres denunciar esta publicação?', [
          { text: 'Cancelar', style: 'cancel' },
          {
            text: 'Denunciar',
            style: 'destructive',
            onPress: () => console.log('Denunciar publicação:', postId),
          },
        ]);
        break;
    }
  };

  return { posts, onFollow, onLike, onComment, onMenuAction };
}
