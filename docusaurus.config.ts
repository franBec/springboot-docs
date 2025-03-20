import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Pollito\'s Opinion on Spring Boot Development',
  tagline: 'Everything I wish someone has told me when I got into my first Spring Boot project',
  favicon: 'img/favicon.ico',

  url: 'https://springboot.pollito.tech',
  baseUrl: '/',

  organizationName: 'franBec',
  projectName: 'spring-docs',

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
    image: 'img/social-card.jpg',
    navbar: {
      logo: {
        alt: 'My Site Logo',
        src: 'img/reshot-icon-chicken-NWQYV8H9BM.svg',
      },
      items: [],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'About',
          items: [
            {
              label: 'Author',
              to: '/'
            },
            {
              label: 'Special Thanks',
              to: '/'
            }
          ]
        },
        {
          title: 'Get in touch',
          items: [
            {
              label: 'Blog',
              to: 'https://pollito.dev/',
            },
            {
              label: 'LinkedIn',
              to: 'https://www.linkedin.com/in/franco-becvort/'
            }
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
