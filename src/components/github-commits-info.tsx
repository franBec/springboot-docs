import Translate, { translate } from '@docusaurus/Translate';
import Admonition from '@theme/Admonition';

interface Commit {
  name: string;
  url: string;
}

export default function GithubTagInfo({ commits }: { commits: Commit[] }) {
  const commitLinks = commits.map((commit, index) => (
    <span key={commit.url}>
      <a href={commit.url} target="_blank" rel="noopener noreferrer">
        {commit.name}
      </a>
      {index < commits.length - 1 ? ', ' : ''}
    </span>
  ));

  return (
    <Admonition
      type="info"
      title={translate({
        id: 'components.githubTagInfo.title',
        message: 'Complete Code',
        description: 'The title of the GitHub tag info admonition',
      })}
    >
      <Translate
        id="components.githubTagInfo.description"
        description="The description text for the GitHub tag info admonition"
        values={{
          repoLink: (
            <a
              href="https://github.com/franBec/springboot-demo-projects"
              target="_blank"
              rel="noopener noreferrer"
            >
              springboot-demo-projects
            </a>
          ),
          commitLinks: <>{commitLinks}</>,
        }}
      >
        {
          'The end result of the code developed in this document can be found in the GitHub monorepo {repoLink}, commit(s) {commitLinks}'
        }
      </Translate>
    </Admonition>
  );
}
