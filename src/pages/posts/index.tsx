import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';

import { API_ENDPOINT } from '../../../const';
import { Post } from '../../features/post';

import type { Post as PostType } from '../../../types';
import type { GetServerSideProps, NextPage } from 'next';

type Posts = PostType[];

type Props = {
  posts: Posts;
};

const PostsIndex: NextPage<Props> = ({ posts }: Props) => {
  const theme = useTheme();
  return (
    <Box sx={{ borderRight: `1px solid ${theme.palette.divider}` }}>
      {posts.map(Post)}
    </Box>
  );
};
export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const res = await fetch(`${API_ENDPOINT}/posts`);
  const props = (await res.json()) as Props;

  return {
    props,
  };
};

export default PostsIndex;
