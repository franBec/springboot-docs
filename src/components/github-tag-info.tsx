import Translate, { translate } from '@docusaurus/Translate';
import Admonition from '@theme/Admonition';

export default function GithubTagInfo({ tag }: { tag: string }) {
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
            <a href="https://github.com/franBec/springboot-demo-projects">
              springboot-demo-projects
            </a>
          ),
          tag: <code>{tag}</code>,
        }}
      >
        {
          'The end result of the code developed in this document can be found in the GitHub monorepo {repoLink}, under the tag {tag}.'
        }
      </Translate>
    </Admonition>
  );
}
