import React from 'react';
import OriginalMermaid from '@theme-original/Mermaid';
import ZoomableMermaid from '@site/src/components/ZoomableMermaid';
import type {Props} from '@theme/Mermaid';

export default function MermaidWrapper(props: Props): JSX.Element {
    return (
        <ZoomableMermaid>
            <OriginalMermaid {...props} />
        </ZoomableMermaid>
    );
}