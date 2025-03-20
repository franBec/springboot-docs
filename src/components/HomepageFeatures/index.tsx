import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
    title: string;
    Svg: React.ComponentType<React.ComponentProps<'svg'>>;
    description: ReactNode;
};

const FeatureList: FeatureItem[] = [
    {
        title: 'Real-World Insights',
        Svg: require('@site/static/img/undraw_programming_65t2.svg').default,
        description: (
            <>
                Learn from practical experiences and real challenges in Spring Boot projects. No fluff—just the honest truth about what works.
            </>
        ),
    },
    {
        title: 'Direct Approach',
        Svg: require('@site/static/img/undraw_sorting-thoughts_w6dr.svg').default,
        description: (
            <>
                Skip the over-complicated jargon. Focus on clear, actionable advice that helps you jump into coding without drowning in theory.
            </>
        ),
    },
    {
        title: 'Opinionated Guidance',
        Svg: require('@site/static/img/undraw_tourist-map_bczs.svg').default,
        description: (
            <>
                Discover a developer’s take on Spring Boot—where practical experience meets honest critique. It’s not about memorizing every detail, but solving real problems.
            </>
        ),
    },
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
