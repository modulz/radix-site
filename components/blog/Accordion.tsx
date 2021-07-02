import React from 'react';
import { theme, styled, keyframes, Text, Box, Switch, Flex, Link } from '@modulz/design-system';
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
      boxShadow: `0 0 0 2px ${theme.colors.violet7.value}`,
    },
    '&[data-state="closed"]': {
      boxShadow: `0 0 0 2px ${theme.colors.slate7.value}`,
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
  color: theme.colors.slate11.value,

  '&[data-state="closed"]': {
    backgroundColor: theme.colors.slate3.value,
  },

  '&[data-state="open"]': {
    backgroundColor: theme.colors.violet3.value,
    color: theme.colors.violet11.value,
  },

  '&:hover': {
    backgroundColor: theme.colors.slate4.value,
    '&[data-state="open"]': {
      backgroundColor: theme.colors.violet4.value,
    },
  },

  '&:focus': {
    outline: 'none',
  },
});

const StyledPanel = styled(Accordion.Content, {
  overflow: 'hidden',
  lineHeight: '19px',
  color: theme.colors.slate11.value,
  backgroundColor: theme.colors.violet2.value,

  '.with-animation &': {
    '&[data-state="open"]': {
      animation: `${slideDown} 300ms cubic-bezier(0.87, 0, 0.13, 1)`,
    },
    '&[data-state="closed"]': {
      animation: `${slideUp} 300ms cubic-bezier(0.87, 0, 0.13, 1)`,
    },
  },
});

const AccordionChevron = styled(ChevronDownIcon, {
  transition: 'transform 300ms cubic-bezier(0.87, 0, 0.13, 1)',
  color: theme.colors.slate10.value,

  '[data-state=open] &': {
    transform: 'rotate(180deg)',
    color: theme.colors.violet10.value,
  },
});

export const AccordionDemo = (props) => {
  const [value, setValue] = React.useState<string | string[]>(['item-1', 'item-3']);

  const [showChevrons, setShowChevrons] = React.useState(true);
  const [allowMultiple, setAllowMultiple] = React.useState(true);
  const [preventClose, setPreventClose] = React.useState(false);
  const [withAnimation, setWithAnimation] = React.useState(true);

  return (
    <Box
      className={withAnimation ? 'with-animation' : ''}
      css={{
        background: 'linear-gradient(330deg, hsl(272,53%,50%) 0%, hsl(226,68%,56%) 100%)',
        position: 'relative',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        py: '$9',
        mx: '-$5',
        height: 600,

        '@bp2': { mx: 0, borderRadius: '$2' },
        '@bp4': { mx: '-$8' },
      }}
    >
      <Box
        css={{
          borderRadius: '$1',
          px: '$2',
          position: 'absolute',
          top: '$3',
          left: '$3',
          backgroundColor: 'rgba(0 0 0 / 0.1)',
          width: 200,
        }}
      >
        <Flex as="label" css={{ my: '$2', alignItems: 'center' }}>
          <Text size="2" css={{ userSelect: 'none', color: 'white', flex: '1' }}>
            Show chevrons
          </Text>
          <Switch
            css={{ border: 'none' }}
            checked={showChevrons}
            onCheckedChange={(event) => setShowChevrons(event.target.checked)}
          />
        </Flex>
        <Flex as="label" css={{ my: '$2', alignItems: 'center' }}>
          <Text size="2" css={{ userSelect: 'none', color: 'white', flex: '1' }}>
            Allow multiple
          </Text>
          <Switch
            css={{ border: 'none' }}
            checked={allowMultiple}
            onCheckedChange={(event) => {
              setValue(['item-1', 'item-2']);
              setAllowMultiple(event.target.checked);
            }}
          />
        </Flex>
        <Flex as="label" css={{ my: '$2', alignItems: 'center' }}>
          <Text size="2" css={{ userSelect: 'none', color: 'white', flex: '1' }}>
            With animation
          </Text>
          <Switch
            css={{ border: 'none' }}
            checked={withAnimation}
            onCheckedChange={(event) => {
              setWithAnimation(event.target.checked);
            }}
          />
        </Flex>
        <Flex as="label" css={{ my: '$2', alignItems: 'center' }}>
          <Text size="2" css={{ userSelect: 'none', color: 'white', flex: '1' }}>
            Prevent closing
          </Text>
          <Switch
            css={{ border: 'none' }}
            checked={preventClose}
            onCheckedChange={(event) => {
              if (value === '' || value.length === 0) {
                setValue('item-1');
              }
              setPreventClose(event.target.checked);
            }}
          />
        </Flex>
      </Box>

      <Box>
        <Text size="3" css={{ color: 'white', fontWeight: 500, mb: '$3', textAlign: 'center' }}>
          Accordion Demo: FAQ
        </Text>

        <StyledAccordion
          type={allowMultiple ? 'multiple' : 'single'}
          {...props}
          value={value}
          onValueChange={(newValue) => {
            if (preventClose && (newValue === '' || newValue.length === 0)) {
              return;
            }
            setValue(newValue);
          }}
        >
          <StyledItem value="item-1">
            <StyledHeader>
              <StyledButton>
                Is it accessible? {showChevrons && <AccordionChevron aria-hidden />}
              </StyledButton>
            </StyledHeader>
            <StyledPanel>
              <Box css={{ padding: '$2 $3' }}>
                <Text size="3" css={{ color: 'inherit', lineHeight: 'inherit' }}>
                  Yes. The Radix Accordion component adheres to the{' '}
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
                Is it unstyled? {showChevrons && <AccordionChevron aria-hidden />}
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
                Can it be animated? {showChevrons && <AccordionChevron aria-hidden />}
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
          <StyledItem value="item-4">
            <StyledHeader>
              <StyledButton>
                Can it be extended? {showChevrons && <AccordionChevron aria-hidden />}
              </StyledButton>
            </StyledHeader>
            <StyledPanel>
              <Box css={{ padding: '$2 $3' }}>
                <Text size="3" css={{ color: 'inherit', lineHeight: 'inherit' }}>
                  Absolutely. You can extend it to fit your product's needs.
                </Text>
              </Box>
            </StyledPanel>
          </StyledItem>
        </StyledAccordion>
      </Box>
    </Box>
  );
};
