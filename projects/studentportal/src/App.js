import React, { useEffect, useState } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Header from './Header';
import Home from './Home';
import Students from './Students';
import About from './About';
import Footer from './Footer';

export default function App() {
  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem('student-portal-theme') || 'light'; }
    catch { return 'light'; }
  });

  useEffect(() => {
    try { localStorage.setItem('student-portal-theme', theme); } catch {}
  }, [theme]);

  const toggleTheme = () => setTheme(current => current === 'light' ? 'dark' : 'light');

  return <HashRouter><div className="app-shell" data-theme={theme}>
    <Header theme={theme} onToggleTheme={toggleTheme} />
    <main className="page-content"><Routes>
      <Route path="/" element={<Home />} />
      <Route path="/students" element={<Students />} />
      <Route path="/about" element={<About />} />
      <Route path="*" element={<Home />} />
    </Routes></main>
    <Footer />
  </div></HashRouter>;
}
