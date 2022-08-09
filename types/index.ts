export type Book = {
  title: string;
  imageUrl: string;
  description: string;
};

export type Review = {
  id: string;
  author: string;
  text: string;
};

export type User = {
  id: string;
  name: string;
  avatar_url: string;
};

type MediaBase = {
  height: number;
  id: string;
  preview_image_url: string;
  type: 'photo' | 'video' | 'animated_gif';
  url: string;
  width: number;
  blur_data_url: string;
};

type MediaPhoto = MediaBase & {
  type: 'photo';
  alt_text: string;
};
type MediaVideo = MediaBase & {
  type: 'video';
  duration_ms: number;
};

type MediaAnimatedGif = MediaBase & {
  type: 'animated_gif';
  alt_text: string;
};

// type MediaPdf = MediaBase & {
//   type: 'pdf';
// };

export type Media = MediaPhoto | MediaVideo | MediaAnimatedGif;

export type Post = {
  attachments?: Media[];
  author: User;
  created_at: string;
  id: string;
  text: string;
  parent?: Post;
  replies?: Post[];
};
