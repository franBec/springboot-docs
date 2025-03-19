import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Pollito\'s Opinion on Spring Boot Development',
  tagline: 'Everything I wish someone has told me when I got into my first Spring Boot project',
  favicon: 'img/favicon.ico',

  url: 'https://springboot.pollito.tech',
  baseUrl: '/',

  organizationName: 'franBec', // Usually your GitHub org/user name.
  projectName: 'spring-docs', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: "/",
          sidebarPath: './sidebars.ts',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      logo: {
        alt: 'My Site Logo',
        src: 'img/logo.svg',
      },
      items: [],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: 'https://pollito.dev/',
            },
            {
              label: 'Linkedin',
              to: 'https://www.linkedin.com/in/franco-becvort/'
            },
            {
              label: 'GitHub',
              href: 'https://github.com/franBec',
            },
          ],
        },
      ],
      copyright: `Made by &lt;🐤/&gt; with Docusaurus and ❤️`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
