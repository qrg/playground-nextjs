import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Image from 'next/image';

import type { Media } from '../../../types';

type Props = {
  attachments: Media[];
};

const mediaLayout: {
  [k: number]: {
    cols: number;
  };
} = {
  1: { cols: 1 },
  2: { cols: 2 },
  3: { cols: 2 },
  4: { cols: 2 },
};

export const Attachments = ({ attachments }: Props) => {
  const mediaCount = attachments.length;
  const { cols } = mediaLayout[mediaCount];
  return (
    <ImageList sx={{ width: '100%', height: 320 }} cols={cols}>
      {attachments.map((attachment) => {
        const { url, width, height, id, type, blur_data_url } = attachment;
        if (type === 'photo') {
          const { alt_text } = attachment;
          return (
            <ImageListItem key={id} sx={{ objectFit: 'cover' }}>
              <Image
                key={id}
                src={url}
                layout="fill"
                objectFit="cover"
                width={width}
                height={height}
                alt={alt_text}
                placeholder="blur"
                blurDataURL={blur_data_url}
                style={{ borderRadius: '4px' }}
              />
            </ImageListItem>
          );
        }
        return null;
      })}
    </ImageList>
  );
};
