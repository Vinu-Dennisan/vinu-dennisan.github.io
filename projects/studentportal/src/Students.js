import React, { useEffect, useMemo, useState } from 'react';
const STORAGE_KEY = 'vinu-student-portal-students';
const SAMPLE_STUDENTS = [
  { id: 'sample-1', name: 'Aarav Kumar', course: 'B.Sc. Computer Science', email: 'aarav.kumar@example.com' },
  { id: 'sample-2', name: 'Meera Sharma', course: 'B.Com. Accounting', email: 'meera.sharma@example.com' },
  { id: 'sample-3', name: 'Rohan Patel', course: 'BCA', email: 'rohan.patel@example.com' },
  { id: 'sample-4', name: 'Ananya Iyer', course: 'B.Sc. Mathematics', email: 'ananya.iyer@example.com' },
  { id: 'sample-5', name: 'Kabir Singh', course: 'BBA', email: 'kabir.singh@example.com' }
];
function readStudents() {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === null) return SAMPLE_STUDENTS;
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : SAMPLE_STUDENTS;
  } catch {
    return SAMPLE_STUDENTS;
  }
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
    <div className="section-heading"><div><span className="eyebrow">VINU'S DIRECTORY</span><h2>Student directory</h2><p>Browse sample profiles or add a student of your own.</p></div><div className="student-count"><strong>{students.length}</strong><span>Total students</span></div></div>
    <form className="student-form" onSubmit={handleSubmit}><h3>Add a student</h3>
      <div className="form-grid">
        <label>Student name<input value={name} onChange={event => setName(event.target.value)} placeholder="e.g. Alex Johnson" /></label>
        <label>Course / programme<input value={course} onChange={event => setCourse(event.target.value)} placeholder="e.g. Computer Science" /></label>
        <label className="full-field">Email address <span className="optional-label">(optional)</span><input type="email" value={email} onChange={event => setEmail(event.target.value)} placeholder="alex@example.com" /></label>
      </div>
      {error && <p className="form-error" role="alert">{error}</p>}<button className="primary-button" type="submit">Add student</button>
    </form>
    <div className="list-heading"><div><h3>Student profiles</h3><p>{filtered.length} {filtered.length === 1 ? 'profile' : 'profiles'} shown · Sample names are fictional</p></div><input className="search-input" aria-label="Search students" value={search} onChange={event => setSearch(event.target.value)} placeholder="Search by name, course or email..." /></div>
    {filtered.length ? <div className="student-list">{filtered.map(student => <article className="student-row" key={student.id}><div className="student-avatar" aria-hidden="true">{student.name.charAt(0).toUpperCase()}</div><div className="student-details"><strong>{student.name}</strong><span>{student.course}</span>{student.email && <small>{student.email}</small>}</div><button className="remove-button" type="button" onClick={() => removeStudent(student.id)} aria-label={'Remove ' + student.name}>Remove</button></article>)}</div> : <div className="empty-state"><h3>{search ? 'No matching students' : 'No students added yet'}</h3><p>{search ? 'Try a different search term.' : 'Use the form above to add your first student.'}</p></div>}
    <p className="storage-note">These are fictional demo profiles, not real student records. Your changes are saved only in this browser and are not shared with anyone.</p>
  </section>;
}
