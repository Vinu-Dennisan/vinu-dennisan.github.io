import React from 'react';
import { Link } from 'react-router-dom';
export default function Home() {
  return <section className="hero">
    <span className="eyebrow">VINU'S STUDENT COMMUNITY</span>
    <h2>Welcome to Vinu's Portal</h2>
    <p className="hero-copy">A friendly place to explore the student directory and keep student information organised. Browse sample profiles, add new students, and find records with ease.</p>
    <Link className="primary-link" to="/students">Explore student directory <span aria-hidden="true">→</span></Link>
    <div className="feature-grid">
      <article className="feature-card"><span className="feature-icon">＋</span><h3>Add students</h3><p>Create a student record with a name, course and optional email address.</p></article>
      <article className="feature-card"><span className="feature-icon">⌕</span><h3>Explore profiles</h3><p>Browse and search the sample student directory by name or course.</p></article>
      <article className="feature-card"><span className="feature-icon">✓</span><h3>Easy to manage</h3><p>Update your directory by adding or removing records saved in this browser.</p></article>
    </div>
    <p className="storage-note">The directory starts with fictional sample profiles to demonstrate the portal. Records are stored locally in this browser only; there is no online database.</p>
  </section>;
}
