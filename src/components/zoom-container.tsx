import React, { useState, useEffect } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

export default function ZoomContainer({ children, height = '300px' }) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => setIsFullscreen(!isFullscreen);

  useEffect(() => {
    const handleEsc = (event: { key: string }) => {
      if (event.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isFullscreen]);

  const containerStyle = isFullscreen
    ? {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        width: 'auto',
        height: '100vh',
        zIndex: 9999,
        backgroundColor: 'var(--ifm-background-color, #ffffff)',
        border: 'none',
        borderRadius: 0,
        margin: 0,
      }
    : {
        position: 'relative',
        height: height,
        minHeight: '200px',
        border: '1px solid var(--ifm-color-emphasis-300)',
        borderRadius: 'var(--ifm-global-radius)',
        background: 'transparent',
        margin: '1rem 0',
        resize: 'vertical',
        overflow: 'hidden',
      };

  return (
    <div style={containerStyle}>
      <TransformWrapper
        initialScale={1.4}
        minScale={0.1}
        maxScale={4}
        centerOnInit={true}
        limitToBounds={false}
      >
        {({ zoomIn, zoomOut, centerView }) => (
          <React.Fragment>
            <div
              style={{
                padding: '8px 16px 8px 8px',
                borderBottom: '1px solid var(--ifm-color-emphasis-300)',
                display: 'flex',
                gap: '8px',
                // FIX: Fallback here too for consistency
                backgroundColor: 'var(--ifm-color-emphasis-100, #f5f6f7)',
                alignItems: 'center',
                position: 'relative',
                zIndex: 10,
              }}
            >
              <button
                className="button button--secondary button--sm"
                onClick={() => zoomIn()}
              >
                +
              </button>
              <button
                className="button button--secondary button--sm"
                onClick={() => zoomOut()}
              >
                -
              </button>
              <button
                className="button button--secondary button--sm"
                onClick={() => centerView(1)}
              >
                Reset
              </button>

              <button
                className={`button button--secondary button--sm ${isFullscreen ? 'button--active' : ''}`}
                onClick={toggleFullscreen}
                title="Toggle Full Screen (Esc)"
              >
                {isFullscreen ? 'Exit Full Screen' : 'Full Screen'}
              </button>

              <span
                style={{
                  marginLeft: 'auto',
                  fontSize: '12px',
                  color: 'var(--ifm-color-content-secondary)',
                  whiteSpace: 'nowrap',
                }}
              >
                {isFullscreen
                  ? 'Press Esc to exit'
                  : 'Scroll to zoom • Drag corner to resize'}
              </span>
            </div>

            <TransformComponent
              wrapperStyle={{ width: '100%', height: 'calc(100% - 50px)' }}
            >
              <div style={{ width: '100%', height: '100%' }}>{children}</div>
            </TransformComponent>

            {!isFullscreen && (
              <div
                style={{
                  position: 'absolute',
                  bottom: '2px',
                  right: '2px',
                  pointerEvents: 'none',
                  width: '0',
                  height: '0',
                  borderStyle: 'solid',
                  borderWidth: '0 0 12px 12px',
                  borderColor:
                    'transparent transparent var(--ifm-color-emphasis-400) transparent',
                  zIndex: 5,
                }}
              />
            )}
          </React.Fragment>
        )}
      </TransformWrapper>
    </div>
  );
}
