import { useState, useRef, useEffect, useCallback } from 'react';
import OriginalCodeBlock from '@theme-original/CodeBlock';
import type { Props } from '@theme/CodeBlock';

const LINE_HEIGHT_ESTIMATE = 24; // pixels per line
const MAX_LINES = 15;

const ChevronIcon: React.FC<{ isExpanded: boolean }> = ({ isExpanded }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="currentColor"
    style={{
      transition: 'transform 0.2s ease',
      transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
    }}
  >
    <path
      fillRule="evenodd"
      d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06z"
    />
  </svg>
);

export default function CodeBlock(props: Props): React.ReactNode {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [maxHeight, setMaxHeight] = useState<string>(
    `${LINE_HEIGHT_ESTIMATE * MAX_LINES}px`,
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const codeBlockRef = useRef<HTMLDivElement>(null);
  const intersectionObserverRef = useRef<IntersectionObserver | null>(null);

  // Only process if children is a string (fenced code blocks)
  // Skip for JSX children (inline CodeBlock usage)
  const childrenStr =
    typeof props.children === 'string' ? props.children : null;
  const lines = childrenStr ? childrenStr.split('\n') : [];
  const totalLines = lines.length;
  const needsCollapse = totalLines > MAX_LINES;

  const calculateMaxHeight = useCallback(() => {
    if (codeBlockRef.current && needsCollapse) {
      const codeElement = codeBlockRef.current.querySelector('pre code');
      if (codeElement) {
        const lineElements = codeElement.querySelectorAll('.token-line, div');
        if (lineElements.length > 0) {
          const lineHeight = lineElements[0].getBoundingClientRect().height;
          if (lineHeight > 0) {
            setMaxHeight(`${lineHeight * MAX_LINES}px`);
            return true;
          }
        }
      }
    }
    return false;
  }, [needsCollapse]);

  useEffect(() => {
    if (!needsCollapse) return;

    // Try to calculate immediately
    const success = calculateMaxHeight();

    if (!success && codeBlockRef.current) {
      // Set up intersection observer to detect when component becomes visible
      intersectionObserverRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio > 0) {
              calculateMaxHeight();
            }
          });
        },
        { threshold: 0.1 },
      );

      intersectionObserverRef.current.observe(codeBlockRef.current);
    }

    return () => {
      if (intersectionObserverRef.current) {
        intersectionObserverRef.current.disconnect();
      }
    };
  }, [calculateMaxHeight, needsCollapse]);

  const handleToggle = () => {
    if (isExpanded && containerRef.current) {
      const navbar = document.querySelector('.navbar');
      const navbarHeight = 120;
      const elementPosition = containerRef.current.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.scrollY - navbarHeight - 10;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
    setIsExpanded(!isExpanded);
  };

  const styles: Record<string, React.CSSProperties> = {
    container: {
      position: 'relative',
      marginBottom: 'var(--ifm-leading)',
    },
    codeWrapper: {
      position: 'relative',
      overflow: 'hidden',
    },
    fadeOverlay: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: '4rem',
      background: 'linear-gradient(transparent, var(--ifm-code-background))',
      pointerEvents: 'none',
    },
    button: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.375rem',
      width: '100%',
      padding: '0.5rem 1rem',
      marginTop: '0',
      border: 'none',
      borderTop: '1px dashed var(--ifm-color-emphasis-300)',
      borderRadius:
        '0 0 var(--ifm-code-border-radius) var(--ifm-code-border-radius)',
      backgroundColor: isHovered
        ? 'var(--ifm-color-emphasis-100)'
        : 'var(--ifm-code-background)',
      color: 'var(--ifm-color-emphasis-600)',
      fontSize: '0.75rem',
      fontWeight: 500,
      fontFamily:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
      cursor: 'pointer',
      transition: 'background-color 0.15s ease',
    },
    lineCount: {
      color: 'var(--ifm-color-emphasis-500)',
      fontWeight: 400,
    },
  };

  const codeWrapperStyle: React.CSSProperties = {
    ...styles.codeWrapper,
    maxHeight: isExpanded ? 'none' : maxHeight,
    transition: 'max-height 0.2s ease-out',
  };

  // If no collapsing needed, just render the original component
  if (!needsCollapse) {
    return <OriginalCodeBlock {...props} />;
  }

  // Otherwise, wrap with collapse/expand UI
  return (
    <div ref={containerRef} style={styles.container}>
      <div ref={codeBlockRef} style={codeWrapperStyle}>
        <OriginalCodeBlock {...props} />
        {!isExpanded && <div style={styles.fadeOverlay} />}
      </div>

      <button
        type="button"
        style={styles.button}
        onClick={handleToggle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <ChevronIcon isExpanded={isExpanded} />
        {isExpanded ? 'Show less' : 'Expand'}
        <span style={styles.lineCount}>
          {isExpanded
            ? `(${totalLines} lines)`
            : `(${totalLines - MAX_LINES} more lines)`}
        </span>
      </button>
    </div>
  );
}
