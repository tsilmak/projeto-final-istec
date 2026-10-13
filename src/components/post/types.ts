import type { ImageSourcePropType } from 'react-native';

export type PostComment = {
  id: string;
  author: string;
  text: string;
};

export type Post = {
  id: string;
  authorName: string;
  timeAgo: string;
  images: ImageSourcePropType[];
  imageAlts?: string[];
  likeCount?: number;
  commentCount?: number;
  comments?: PostComment[];
};

export type PostActionHandlers = {
  onLike?: (postId: string, liked: boolean) => void;
  onComment?: (postId: string) => void;
  onShare?: (postId: string) => void;
  onSave?: (postId: string, saved: boolean) => void;
};

export type PostCardProps = PostActionHandlers & {
  post: Post;
};

export type PostActionBarProps = PostActionHandlers & {
  postId: Post['id'];
  likeCount?: number;
  commentCount?: number;
};
