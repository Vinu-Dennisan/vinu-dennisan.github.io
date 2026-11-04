import React from 'react';
export default function About() {
  return <section className="about-page"><span className="eyebrow">ABOUT VINU'S PORTAL</span><h2>A simple space for student profiles</h2>
    <p>Vinu's Portal is a front-end demonstration developed by Vinu. It includes a sample student directory where visitors can browse fictional profiles, search by name or course, and add or remove records.</p>
    <div className="about-panel"><h3>What this portal includes</h3><ul><li>Fictional sample student profiles to explore</li><li>Add, search and remove student records</li><li>Responsive layout for desktop and mobile screens</li><li>Light and dark display modes</li><li>Browser-based local storage to keep changes after refresh</li></ul></div>
    <p className="storage-note">Important: this is a demonstration only. It has no server, shared database, login or access controls. Sample names and email addresses are fictional.</p>
  </section>;
}
