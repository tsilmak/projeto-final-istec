import { Card, CardFooter, CardHeader } from '@/components/ui/card';
import { View } from 'react-native';
import { PostActionBar } from './post-action-bar';
import { PostCommentsPreview } from './post-comments-preview';
import type { PostCardProps, PostComment } from './types';
import { ImageCarousel } from '../media/image-carousel';
import { PostHeader } from './post-header';

const MOCK_COMMENTS: PostComment[] = [
  { id: '1', author: 'ana.silva', text: 'Wow! 😍' },
  { id: '2', author: 'joao_m', text: 'Texto ' },
];

export const PostCard = ({ post, onLike, onComment, onShare, onSave }: PostCardProps) => {
  const comments = post.comments ?? MOCK_COMMENTS;
  const commentCount = post.commentCount ?? (post.comments ? comments.length : 12);
  const likeCount = post.likeCount ?? 24;

  return (
    <Card className="gap-0 p-0">
      <CardHeader className="px-0">
        <PostHeader authorName={post.authorName} timeAgo={post.timeAgo} />
      </CardHeader>

      <ImageCarousel images={post.images} imageAlts={post.imageAlts} />

      <CardFooter className="border-t border-border px-4 py-2">
        <View className="w-full gap-2">
          <PostActionBar
            postId={post.id}
            likeCount={likeCount}
            commentCount={commentCount}
            onLike={onLike}
            onComment={onComment}
            onShare={onShare}
            onSave={onSave}
          />
          <PostCommentsPreview
            comments={comments}
            totalCount={commentCount}
            onViewAll={() => onComment?.(post.id)}
          />
        </View>
      </CardFooter>
    </Card>
  );
};
