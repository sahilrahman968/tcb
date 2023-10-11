import React, { useState } from 'react';
import styles from "../../styles/HorizontalScroller.module.scss"

const HorizontalScroller = ({ children }) => {
    const [scrollPosition, setScrollPosition] = useState(0);

    const scrollLeft = () => {
        setScrollPosition(scrollPosition - 100);
    };

    const scrollRight = () => {
        setScrollPosition(scrollPosition + 100);
    };

    return (

        <div className={styles.horizontal_scroller_container}>
            <div className={styles.section}>
                <div className={styles.section_heading}>Guwahati's Gastronomic Delights</div>
                <div className={styles.section_subheading}>Discover the Beloved Flavors of Guwahati's Food Lovers</div>
            </div>
            <div className={styles.horizontal_scroller_container}>
                <div className={styles.horizontal_scroller} style={{ transform: `translateX(${scrollPosition}px)` }}>
                    {children}
                </div>
                <button className={`${styles.scroll_button} ${styles.left}`} onClick={scrollLeft}>{`<`}</button>
                <button className={`${styles.scroll_button} ${styles.right}`} onClick={scrollRight}>{`>`}</button>
            </div>
        </div>
    );
};

export default HorizontalScroller;
