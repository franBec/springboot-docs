import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: "Pollito's Opinion on Spring Boot Development",
  tagline:
    'Everything I wish someone has told me when I got into my first Spring Boot project',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://springboot.pollito.tech',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'franBec',
  projectName: 'spring-docs',

  onBrokenLinks: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es'],
    localeConfigs: {
      en: {
        label: 'English',
      },
      es: {
        label: 'Español',
      },
    },
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: 'https://github.com/franBec/springboot-docs/blob/main',
          routeBasePath: '/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/social-card.jpg',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      logo: {
        alt: 'My Site Logo',
        src: 'img/reshot-icon-chicken-NWQYV8H9BM.svg',
      },
      items: [
        {
          type: 'localeDropdown',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'About',
          items: [
            {
              label: 'Author',
              to: '/about/about-the-author',
            },
            {
              label: 'Special Thanks',
              to: '/about/special-thanks',
            },
          ],
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
              to: 'https://www.linkedin.com/in/franco-becvort/',
            },
          ],
        },
        {
          title: 'Licenses',
          items: [
            {
              label: 'Code License',
              to: '/licenses/code-license',
            },
            {
              label: 'Content License',
              to: '/licenses/content-license',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Franco Exequiel Becvort. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: [
        'groovy',
        'java',
        'kotlin',
        'yaml',
        'bash',
        'docker',
      ],
      magicComments: [
        {
          className: 'theme-code-block-highlighted-line',
          line: 'highlight-next-line',
        },
        {
          className: 'code-block-added-line',
          line: 'highlight-added',
          block: { start: 'highlight-added-start', end: 'highlight-added-end' },
        },
        {
          className: 'code-block-removed-line',
          line: 'highlight-removed',
          block: {
            start: 'highlight-removed-start',
            end: 'highlight-removed-end',
          },
        },
        {
          className: 'code-block-modified-line',
          line: 'highlight-modified',
          block: {
            start: 'highlight-modified-start',
            end: 'highlight-modified-end',
          },
        },
      ],
    },
  } satisfies Preset.ThemeConfig,

  markdown: {
    mermaid: true,
  },
  themes: ['@docusaurus/theme-mermaid'],
};

export default config;
