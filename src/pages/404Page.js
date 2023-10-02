import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/404Page.module.css';

const NotFoundPage = () => {
    const handleGoBack = () => {
        window.history.back();
    };

    return (
        <div className={styles.notFoundContainer}>
            <h1 className={styles.errorMessage}>404 - Page Not Found</h1>
            <p>The page you are looking for does not exist.</p>
            <p>
                <Link to="#" className={styles.backLink} onClick={handleGoBack}>
                    Go back to the previous page
                </Link>
            </p>
        </div>
    );
};

export default NotFoundPage;
