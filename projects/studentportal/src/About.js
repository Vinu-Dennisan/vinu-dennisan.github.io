import React from 'react';
export default function About() {
  return <section className="about-page"><span className="eyebrow">ABOUT THE PROJECT</span><h2>A simple student record manager</h2>
    <p>This Student Portal is a front-end demonstration built with React. It provides a simple interface to add, search and remove student records.</p>
    <div className="about-panel"><h3>What this demo includes</h3><ul><li>Responsive layout for desktop and mobile screens</li><li>Student name, course and optional email fields</li><li>Search and remove actions</li><li>Browser-based local storage to keep records after refresh</li></ul></div>
    <p className="storage-note">Important: this is not a production student information system. It has no server, shared database, login or access controls.</p>
  </section>;
}
