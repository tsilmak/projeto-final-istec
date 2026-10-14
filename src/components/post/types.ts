import { HomeFeed } from '@/context/home/feed-context';

export type Post = {
  id: string;
  authorName: string;
  timeAgo: string;
  images: string[];
  imageAlts: string[];
  following: boolean;
  liked: boolean;
  likeCount: number;
  commentCount: number;
  comments: PostComment[];
  feeds: HomeFeed[];
};

export type PostComment = {
  id: string;
  author: string;
  text: string;
};

export type PostMenuAction = 'share' | 'unfollow' | 'report';

export type PostHeaderProps = {
  authorName: string;
  timeAgo: string;
  following: boolean;
  onFollow: () => void;
  onMenuAction: (action: PostMenuAction) => void;
};

export type PostActionBarProps = {
  liked: boolean;
  likeCount: number;
  commentCount: number;
  onLike: () => void;
  onComment: () => void;
};

export type PostCardProps = {
  post: Post;
  onLike: (postId: string) => void;
  onComment: (postId: string) => void;
  onFollow: (postId: string) => void;
  onMenuAction: (postId: string, action: PostMenuAction) => void;
};
