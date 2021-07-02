import React from 'react';
import { Box, Text } from '@modulz/design-system';

export const VideoPlaceholder = (props) => {
  return (
    <Box
      css={{
        boxShadow: '0 0 0 1px $colors$slate700',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: '$9',
        mx: '-$5',
        height: 400,

        '@bp2': { borderRadius: '$2' },
        '@bp3': {
          mx: '-$8',
          height: 500,
        },
      }}
    >
      <Text
        size={{ '@initial': '7', '@bp2': '9' }}
        css={{
          fontWeight: 500,
          transform: 'rotate(-25deg)',
          background: '-webkit-linear-gradient(330deg, hsl(272,53%,50%) 0%, hsl(226,68%,56%) 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          userSelect: 'none',
        }}
      >
        Video placeholder
      </Text>
    </Box>
  );
};
