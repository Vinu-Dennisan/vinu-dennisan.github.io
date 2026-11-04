import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Header.module.css';
export default function Header() {
  return <header className={styles.header}><div className={styles.inner}>
    <NavLink className={styles.brand} to="/" end><span className={styles.brandMark}>S</span><span>Student Portal<small>STUDENT RECORDS</small></span></NavLink>
    <nav className={styles.navLinks} aria-label="Main navigation"><NavLink to="/" end>Home</NavLink><NavLink to="/students">Students</NavLink><NavLink to="/about">About</NavLink></nav>
  </div></header>;
}
