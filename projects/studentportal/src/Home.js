import React from 'react';
import { Link } from 'react-router-dom';
export default function Home() {
  return <section className="hero">
    <span className="eyebrow">STUDENT MANAGEMENT</span>
    <h2>Welcome to your Student Portal</h2>
    <p className="hero-copy">Keep student records organised in one simple place. Add students, view their details, search your list and manage records from this device.</p>
    <Link className="primary-link" to="/students">Manage students <span aria-hidden="true">→</span></Link>
    <div className="feature-grid">
      <article className="feature-card"><span className="feature-icon">＋</span><h3>Add records</h3><p>Save a student's name, course and email address.</p></article>
      <article className="feature-card"><span className="feature-icon">⌕</span><h3>Find students</h3><p>Search saved records by name, course or email.</p></article>
      <article className="feature-card"><span className="feature-icon">✓</span><h3>Keep organised</h3><p>Your changes stay saved in this browser on this device.</p></article>
    </div>
    <p className="storage-note">Demo note: this version stores data locally in your browser. It does not use an online database or user accounts.</p>
  </section>;
}
