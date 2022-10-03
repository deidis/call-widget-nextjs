import type { NextPage } from 'next'

import styles from '../styles/Widget.module.css'

const Widget:NextPage = () => {
    return (
        <div className={styles.widget}>
            <div className={styles.center}>
                <h1 className={styles.title}>Title</h1>
                <input/>
            </div>
            <div style={{"position": "relative", "height": "75%"}}></div>
            <button className={styles.call_btn}>Call Us</button>
            <button className={styles.close_btn}>X</button>
        </div>
    );
};

export default Widget;