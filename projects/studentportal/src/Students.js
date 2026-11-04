import React, { useEffect, useMemo, useState } from 'react';
const STORAGE_KEY = 'vinu-student-portal-students';
function readStudents() {
  try { const saved = window.localStorage.getItem(STORAGE_KEY); return saved ? JSON.parse(saved) : []; }
  catch { return []; }
}
export default function Students() {
  const [students, setStudents] = useState(readStudents);
  const [name, setName] = useState('');
  const [course, setCourse] = useState('');
  const [email, setEmail] = useState('');
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');
  useEffect(() => {
    try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(students)); }
    catch { setError('Your browser could not save the records. Check available storage.'); }
  }, [students]);
  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return students;
    return students.filter(student => [student.name, student.course, student.email || ''].some(value => value.toLowerCase().includes(query)));
  }, [students, search]);
  function handleSubmit(event) {
    event.preventDefault();
    const cleanName = name.trim(), cleanCourse = course.trim(), cleanEmail = email.trim();
    if (!cleanName || !cleanCourse) { setError('Please enter the student name and course.'); return; }
    setStudents(current => [{ id: String(Date.now()) + Math.random().toString(36).slice(2, 8), name: cleanName, course: cleanCourse, email: cleanEmail }, ...current]);
    setName(''); setCourse(''); setEmail(''); setError('');
  }
  function removeStudent(id) { setStudents(current => current.filter(student => student.id !== id)); }
  return <section className="students-page">
    <div className="section-heading"><div><span className="eyebrow">YOUR RECORDS</span><h2>Students</h2><p>Add and manage student details.</p></div><div className="student-count"><strong>{students.length}</strong><span>Saved students</span></div></div>
    <form className="student-form" onSubmit={handleSubmit}><h3>Add a student</h3>
      <div className="form-grid">
        <label>Student name<input value={name} onChange={event => setName(event.target.value)} placeholder="e.g. Alex Johnson" /></label>
        <label>Course<input value={course} onChange={event => setCourse(event.target.value)} placeholder="e.g. Computer Science" /></label>
        <label className="full-field">Email address <span className="optional-label">(optional)</span><input type="email" value={email} onChange={event => setEmail(event.target.value)} placeholder="alex@example.com" /></label>
      </div>
      {error && <p className="form-error" role="alert">{error}</p>}<button className="primary-button" type="submit">Add student</button>
    </form>
    <div className="list-heading"><div><h3>Student directory</h3><p>{filtered.length} {filtered.length === 1 ? 'record' : 'records'} shown</p></div><input className="search-input" aria-label="Search students" value={search} onChange={event => setSearch(event.target.value)} placeholder="Search students..." /></div>
    {filtered.length ? <div className="student-list">{filtered.map(student => <article className="student-row" key={student.id}><div className="student-avatar" aria-hidden="true">{student.name.charAt(0).toUpperCase()}</div><div className="student-details"><strong>{student.name}</strong><span>{student.course}</span>{student.email && <small>{student.email}</small>}</div><button className="remove-button" type="button" onClick={() => removeStudent(student.id)} aria-label={'Remove ' + student.name}>Remove</button></article>)}</div> : <div className="empty-state"><h3>{search ? 'No matching students' : 'No students added yet'}</h3><p>{search ? 'Try a different search term.' : 'Use the form above to add your first student.'}</p></div>}
    <p className="storage-note">Records are saved only in this browser. Clearing browser data or using another device will not transfer them.</p>
  </section>;
}