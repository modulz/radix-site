import React from 'react';
import { getMDXComponent } from 'mdx-bundler/client';
import { Box } from '@modulz/design-system';
import { TitleAndMetaTags } from '@components/TitleAndMetaTags';
import { MDXProvider, components } from '@components/MDXComponents';
import { getAllFrontmatter, getMdxBySlug } from '@lib/mdx';
import { RemoveScroll } from 'react-remove-scroll';
import { QuickNav } from '@components/QuickNav';
import { ColorGrid } from '@components/ColorGrid';
import {
  ColorScale01,
  ColorScale02,
  ColorScale03,
  ColorScale04,
  ColorScale05,
  ColorExample04,
} from '@components/ColorScales';
import { UseCasesTable } from '@components/UseCasesTable';
import { ColorGrays } from '@components/ColorGrays';
import { ColorGrayPairs } from '@components/ColorGrayPairs';
import { ColorGrayPairsComplementary } from '@components/ColorGrayPairsComplementary';
import { PlusIcon } from '@radix-ui/react-icons';

import type { Frontmatter } from 'types/frontmatter';

type Doc = {
  frontmatter: Frontmatter;
  code: any;
};

export default function ColorsPaletteCompostionDoc({ frontmatter, code }: Doc) {
  const Component = React.useMemo(() => getMDXComponent(code), [code]);

  return (
    <>
      <TitleAndMetaTags
        title={`${frontmatter.metaTitle} — Radix UI`}
        description={frontmatter.metaDescription}
        image="colors.png"
      />

      <MDXProvider frontmatter={frontmatter}>
        <Component
          components={
            {
              ...components,
              ColorGrid,
              ColorScale01,
              ColorScale02,
              ColorScale03,
              ColorScale04,
              ColorScale05,
              UseCasesTable,
              ColorGrays,
              ColorGrayPairs,
              ColorGrayPairsComplementary,
              ColorExample04,
              PlusIcon,
            } as any
          }
        />
      </MDXProvider>

      <Box
        as="aside"
        // Components that hide the scrollbar (like Dialog) add padding to
        // account for the scrollbar gap to avoid layout jank. This does not
        // work for position: fixed elements. Since we use react-remove-scroll
        // under the hood for those primitives, we can add this helper class
        // provided by that lib to deal with that for the QuickNav.
        // https://github.com/radix-ui/website/issues/64
        // https://github.com/theKashey/react-remove-scroll#positionfixed-elements
        className={RemoveScroll.classNames.zeroRight}
        css={{
          display: 'none',
          '@media (min-width: 1440px)': {
            display: 'block',
            width: 250,
            flexShrink: 0,
            zIndex: 1,
            position: 'fixed',
            top: '$sizes$7',
            right: 0,
            bottom: 0,
          },
        }}
      >
        <QuickNav key={frontmatter.slug} />
      </Box>
    </>
  );
}

export async function getStaticPaths() {
  const frontmatters = getAllFrontmatter('colors/palette-composition');

  return {
    paths: frontmatters.map((frontmatter) => ({
      params: { slug: frontmatter.slug.replace('colors/palette-composition/', '') },
    })),
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const { frontmatter, code } = await getMdxBySlug(
    'colors/palette-composition/',
    context.params.slug
  );
  return { props: { frontmatter, code } };
}
