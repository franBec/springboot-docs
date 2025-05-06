import React, {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';
import useDocusaurusContext from "@docusaurus/useDocusaurusContext"

type FeatureItem = {
    title: string;
    Svg: React.ComponentType<React.ComponentProps<'svg'>>;
    description: ReactNode;
};

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
                title: 'Aprendizajes del mundo real',
                description: 'Aprendé de experiencias prácticas y desafíos reales en proyectos de Spring Boot. Nada de relleno —solo la verdad honesta sobre lo que funciona.',
            },
            {
                title: 'Enfoque directo',
                description: 'Evitá la jerga súper complicada. Enfocate en consejos claros y prácticos que te ayuden a saltar a codear sin ahogarte en teoría.',
            },
            {
                title: 'Guía opinionada',
                description: 'Descubrí la visión de un desarrollador sobre Spring Boot —donde la experiencia práctica se encuentra con la crítica honesta. No se trata de memorizar cada detalle, sino de resolver problemas reales.',
            },
        ],
    },
};

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
    const {i18n: {currentLocale}} = useDocusaurusContext();
    const t = translations[currentLocale] || translations.en;
    const FeatureList: FeatureItem[] = t.features.map((feature: { title: any; description: any; }, index: string | number) => ({
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