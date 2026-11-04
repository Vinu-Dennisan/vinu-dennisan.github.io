import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Header from './Header';
import Home from './Home';
import Students from './Students';
import About from './About';
import Footer from './Footer';
export default function App() {
  return <HashRouter><div className="app-shell"><Header /><main className="page-content"><Routes><Route path="/" element={<Home />} /><Route path="/students" element={<Students />} /><Route path="/about" element={<About />} /><Route path="*" element={<Home />} /></Routes></main><Footer /></div></HashRouter>;
}
