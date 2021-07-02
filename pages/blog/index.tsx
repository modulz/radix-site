import React from 'react';
import {
  Box,
  Text,
  Container,
  Heading,
  Paragraph,
  Section,
  Flex,
  Separator,
  Link,
} from '@modulz/design-system';
import { authors } from '@data/authors';
import { parseISO, format } from 'date-fns';
import { TitleAndMetaTags } from '@components/TitleAndMetaTags';
import { getAllFrontmatter } from '@lib/mdx';

import type { Frontmatter } from 'types/frontmatter';

export default function BlogPage({ posts }: { posts: Frontmatter[] }) {
  return (
    <Box css={{ py: '$4', mt: '$4' }}>
      <Section
        size={{
          '@initial': '2',
          '@bp1': '3',
        }}
        css={{
          pt: '$3',
          '@bp2': {
            pt: '$6',
          },
        }}
      >
        <Container size="3">
          <Heading size="4" css={{ mb: '$3', '@bp2': { ta: 'center' } }}>
            Blog
          </Heading>
          <Paragraph
            size="2"
            as="p"
            css={{
              mb: '$6',
              color: '$sage11',
              '@bp2': {
                mx: 230,
                ta: 'center',
                mb: '$7',
              },
            }}
          >
            More about what we're doing.
          </Paragraph>
        </Container>
      </Section>

      <TitleAndMetaTags title="Blog — Radix UI" description="Blog articles about Radix" />

      <Container size="3" css={{ maxWidth: '780px', position: 'relative' }}>
        {posts.map((frontmatter) => (
          <Box
            as="a"
            key={frontmatter.slug}
            href={frontmatter.slug}
            css={{
              textDecoration: 'none',
              color: 'inherit',
            }}
          >
            <Box>
              <Text as="h6" size="4" css={{ fontWeight: 500, mb: '$1' }}>
                {frontmatter.metaTitle}
              </Text>
              <Text as="p" size="3" css={{ color: '$hiContrast' }}>
                {frontmatter.metaDescription}
              </Text>
              <Flex css={{ mt: '$4', mb: '$7', alignItems: 'center' }}>
                <Text
                  as="p"
                  size="3"
                  css={{ color: '$slate900', lineHeight: 0, whiteSpace: 'nowrap' }}
                >
                  <Link
                    href={`https://twitter.com/${authors[frontmatter.by || 'pedro'].twitter}`}
                    rel="noopener noreferrer"
                    variant="subtle"
                  >
                    {authors[frontmatter.by || 'pedro'].name}
                  </Link>
                </Text>
                <Separator orientation="vertical" css={{ mx: '$2' }} />
                <Text
                  as="time"
                  size="3"
                  css={{ color: '$slate900', lineHeight: 0, whiteSpace: 'nowrap' }}
                >
                  {format(parseISO(frontmatter.publishedAt), 'MMMM yyyy')}
                </Text>
                <Flex css={{ alignItems: 'center', display: 'none', '@bp2': { display: 'flex' } }}>
                  <Separator orientation="vertical" css={{ mx: '$2' }} />
                  <Text size="3" css={{ color: '$slate900', lineHeight: 0 }}>
                    {frontmatter.readingTime.text}
                  </Text>
                </Flex>
              </Flex>
            </Box>
          </Box>
        ))}
      </Container>
    </Box>
  );
}

export async function getStaticProps(context) {
  const posts = getAllFrontmatter('blog');
  return { props: { posts } };
}
