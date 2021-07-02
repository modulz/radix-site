import React from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import {
  Box,
  Container,
  Text,
  Badge,
  Flex,
  Button,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  Separator,
  Link,
} from '@modulz/design-system';
import { RadixLogo } from './RadixLogo';
import { PlusIcon } from '@radix-ui/react-icons';
import { ThemeToggle } from '@components/ThemeToggle';

export const Header = (props) => {
  const router = useRouter();
  const isPrimitives = router.pathname.includes('/primitives');
  const isColors = router.pathname.includes('/colors');

  return (
    <Box as="header">
      <Container size="4">
        <Flex css={{ height: '$7', alignItems: 'center' }}>
          <NextLink href="/" passHref>
            <Box
              as="a"
              css={{
                color: '$hiContrast',
                display: 'inline-flex',
                '&:focus': { boxShadow: 'none' },
              }}
            >
              <span
                style={{
                  position: 'absolute',
                  width: 1,
                  height: 1,
                  padding: 0,
                  margin: -1,
                  overflow: 'hidden',
                  clip: 'rect(0, 0, 0, 0)',
                  whiteSpace: 'nowrap',
                  border: 0,
                }}
              >
                Radix homepage
              </span>
              <RadixLogo label="Radix Homepage" />
            </Box>
          </NextLink>
          <Flex css={{ ml: '$3', alignItems: 'center' }}>
            {isPrimitives && (
              <>
                <Text size="2">Primitives</Text>
                <Badge variant="yellow" css={{ ml: '$2' }}>
                  Alpha
                </Badge>
              </>
            )}
            {isColors && (
              <>
                <Text size="2">Colors</Text>
              </>
            )}
          </Flex>
          <Flex css={{ ml: 'auto', gap: '$4', alignItems: 'center' }}>
            <DropdownMenu>
              <DropdownMenuTrigger
                as={Button}
                size="2"
                ghost
                css={{ gap: '$1', fontWeight: 400, color: '$slate11', mr: '-$2' }}
              >
                Product
                <PlusIcon />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onSelect={() => router.push('/docs/primitives')}>
                  Primitives
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => router.push('/colors')}>Colors</DropdownMenuItem>
                <DropdownMenuItem onSelect={() => router.push('https://icons.modulz.app')}>
                  Icons
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => router.push('https://stitches.dev')}>
                  Stitches
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Separator orientation="vertical" />
            <NextLink href="/blog" passHref>
              <Link variant="subtle" css={{ fontSize: '$3' }}>
                Blog
              </Link>
            </NextLink>
            <Separator orientation="vertical" />
            <ThemeToggle />
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};
