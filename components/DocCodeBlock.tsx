import React from 'react';
import { Box, Button } from '@modulz/design-system';
import copy from 'copy-to-clipboard';
import { Pre } from './Pre';

export function DocCodeBlock({
  className,
  children,
  id,
  showLineNumbers = false,
  isHero = false,
  isCollapsible = false,
  variant,
  isHighlightingLines,
}) {
  const [isCollapsed, setIsCollapsed] = React.useState(isCollapsible);
  const [isCopied, setIsCopied] = React.useState(false);
  const preRef = React.useRef(null);

  React.useEffect(() => {
    if (isCopied && preRef.current) {
      const codeElement = preRef.current.querySelector('code');
      const codeToCopy = codeElement.innerText.replace(/\n+/g, '\n');
      copy(codeToCopy);
    }
    setTimeout(() => setIsCopied(false), 1000);
  }, [preRef, isCopied]);

  return (
    <Box>
      {isCollapsible && (
        <Box
          data-collapsible
          css={{
            textAlign: 'right',
            padding: '$2',
            backgroundColor: '$violet3',
            // boxShadow: 'inset 0 0 0 1px $colors$violet4',

            ...(isCollapsed
              ? { borderRadius: '$3' }
              : {
                  borderTopLeftRadius: '$3',
                  borderTopRightRadius: '$3',
                  boxShadow: 'inset 0 -1px 0 0 $colors$violet5',
                }),

            ...(isHero
              ? {
                  borderTopLeftRadius: 0,
                  borderTopRightRadius: 0,
                  '@bp3': { mx: '-$7' },
                  '@bp4': { mx: '-$8' },
                }
              : {}),
          }}
        >
          <Button ghost onClick={() => setIsCollapsed(!isCollapsed)}>
            {isCollapsed ? 'Show' : 'Hide'} code
          </Button>
        </Box>
      )}

      <Box
        css={{
          my: '$5',
          overflow: 'auto',
          position: 'relative',
          // boxShadow: 'inset 0 0 0 1px $colors$violet4',
          borderRadius: '$3',
          ...(isCollapsible && !isCollapsed
            ? {
                borderTopLeftRadius: '0',
                borderTopRightRadius: '0',
              }
            : {}),
          ...(isHero
            ? {
                '@bp3': { mx: '-$7' },
                '@bp4': { mx: '-$8' },
              }
            : {}),

          ...(isCollapsed ? { display: 'none' } : { marginTop: 0 }),
        }}
      >
        <Pre
          ref={preRef}
          data-invert-line-highlight={isHighlightingLines}
          data-line-numbers={showLineNumbers}
          variant={variant}
          className={className}
          id={id}
          css={{
            float: 'left',
            minWidth: '100%',
            $$outline: 'none',
            borderRadius: 0,
            ...(isHero ? { maxHeight: 400 } : {}),
          }}
        >
          <div>
            <code className={className} children={children} />
          </div>
        </Pre>
        <Button
          ghost
          css={{
            display: 'none',
            position: 'absolute',
            top: '$1',
            right: '$1',
            backgroundColor: '$violetA2',
            '@bp1': { display: 'inline-flex' },
          }}
          onClick={() => setIsCopied(true)}
        >
          {isCopied ? 'Copied!' : 'Copy'}
        </Button>
      </Box>
    </Box>
  );
}
