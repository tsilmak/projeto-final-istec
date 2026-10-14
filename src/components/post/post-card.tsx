import { Card, CardFooter, CardHeader } from '@/components/ui/card';
import { View } from 'react-native';
import { ImageCarousel } from '../media/image-carousel';
import { PostActionBar } from './post-action-bar';
import { PostCommentsPreview } from './post-comments-preview';
import { PostHeader } from './post-header';
import type { PostCardProps } from './types';

export const PostCard = ({ post, onLike, onComment, onFollow, onMenuAction }: PostCardProps) => {
  return (
    <Card className="gap-0 p-0">
      <CardHeader className="px-0">
        <PostHeader
          authorName={post.authorName}
          timeAgo={post.timeAgo}
          following={post.following}
          onFollow={() => onFollow(post.id)}
          onMenuAction={(action) => onMenuAction(post.id, action)}
        />
      </CardHeader>

      <ImageCarousel images={post.images} imageAlts={post.imageAlts} />

      <CardFooter className="border-t border-border px-4 py-2">
        <View className="w-full gap-2">
          <PostActionBar
            liked={post.liked}
            likeCount={post.likeCount}
            commentCount={post.commentCount}
            onLike={() => onLike(post.id)}
            onComment={() => onComment(post.id)}
          />
          <PostCommentsPreview
            comments={post.comments}
            totalCount={post.commentCount}
            onViewAll={() => onComment(post.id)}
          />
        </View>
      </CardFooter>
    </Card>
  );
};
