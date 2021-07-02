import React from 'react';
import { getMDXComponent } from 'mdx-bundler/client';
import { Box } from '@modulz/design-system';
import { RemoveScroll } from 'react-remove-scroll';
import { TitleAndMetaTags } from '@components/TitleAndMetaTags';
import { MDXProvider, components } from '@components/MDXComponents';
import { QuickNav } from '@components/QuickNav';
import { OldVersionNote } from '@components/OldVersionNote';
import { getAllFrontmatter, getAllVersionsFromPath, getMdxBySlug } from '@lib/mdx';

import type { Frontmatter } from 'types/frontmatter';

type Doc = {
  frontmatter: Frontmatter;
  code: any;
};

export default function UtilitiesDoc({ frontmatter, code }: Doc) {
  const Component = React.useMemo(() => getMDXComponent(code), [code]);

  return (
    <>
      <TitleAndMetaTags
        title={`${frontmatter.metaTitle} — Radix UI`}
        description={frontmatter.metaDescription}
        image={frontmatter.metaImage}
      />

      {frontmatter.version !== frontmatter.versions?.[0] && (
        <OldVersionNote
          name={frontmatter.metaTitle}
          href={`/primitives/docs/components/${frontmatter.slug.replace(frontmatter.version, '')}`}
        />
      )}

      <MDXProvider frontmatter={frontmatter}>
        <Component components={components as any} />
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
  const frontmatters = getAllFrontmatter('primitives/utilities');

  return {
    paths: frontmatters.map((frontmatter) => ({
      params: { slug: frontmatter.slug.replace('primitives/utilities/', '').split('/') },
    })),
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const { frontmatter, code } = await getMdxBySlug(
    'primitives/utilities/',
    context.params.slug.join('/')
  );
  const [componentName, componentVersion] = context.params.slug;

  const extendedFrontmatter = {
    ...frontmatter,
    version: componentVersion,
    versions: getAllVersionsFromPath(`primitives/utilities/${componentName}`),
  };

  return { props: { frontmatter: extendedFrontmatter, code } };
}
