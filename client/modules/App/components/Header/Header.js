import React from 'react';
import { Link } from 'react-router';

// Import Style
import styles from './Header.css';

export function Header() {
  return (
    <div className={styles.header}>
      <div className={styles.content}>
        <h1 className={styles['site-title']}>
          <Link to="/" >Metrics POC</Link>
        </h1>
      </div>
    </div>
  );
}

export default Header;
