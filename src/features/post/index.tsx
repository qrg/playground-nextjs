import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Text from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import Image from 'next/image';

import { Time } from '../Time';

import { Attachments } from './Attachments';

import type { Post as PostType } from '../../../types';

const AVATAR_BLUR_DATA_URL =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNctftMPQAG+gKyb0k1KQAAAABJRU5ErkJggg==';

export const Post = ({
  id,
  text,
  author,
  created_at,
  attachments,
}: PostType) => {
  const theme = useTheme();
  return (
    <Box
      component="article"
      key={id}
      sx={{
        display: 'flex',
        padding: '16px',
        borderBottom: `1px solid ${theme.palette.divider}`,
        alignItems: 'stretch',
      }}
    >
      <Box
        sx={{
          flexBasis: '52px',
          minWidth: '52px',
        }}
      >
        <Avatar sx={{ width: '40px', height: '40px' }}>
          <Image
            src={author.avatar_url}
            width={40}
            height={40}
            layout="fill"
            alt={author.name}
            placeholder="blur"
            blurDataURL={AVATAR_BLUR_DATA_URL}
          />
        </Avatar>
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <Box
          sx={{
            display: 'flex',
            marginBottom: '8px',
          }}
        >
          <Text variant="body1" fontWeight="700">
            {author.name}
          </Text>
          <Text variant="body1" sx={{ marginLeft: '8px' }}>
            <Time datetime={created_at} />
          </Text>
        </Box>
        <Text
          variant="body1"
          sx={{
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: '3',
            WebkitBoxOrient: 'vertical',
            whiteSpace: 'pre-line',
          }}
        >
          {text}
        </Text>
        {attachments && attachments.length >= 1 && (
          <Attachments attachments={attachments} />
        )}
      </Box>
    </Box>
  );
};
