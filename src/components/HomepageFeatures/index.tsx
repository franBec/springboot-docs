import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';
import useDocusaurusContext from "@docusaurus/useDocusaurusContext"

type FeatureItem = {
    title: string;
    Svg: React.ComponentType<React.ComponentProps<'svg'>>;
    description: ReactNode;
};

// Translations for all supported languages
const translations = {
    en: {
        features: [
            {
                title: 'Real-World Insights',
                description: 'Learn from practical experiences and real challenges in Spring Boot projects. No fluff—just the honest truth about what works.',
            },
            {
                title: 'Direct Approach',
                description: 'Skip the over-complicated jargon. Focus on clear, actionable advice that helps you jump into coding without drowning in theory.',
            },
            {
                title: 'Opinionated Guidance',
                description: 'Discover a developer\'s take on Spring Boot—where practical experience meets honest critique. It\'s not about memorizing every detail, but solving real problems.',
            },
        ],
    },
    es: {
        features: [
            {
                title: 'Conocimientos del Mundo Real',
                description: 'Aprende de experiencias prácticas y desafíos reales en proyectos de Spring Boot. Sin rodeos—solo la verdad honesta sobre lo que funciona.',
            },
            {
                title: 'Enfoque Directo',
                description: 'Sáltate la jerga complicada. Concéntrate en consejos claros y prácticos que te ayuden a comenzar a programar sin ahogarte en teoría.',
            },
            {
                title: 'Guía con Opinión',
                description: 'Descubre la perspectiva de un desarrollador sobre Spring Boot—donde la experiencia práctica se encuentra con la crítica honesta. No se trata de memorizar cada detalle, sino de resolver problemas reales.',
            },
        ],
    },
};

// The images don't change with language
const featureSvgs = [
    require('@site/static/img/undraw_programming_65t2.svg').default,
    require('@site/static/img/undraw_sorting-thoughts_w6dr.svg').default,
    require('@site/static/img/undraw_tourist-map_bczs.svg').default,
];

function Feature({title, Svg, description}: FeatureItem) {
    return (
        <div className={clsx('col col--4')}>
            <div className="text--center">
                <Svg className={styles.featureSvg} role="img" />
            </div>
            <div className="text--center padding-horiz--md">
                <Heading as="h3">{title}</Heading>
                <p>{description}</p>
            </div>
        </div>
    );
}

export default function HomepageFeatures(): ReactNode {
    // Get the current locale from Docusaurus context
    const {i18n: {currentLocale}} = useDocusaurusContext();

    // Use the current locale, or fall back to English if the locale isn't supported
    const t = translations[currentLocale] || translations.en;

    // Create the feature list by combining translations with SVGs
    const FeatureList: FeatureItem[] = t.features.map((feature, index) => ({
        title: feature.title,
        Svg: featureSvgs[index],
        description: <>{feature.description}</>,
    }));

    return (
        <section className={styles.features}>
            <div className="container">
                <div className="row">
                    {FeatureList.map((props, idx) => (
                        <Feature key={idx} {...props} />
                    ))}
                </div>
            </div>
        </section>
    );
}