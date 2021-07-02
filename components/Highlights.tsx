import React from 'react';
import { Text, Box, Flex, Heading, Separator, Link } from '@modulz/design-system';
import { CheckIcon } from '@radix-ui/react-icons';
import { ExternalIcon } from '@components/ExternalIcon';
import { Select } from '@components/Select';
import { useRouter } from 'next/router';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { FrontmatterContext } from './MDXComponents';

export function Highlights({ features }) {
  const router = useRouter();
  const frontmatter = React.useContext(FrontmatterContext);

  const publishedName = frontmatter.publishedName || frontmatter.name;

  return (
    <Flex
      css={{
        fd: 'column',
        mt: '$4',
        '@bp1': {
          fd: 'row',
          mt: '$7',
        },
      }}
    >
      <Box
        css={{
          mb: '$5',
          '@bp1': {
            flex: '1',
            mr: '$5',
          },
        }}
      >
        <Heading as="h2" css={{ mb: '$4' }}>
          Features
        </Heading>

        <Box as="ul" css={{ p: 0, m: 0 }}>
          {features.map((feature, i) => (
            <Flex as="li" key={i} css={{ mt: '$2' }}>
              <Box
                css={{
                  width: '25px',
                  height: '25px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '$green4',
                  borderRadius: '50%',
                  color: '$green11',
                  marginRight: '15px',
                  flexShrink: 0,
                }}
              >
                <CheckIcon />
              </Box>
              <Text size="3" css={{ lineHeight: '25px' }}>
                {feature}
              </Text>
            </Flex>
          ))}
        </Box>
      </Box>

      <Box css={{ width: 'fit-content' }} as="nav" aria-labelledby="site-component-info-heading">
        <VisuallyHidden as="h2" id="site-component-info-heading">
          Component Reference Links
        </VisuallyHidden>
        <Separator size="2" css={{ mb: '$4', display: 'block', '@bp1': { display: 'none' } }} />
        <Flex css={{ mb: '$4', alignItems: 'baseline' }}>
          <Box css={{ mx: -5 }}>
            <Select
              value={frontmatter.version}
              onChange={(e) => router.push(`./${frontmatter.name}/${e.target.value}`)}
            >
              {(frontmatter.versions || []).map((v, i) => {
                return (
                  <option key={v} value={v}>
                    {v}
                    {i === 0 && ' (latest)'}
                  </option>
                );
              })}
            </Select>
          </Box>
        </Flex>
        <Separator size="2" css={{ mb: '$4', display: 'none', '@bp1': { display: 'block' } }} />
        <Box css={{ mb: '$2' }}>
          <Link
            variant="blue"
            href={`https://github.com/radix-ui/primitives/tree/main/packages/react/${publishedName}/src`}
            target="_blank"
          >
            <Flex css={{ display: 'inline-flex', position: 'relative' }}>
              <Text size="2" css={{ display: 'inline', lineHeight: '15px' }}>
                View source
              </Text>
              <Box as="span" css={{ ml: '$1', color: '$gray9' }}>
                <ExternalIcon />
              </Box>
            </Flex>
          </Link>
        </Box>
        <Box css={{ mb: '$2' }}>
          <Link
            variant="blue"
            href={`https://www.npmjs.com/package/@radix-ui/react-${publishedName}`}
            target="_blank"
          >
            <Flex css={{ display: 'inline-flex', position: 'relative' }}>
              <Text size="2" css={{ display: 'inline', lineHeight: '15px' }}>
                View on npm
              </Text>
              <Box as="span" css={{ ml: '$1', color: '$gray9' }}>
                <ExternalIcon />
              </Box>
            </Flex>
          </Link>
        </Box>
        <Box css={{ mb: '$2' }}>
          <Link
            variant="blue"
            href="https://github.com/radix-ui/primitives/issues/new/choose"
            target="_blank"
          >
            <Flex css={{ display: 'inline-flex', position: 'relative' }}>
              <Text size="2" css={{ display: 'inline', lineHeight: '15px' }}>
                Report an issue
              </Text>
              <Box as="span" css={{ ml: '$1', color: '$gray9' }}>
                <ExternalIcon />
              </Box>
            </Flex>
          </Link>
        </Box>

        {frontmatter.aria && (
          <Box css={{ mb: '$2' }}>
            <Link variant="blue" href={frontmatter.aria} target="_blank">
              <Flex css={{ display: 'inline-flex', position: 'relative' }}>
                <Text size="2" css={{ display: 'inline', lineHeight: '15px' }}>
                  ARIA design pattern
                </Text>
                <Box as="span" css={{ ml: '$1', color: '$gray9' }}>
                  <ExternalIcon />
                </Box>
              </Flex>
            </Link>
          </Box>
        )}
      </Box>
    </Flex>
  );
}
