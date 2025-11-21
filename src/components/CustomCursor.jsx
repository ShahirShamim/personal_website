import { useEffect, useState } from 'react';
import { motion as Motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springConfig = { damping: 25, stiffness: 700 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        const moveCursor = (e) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
            setIsVisible(true);
        };

        const handleMouseEnter = () => setIsHovered(true);
        const handleMouseLeave = () => setIsHovered(false);

        window.addEventListener('mousemove', moveCursor);

        // Add hover listeners to all clickable elements
        const clickables = document.querySelectorAll('a, button, input, textarea, select, [role="button"]');
        clickables.forEach((el) => {
            el.addEventListener('mouseenter', handleMouseEnter);
            el.addEventListener('mouseleave', handleMouseLeave);
        });

        // MutationObserver to handle dynamically added elements
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.addedNodes.length) {
                    const newClickables = document.querySelectorAll('a, button, input, textarea, select, [role="button"]');
                    newClickables.forEach((el) => {
                        el.removeEventListener('mouseenter', handleMouseEnter); // Prevent duplicates
                        el.removeEventListener('mouseleave', handleMouseLeave);
                        el.addEventListener('mouseenter', handleMouseEnter);
                        el.addEventListener('mouseleave', handleMouseLeave);
                    });
                }
            });
        });

        observer.observe(document.body, { childList: true, subtree: true });

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            clickables.forEach((el) => {
                el.removeEventListener('mouseenter', handleMouseEnter);
                el.removeEventListener('mouseleave', handleMouseLeave);
            });
            observer.disconnect();
        };
    }, [cursorX, cursorY]);

    // Hide on touch devices via CSS class, but also return null here if needed.
    // We'll handle visibility mainly via CSS media queries for the container.

    return (
        <div className="custom-cursor-container">
            {/* Main Dot */}
            <Motion.div
                className="cursor-dot"
                style={{
                    translateX: cursorX,
                    translateY: cursorY,
                    opacity: isVisible ? 1 : 0,
                }}
            />

            {/* Trailing Ring */}
            <Motion.div
                className="cursor-ring"
                style={{
                    translateX: cursorXSpring,
                    translateY: cursorYSpring,
                    opacity: isVisible ? 1 : 0,
                }}
                animate={{
                    scale: isHovered ? 1.5 : 1,
                    backgroundColor: isHovered ? 'rgba(251, 191, 36, 0.1)' : 'transparent',
                    borderColor: isHovered ? 'var(--accent-primary)' : 'var(--accent-primary)',
                }}
                transition={{
                    scale: { duration: 0.2 },
                    backgroundColor: { duration: 0.2 },
                }}
            />
        </div>
    );
};

export default CustomCursor;
