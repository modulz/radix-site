import React from 'react';
import { styled, keyframes, Box, Text, Flex, Link, Switch, theme } from '@modulz/design-system';
import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDownIcon } from '@radix-ui/react-icons';

const slideDown = keyframes({
  from: { height: 0 },
  to: { height: 'var(--radix-accordion-content-height)' },
});

const slideUp = keyframes({
  from: { height: 'var(--radix-accordion-content-height)' },
  to: { height: 0 },
});

const StyledAccordion = styled(Accordion.Root, {
  backgroundColor: 'white',
  borderRadius: '$3',
  width: 320,
  overflow: 'hidden',
});

const StyledItem = styled(Accordion.Item, {
  margin: '$2',
  borderRadius: '$2',
  overflow: 'hidden',

  '&:focus-within': {
    '&[data-state="open"]': {
      boxShadow: `0 0 0 2px $colors$violet7`,
    },
    '&[data-state="closed"]': {
      boxShadow: `0 0 0 2px $colors$mauve7`,
    },
  },
});

const StyledHeader = styled(Accordion.Header, {
  margin: 0,
  display: 'flex',
});

const StyledButton = styled(Accordion.Trigger, {
  backgroundColor: 'transparent',
  border: 'none',
  padding: '$2 $3',
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  fontSize: '$3',
  color: '$mauve11',

  '&[data-state="closed"]': {
    backgroundColor: '$mauve3',
  },

  '&[data-state="open"]': {
    backgroundColor: '$violet4',
    color: '$violet11',
  },

  '&:hover': {
    backgroundColor: '$mauve4',
    '&[data-state="open"]': {
      backgroundColor: '$violet4',
    },
  },

  '&:focus': {
    outline: 'none',
  },
});

const StyledPanel = styled(Accordion.Content, {
  overflow: 'hidden',
  lineHeight: '19px',
  color: '$mauve11',
  backgroundColor: '$violet2',

  '&[data-state="open"]': {
    animation: `${slideDown} 300ms cubic-bezier(0.87, 0, 0.13, 1)`,
  },
  '&[data-state="closed"]': {
    animation: `${slideUp} 300ms cubic-bezier(0.87, 0, 0.13, 1)`,
  },
});

const AccordionChevron = styled(ChevronDownIcon, {
  transition: 'transform 300ms cubic-bezier(0.87, 0, 0.13, 1)',
  color: '$mauve10',

  '[data-state=open] &': {
    transform: 'rotate(180deg)',
    color: '$violet10',
  },
});

export const AccordionHero = (props) => {
  return (
    <Box
      className={`${theme}`}
      css={{
        background: 'linear-gradient(330deg, hsl(272,53%,50%) 0%, hsl(226,68%,56%) 100%)',
        position: 'relative',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        py: '$8',
        mx: '-$5',

        '@bp2': { mx: 0, borderRadius: '$2' },
        '@bp4': { mx: '-$8' },
      }}
    >
      <Box>
        <StyledAccordion type="single" defaultValue="item-1" {...props}>
          <StyledItem value="item-1">
            <StyledHeader>
              <StyledButton>
                Is it accessible? <AccordionChevron aria-hidden />
              </StyledButton>
            </StyledHeader>
            <StyledPanel>
              <Box css={{ padding: '$2 $3' }}>
                <Text size="3" css={{ color: 'inherit', lineHeight: 'inherit' }}>
                  Yes. It adheres to the{' '}
                  <Link
                    variant="blue"
                    href="https://www.w3.org/TR/wai-aria-practices-1.2/#accordion"
                  >
                    WAI-ARAI
                  </Link>{' '}
                  design pattern.
                </Text>
              </Box>
            </StyledPanel>
          </StyledItem>

          <StyledItem value="item-2">
            <StyledHeader>
              <StyledButton>
                Is it unstyled? <AccordionChevron aria-hidden />
              </StyledButton>
            </StyledHeader>
            <StyledPanel>
              <Box css={{ padding: '$2 $3' }}>
                <Text size="3" css={{ color: 'inherit', lineHeight: 'inherit' }}>
                  Yes. It's unstyled by default, giving you full freedom over the look and feel.
                </Text>
              </Box>
            </StyledPanel>
          </StyledItem>

          <StyledItem value="item-3">
            <StyledHeader>
              <StyledButton>
                Can it be animated? <AccordionChevron aria-hidden />
              </StyledButton>
            </StyledHeader>
            <StyledPanel>
              <Box css={{ padding: '$2 $3' }}>
                <Text size="3" css={{ color: 'inherit', lineHeight: 'inherit' }}>
                  Yes! You can animate the Accordion with CSS or JavaScript.
                </Text>
              </Box>
            </StyledPanel>
          </StyledItem>
        </StyledAccordion>
      </Box>
    </Box>
  );
};
