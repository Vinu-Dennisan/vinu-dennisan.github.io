import React, { useEffect, useState } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Header from './Header';
import Home from './Home';
import Students from './Students';
import About from './About';
import Footer from './Footer';

const demoStudents = [
  { id: 'sample-1', name: 'Aarav Kumar', course: 'B.Sc. Computer Science', email: 'aarav.kumar@example.com' },
  { id: 'sample-2', name: 'Meera Sharma', course: 'B.Com. Accounting', email: 'meera.sharma@example.com' },
  { id: 'sample-3', name: 'Rohan Patel', course: 'BCA', email: 'rohan.patel@example.com' },
  { id: 'sample-4', name: 'Ananya Iyer', course: 'B.Sc. Mathematics', email: 'ananya.iyer@example.com' },
  { id: 'sample-5', name: 'Kabir Singh', course: 'BBA', email: 'kabir.singh@example.com' }
];
const readStudents = () => { try { const saved = JSON.parse(localStorage.getItem('vinu-student-portal-students')); return Array.isArray(saved) && saved.length ? saved : demoStudents; } catch { return demoStudents; } };

function Attendance() {
  const [students] = useState(readStudents);
  const [records, setRecords] = useState(() => { try { return JSON.parse(localStorage.getItem('vinu-attendance')) || {}; } catch { return {}; } });
  const today = new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  const mark = (id, status) => setRecords(current => ({ ...current, [id]: status }));
  useEffect(() => { localStorage.setItem('vinu-attendance', JSON.stringify(records)); }, [records]);
  const present = students.filter(s => records[s.id] === 'Present').length;
  return <section className="page-section"><div className="page-heading"><div><span className="eyebrow">DAILY CLASSROOM</span><h1>Attendance</h1><p>Track today's attendance and keep your class up to date.</p></div><span className="date-chip">{today}</span></div>
    <div className="stats-grid compact-stats"><article className="stat-card"><span>Students</span><strong>{students.length}</strong><small>In this directory</small></article><article className="stat-card"><span>Present</span><strong>{present}</strong><small>Marked present</small></article><article className="stat-card"><span>Absent</span><strong>{students.length - present}</strong><small>Not marked present</small></article></div>
    <div className="panel"><div className="panel-heading"><div><h2>Mark attendance</h2><p>Choose a status for each student. Changes save in this browser.</p></div><span className="live-dot">TODAY</span></div>
    <div className="attendance-list">{students.map(s => <div className="attendance-row" key={s.id}><div className="student-avatar">{s.name.charAt(0)}</div><div className="student-details"><strong>{s.name}</strong><span>{s.course}</span></div><div className="attendance-actions"><button className={records[s.id] === 'Present' ? 'status-button present selected' : 'status-button present'} onClick={() => mark(s.id, 'Present')}>Present</button><button className={records[s.id] === 'Absent' ? 'status-button absent selected' : 'status-button absent'} onClick={() => mark(s.id, 'Absent')}>Absent</button></div></div>)}</div></div>
  </section>;
}

function Timetable() {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const slots = [
    ['09:00 – 10:00', 'Programming', 'Computer Lab'],
    ['10:15 – 11:15', 'Mathematics', 'Room 204'],
    ['11:30 – 12:30', 'Database Systems', 'Room 108'],
    ['13:30 – 14:30', 'Communication Skills', 'Room 302']
  ];
  return <section className="page-section"><div className="page-heading"><div><span className="eyebrow">PLAN YOUR WEEK</span><h1>Class timetable</h1><p>A simple weekly view of classes and learning sessions.</p></div><span className="date-chip">MON – FRI</span></div><div className="timetable-grid"><div className="time-column"><strong>TIME</strong>{slots.map(s => <span key={s[0]}>{s[0]}</span>)}</div>{days.map((day, index) => <div className="day-column" key={day}><strong>{day.slice(0,3).toUpperCase()}</strong>{slots.map((slot, i) => <article className={'class-card class-tone-' + ((index + i) % 4)} key={slot[0] + day}><b>{slot[1]}</b><span>{slot[0]}</span><small>{index === 2 && i === 2 ? 'Project hour' : slot[2]}</small></article>)}</div>)}</div><p className="muted-note">Demo timetable — edit the schedule in the project source to match your actual classes.</p></section>;
}

function Notices() {
  const starter = [
    { id: 1, tag: 'ACADEMIC', title: 'Welcome to the new student portal', body: 'Explore the directory, check the weekly timetable and keep attendance up to date.', date: 'Portal update' },
    { id: 2, tag: 'REMINDER', title: 'Keep your student details updated', body: 'Make sure your course and contact information are accurate in your profile.', date: 'Student services' },
    { id: 3, tag: 'EVENT', title: 'Project and activity week', body: 'Use the timetable to plan your learning sessions and group project time.', date: 'Campus community' }
  ];
  const [items, setItems] = useState(() => { try { const saved = JSON.parse(localStorage.getItem('vinu-portal-notices')); return Array.isArray(saved) ? saved : starter; } catch { return starter; } });
  const [title, setTitle] = useState(''); const [body, setBody] = useState('');
  useEffect(() => { localStorage.setItem('vinu-portal-notices', JSON.stringify(items)); }, [items]);
  const add = e => { e.preventDefault(); if (!title.trim() || !body.trim()) return; setItems(current => [{ id: Date.now(), tag: 'NEW', title: title.trim(), body: body.trim(), date: 'Just added' }, ...current]); setTitle(''); setBody(''); };
  return <section className="page-section"><div className="page-heading"><div><span className="eyebrow">CAMPUS UPDATES</span><h1>Notice board</h1><p>Announcements, reminders and community updates in one place.</p></div><span className="date-chip">{items.length} POSTS</span></div>
    <form className="panel notice-form" onSubmit={add}><div className="panel-heading"><div><h2>Publish an announcement</h2><p>Add a notice to this browser's demo board.</p></div></div><label>Announcement title<input value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Exam registration opens" required /></label><label>Message<textarea value={body} onChange={e => setBody(e.target.value)} placeholder="Write your announcement..." rows="3" required /></label><button className="primary-button" type="submit">＋ Publish notice</button></form>
    <div className="notice-grid">{items.map(item => <article className="notice-card" key={item.id}><div className="notice-meta"><span>{item.tag}</span><small>{item.date}</small></div><h2>{item.title}</h2><p>{item.body}</p><button className="text-button" onClick={() => setItems(current => current.filter(n => n.id !== item.id))}>Remove notice</button></article>)}</div>
  </section>;
}

export default function App() {
  const [theme, setTheme] = useState(() => { try { return localStorage.getItem('student-portal-theme') || 'light'; } catch { return 'light'; } });
  useEffect(() => { try { localStorage.setItem('student-portal-theme', theme); } catch {} }, [theme]);
  const toggleTheme = () => setTheme(current => current === 'light' ? 'dark' : 'light');
  return <HashRouter><div className="app-shell" data-theme={theme}><Header theme={theme} onToggleTheme={toggleTheme} /><main className="page-content"><Routes><Route path="/" element={<Home />} /><Route path="/students" element={<Students />} /><Route path="/attendance" element={<Attendance />} /><Route path="/timetable" element={<Timetable />} /><Route path="/notices" element={<Notices />} /><Route path="/about" element={<About />} /><Route path="*" element={<Home />} /></Routes></main><Footer /></div></HashRouter>;
}
