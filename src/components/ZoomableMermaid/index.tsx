import React, { useState, useRef, useEffect } from 'react';
import styles from './styles.module.css';
import mermaid from 'mermaid';

interface ZoomableMermaidProps {
    children: React.ReactNode;
    caption?: string;
    value?: string;  // Optional direct mermaid code
}

export default function ZoomableMermaid({ children, caption, value }: ZoomableMermaidProps): JSX.Element {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const contentRef = useRef<HTMLDivElement>(null);
    const originalDiagramRef = useRef<HTMLDivElement>(null);
    const modalDiagramRef = useRef<HTMLDivElement>(null);
    const [mermaidCode, setMermaidCode] = useState<string | null>(null);

    // Extract mermaid code from the children or use provided value
    useEffect(() => {
        const extractMermaidCode = () => {
            if (value) {
                setMermaidCode(value);
                return;
            }

            // Try to find the Mermaid code from children
            if (originalDiagramRef.current) {
                const codeElement = originalDiagramRef.current.querySelector('code.language-mermaid');
                if (codeElement) {
                    setMermaidCode(codeElement.textContent || '');
                }
            }
        };

        if (isModalOpen && !mermaidCode) {
            extractMermaidCode();
        }
    }, [isModalOpen, value, mermaidCode]);

    // Render Mermaid diagram in modal
    useEffect(() => {
        if (isModalOpen && mermaidCode && modalDiagramRef.current) {
            const renderDiagram = async () => {
                // Clear previous diagram
                modalDiagramRef.current.innerHTML = '';

                // Create a container for new diagram
                const container = document.createElement('div');
                container.className = 'mermaid';
                container.textContent = mermaidCode;
                modalDiagramRef.current.appendChild(container);

                // Get current theme
                const isDarkTheme = document.documentElement.dataset.theme === 'dark';

                // Initialize with higher quality settings
                mermaid.initialize({
                    startOnLoad: true,
                    theme: isDarkTheme ? 'dark' : 'neutral', // Use theme based on site mode
                    er: { useMaxWidth: false },
                    flowchart: { useMaxWidth: false },
                    sequence: { useMaxWidth: false },
                    gantt: { useMaxWidth: false },
                    journey: { useMaxWidth: false },
                    // Higher quality rendering
                    fontSize: 16,
                    fontFamily: 'sans-serif',
                });

                try {
                    await mermaid.run({
                        nodes: [container],
                    });

                    // Find and enhance the SVG
                    const svg = modalDiagramRef.current.querySelector('svg');
                    if (svg) {
                        svg.style.maxWidth = 'none';
                        svg.style.width = '100%';
                        svg.style.height = 'auto';

                        // Make sure SVG has width and height attributes set
                        if (!svg.getAttribute('width')) {
                            svg.setAttribute('width', '800');
                        }
                        if (!svg.getAttribute('height')) {
                            svg.setAttribute('height', '600');
                        }

                        // Add viewBox if missing
                        if (!svg.getAttribute('viewBox')) {
                            const width = svg.getAttribute('width');
                            const height = svg.getAttribute('height');
                            svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
                        }
                    }
                } catch (error) {
                    console.error('Failed to render mermaid diagram:', error);
                }
            };

            renderDiagram();
        }
    }, [isModalOpen, mermaidCode]);

    // Reset zoom and position when modal opens
    useEffect(() => {
        if (isModalOpen) {
            setZoom(1);
            setPosition({ x: 0, y: 0 });
        }
    }, [isModalOpen]);

    const handleOpenModal = () => {
        setIsModalOpen(true);
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        document.body.style.overflow = ''; // Re-enable scrolling
    };

    const handleWheel = (e: React.WheelEvent) => {
        e.preventDefault();
        setZoom(currentZoom => {
            const delta = e.deltaY * -0.01;
            const newZoom = Math.min(Math.max(0.5, currentZoom + delta), 5);
            return newZoom;
        });
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        if (e.button === 0) { // Left mouse button
            setIsDragging(true);
            setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
        }
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (isDragging) {
            setPosition({
                x: e.clientX - dragStart.x,
                y: e.clientY - dragStart.y
            });
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleResetZoom = () => {
        setZoom(1);
        setPosition({ x: 0, y: 0 });
    };

    // Close modal on ESC key press
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isModalOpen) {
                handleCloseModal();
            }
        };
        window.addEventListener('keydown', handleEsc);
        return () => {
            window.removeEventListener('keydown', handleEsc);
        };
    }, [isModalOpen]);

    return (
        <div className={styles.container}>
            {/* Clickable diagram */}
            <div
                className={styles.clickableWrapper}
                onClick={handleOpenModal}
                ref={originalDiagramRef}
            >
                <div className={styles.diagramContainer}>
                    {children}
                </div>
                {caption && <div className={styles.caption}>{caption}</div>}
                <div className={styles.zoomIndicator}>
                    <span>🔍 Click to zoom</span>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div
                    className={styles.modalOverlay}
                    onClick={handleCloseModal}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                >
                    <div
                        className={styles.modalContent}
                        onClick={e => e.stopPropagation()}
                        onWheel={handleWheel}
                        onMouseDown={handleMouseDown}
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}
                        ref={contentRef}
                        style={{
                            cursor: isDragging ? 'grabbing' : 'grab',
                        }}
                    >
                        <div
                            className={styles.zoomableContent}
                            style={{
                                transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
                                transformOrigin: 'center center',
                            }}
                            ref={modalDiagramRef}
                        >
                            {/* Modal diagram will be rendered here */}
                        </div>
                        <div className={styles.controls}>
                            <button onClick={handleResetZoom}>Reset View</button>
                            <button onClick={handleCloseModal}>Close</button>
                        </div>
                        {caption && <div className={styles.modalCaption}>{caption}</div>}
                    </div>
                </div>
            )}
        </div>
    );
}