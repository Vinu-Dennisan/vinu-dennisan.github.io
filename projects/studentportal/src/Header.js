import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Header.module.css';
export default function Header({ theme, onToggleTheme }) {
  return <header className={styles.header}><div className={styles.inner}>
    <NavLink className={styles.brand} to="/" end><span className={styles.brandMark}>V</span><span>Vinu's Portal<small>STUDENT COMMUNITY</small></span></NavLink>
    <nav className={styles.navLinks} aria-label="Main navigation"><NavLink to="/" end>Home</NavLink><NavLink to="/students">Students</NavLink><NavLink to="/about">About</NavLink></nav>
    <button className={styles.themeToggle} type="button" onClick={onToggleTheme} aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`} title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}><span aria-hidden="true">{theme === 'light' ? '🌙' : '☀️'}</span><span className={styles.themeText}>{theme === 'light' ? 'Dark' : 'Light'}</span></button>
  </div></header>;
}
