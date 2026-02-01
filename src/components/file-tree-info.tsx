import { ReactNode } from 'react';
import Admonition from '@theme/Admonition';
import { translate } from '@docusaurus/Translate';

interface FileTreeTabsProps {
  children: ReactNode;
}

export const FileTreeInfo: React.FC<FileTreeTabsProps> = ({ children }) => {
  return (
    <>
      <Admonition
        type="info"
        title={translate({
          id: 'file-tree-info.title',
          message: 'Files to Create/Modify',
        })}
      >
        {children}
      </Admonition>
    </>
  );
};
