import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Header.module.css';
export default function Header({ theme, onToggleTheme }) {
  const links = [['/', 'Overview'], ['/students', 'Students'], ['/attendance', 'Attendance'], ['/timetable', 'Timetable'], ['/notices', 'Notices']];
  return <header className={styles.header}><div className={styles.inner}>
    <NavLink className={styles.brand} to="/" end><span className={styles.brandMark}>V</span><span>Vinu's Portal<small>STUDENT MANAGEMENT</small></span></NavLink>
    <a className={styles.portfolioLink} href="https://vinu-dennisan.github.io/">← Portfolio</a>
    <nav className={styles.navLinks} aria-label="Main navigation">{links.map(([to, label]) => <NavLink key={to} to={to} end={to === '/'}>{label}</NavLink>)}</nav>
    <button className={styles.themeToggle} type="button" onClick={onToggleTheme} aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`} title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}><span aria-hidden="true">{theme === 'light' ? '☾' : '☀'}</span><span className={styles.themeText}>{theme === 'light' ? 'Dark' : 'Light'}</span></button>
  </div></header>;
}
