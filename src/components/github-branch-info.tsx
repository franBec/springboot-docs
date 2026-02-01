import Translate, { translate } from '@docusaurus/Translate';
import Admonition from '@theme/Admonition';

export default function GithubBranchInfo({ branch }: { branch: string }) {
  return (
    <Admonition
      type="info"
      title={translate({
        id: 'components.githubBranchInfo.title',
        message: 'Complete Code',
        description: 'The title of the GitHub branch info admonition',
      })}
    >
      <Translate
        id="components.githubBranchInfo.description"
        description="The description text for the GitHub branch info admonition"
        values={{
          repoLink: (
            <a href="https://github.com/franBec/springboot-demo-projects">
              springboot-demo-projects
            </a>
          ),
          branch: <code>{branch}</code>,
        }}
      >
        {
          'The end result of the code developed in this document can be found in the GitHub monorepo {repoLink}, under the branch {branch}.'
        }
      </Translate>
    </Admonition>
  );
}
