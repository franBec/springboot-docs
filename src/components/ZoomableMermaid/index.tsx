import React, { useState, useRef, useEffect } from 'react';
import styles from './styles.module.css';
import clsx from 'clsx';

interface ZoomableMermaidProps {
    children: React.ReactNode;
    caption?: string;
}

export default function ZoomableMermaid({ children, caption }: ZoomableMermaidProps): JSX.Element {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [scale, setScale] = useState(1);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const contentRef = useRef<HTMLDivElement>(null);

    // Reset zoom and position when modal opens
    useEffect(() => {
        if (isModalOpen) {
            setScale(1);
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
        const scaleFactor = e.deltaY > 0 ? 0.9 : 1.1; // Zoom out or in
        setScale(prevScale => Math.min(Math.max(0.5, prevScale * scaleFactor), 5)); // Limit scale between 0.5 and 5
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
        setScale(1);
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
            <div className={styles.clickableWrapper} onClick={handleOpenModal}>
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
                                transform: `scale(${scale}) translate(${position.x / scale}px, ${position.y / scale}px)`,
                                transformOrigin: 'center center',
                            }}
                        >
                            {children}
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