import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Snappy Server Docs',
  tagline: 'Documentation for Snappy Server',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://example.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/snappy-server-docs/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'my-org', // Usually your GitHub org/user name.
  projectName: 'snappy-server', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/', // TODO: Update this later
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/', // TODO: Update this later
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg', // TODO: Update this later
    navbar: {
      title: 'Snappy Server Docs', // Updated
      logo: {
        alt: 'Snappy Server Logo', // Updated alt text
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar', // This will be the ID from sidebars.ts
          position: 'left',
          label: 'Docs', // Changed from Tutorial to Docs
        },
        {to: '/blog', label: 'Blog', position: 'left'}, // Keep blog for now
        {
          href: 'https://github.com/my-org/snappy-server', // TODO: Update this later
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Introduction', // Changed from Tutorial
              to: '/docs/intro', // Assuming 'intro.md' will be the main intro
            },
            {
              label: 'Architecture Overview',
              to: '/docs/architecture_overview', // Link to our new doc
            }
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/questions/tagged/docusaurus', // Generic Docusaurus link
            },
            {
              label: 'Discord',
              href: 'https://discordapp.com/invite/docusaurus', // Generic Docusaurus link
            },
            {
              label: 'X',
              href: 'https://x.com/docusaurus', // Generic Docusaurus link
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: '/blog',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/my-org/snappy-server', // TODO: Update this later
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Snappy Server Project. Built with Docusaurus.`, // Updated copyright
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
