import React, { useRef, useState } from 'react';
import './styles.css';

import Header from './components/Header';
import Sidebar from './components/Sidebar';
import PageHeading from './components/PageHeading';
import AssessmentStepper from './components/AssessmentStepper';
import AssessmentDetails from './components/AssessmentDetails';
import QuestionsSections from './components/QuestionsSections';
import StudentsSection from './components/StudentsSection';
import ScheduleAccess from './components/ScheduleAccess';
import AssessmentSummary from './components/AssessmentSummary';
import QuestionModal from './components/QuestionModal';
import Icon from './components/Icon';

const initialQuestions = [
  { id: 1, title: 'Most powerful piece in chess.', answer: 'Queen', difficulty: 'Easy', topic: 'General Knowledge' },
  { id: 2, title: 'What does CPU stand for?', answer: 'Central Processing Unit', difficulty: 'Easy', topic: 'Computers' },
  { id: 3, title: 'Which data structure uses FIFO?', answer: 'Queue', difficulty: 'Medium', topic: 'Computers' },
  { id: 4, title: 'What is the derivative of x²?', answer: '2x', difficulty: 'Easy', topic: 'Mathematics' },
  { id: 5, title: 'What is the time complexity of binary search?', answer: 'O(log n)', difficulty: 'Medium', topic: 'Computers' },
  { id: 6, title: 'Name the SI unit of electric capacitance.', answer: 'Farad', difficulty: 'Hard', topic: 'Science' },
];

const initialStudents = [
  { id: 1, name: 'Demo User', email: 'user1@gmail.com', roll: '34345', department: 'CSE', year: '2025', level: 'UG', batch: '2025' },
  { id: 2, name: 'User 2', email: 'user2@gmail.com', roll: '2093', department: 'CSE', year: '2025', level: 'UG', batch: '2025' },
  { id: 3, name: 'Ananya Rao', email: 'ananya@example.com', roll: '2104', department: 'ECE', year: '2026', level: 'UG', batch: '2026' },
  { id: 4, name: 'Rahul Kumar', email: 'rahul@example.com', roll: '3101', department: 'IT', year: '2024', level: 'PG', batch: '2024' },
];

const emptySection = (id) => ({
  id,
  name: id === 1 ? 'General Knowledge' : '',
  duration: 10,
  type: 'One-word',
  optional: false,
  selected: [],
  counts: { Easy: 0, Medium: 0, Hard: 0 },
  marks: { Easy: 1, Medium: 2, Hard: 3 },
});

export default function App() {
  const [sections, setSections] = useState([emptySection(1)]);
  const [questions, setQuestions] = useState(initialQuestions);
  const [students, setStudents] = useState(initialStudents);
  const [selectedStudents, setSelectedStudents] = useState([]);

  const [assessmentType, setAssessmentType] = useState('Main Assessment');
  const [assessmentName, setAssessmentName] = useState('');
  const [sectionTimer, setSectionTimer] = useState('Yes');
  const [duration, setDuration] = useState(30);
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [access, setAccess] = useState('Normal');

  const [searches, setSearches] = useState({});
  const [studentSearch, setStudentSearch] = useState('');
  const [filters, setFilters] = useState({ department: '', year: '', level: '', batch: '' });
  const [modal, setModal] = useState(null);
  const [toast, setToast] = useState('');
  const [mobileNav, setMobileNav] = useState(false);
  const uploadRef = useRef(null);

  const notify = (message) => {
    setToast(message);
    window.setTimeout(() => setToast(''), 4000);
  };

  const updateSection = (id, patch) => {
    setSections((previous) => previous.map((section) => (
      section.id === id ? { ...section, ...patch } : section
    )));
  };

  const addSection = () => {
    setSections((previous) => [
      ...previous,
      emptySection(Math.max(...previous.map((section) => section.id), 0) + 1),
    ]);
  };

  const totalQuestions = sections.reduce((total, section) => total + section.selected.length, 0);
  const totalMarks = sections.reduce((total, section) => (
    total + ['Easy', 'Medium', 'Hard'].reduce(
      (difficultyTotal, difficulty) => difficultyTotal
        + (section.counts[difficulty] || 0) * (section.marks[difficulty] || 0),
      0,
    )
  ), 0);

  const filteredStudents = students.filter((student) => (
    [student.name, student.email, student.roll].some((value) => (
      value.toLowerCase().includes(studentSearch.toLowerCase())
    ))
    && (!filters.department || student.department === filters.department)
    && (!filters.year || student.year === filters.year)
    && (!filters.level || student.level === filters.level)
    && (!filters.batch || student.batch === filters.batch)
  ));

  const importStudents = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.name.toLowerCase().endsWith('.csv')) {
      notify('Please upload a CSV file. Excel .xlsx parsing is not included in this demo.');
      event.target.value = '';
      return;
    }

    try {
      const csvText = await file.text();
      const rows = csvText.trim().split(/\r?\n/).map((row) => (
        row.split(',').map((value) => value.trim().replace(/^"|"$/g, ''))
      ));
      const headers = (rows.shift() || []).map((value) => value.toLowerCase());
      const newRows = rows
        .filter((row) => row.length > 1)
        .map((row, index) => {
          const get = (...keys) => row[headers.findIndex((header) => keys.includes(header))] || '';
          return {
            id: Date.now() + index,
            name: get('name', 'student name'),
            email: get('email', 'email address'),
            roll: get('roll', 'roll number', 'rollnumber'),
            department: get('department', 'dept'),
            year: get('year'),
            level: get('ug/pg', 'level', 'ug or pg') || 'UG',
            batch: get('batch', 'batches'),
          };
        })
        .filter((student) => student.name && student.email);

      setStudents((previous) => [...previous, ...newRows]);
      notify(`Imported ${newRows.length} students`);
    } catch {
      notify('Could not read this CSV file. Please check its format.');
    } finally {
      event.target.value = '';
    }
  };

  const saveAssessment = () => {
    if (!assessmentName.trim()) return notify('Please enter an assessment name.');
    if (sections.some((section) => !section.name.trim())) return notify('Please name every section.');
    if (!start || !end || new Date(start) >= new Date(end)) return notify('Choose a valid start and end date.');
    if (!selectedStudents.length) return notify('Select at least one student.');
    if (!totalQuestions) return notify('Select at least one question.');

    const data = {
      assessmentType,
      assessmentName,
      sectionTimer,
      duration,
      start,
      end,
      access,
      sections,
      selectedStudents,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'assessment-config.json';
    link.click();
    URL.revokeObjectURL(url);
    notify('Assessment configuration exported successfully!');
  };

  const saveCustomQuestion = (question) => {
    const id = Math.max(...questions.map((item) => item.id), 0) + 1;
    setQuestions((previous) => [...previous, { ...question, id }]);

    const targetSection = sections.find((section) => section.id === modal?.sectionId);
    if (targetSection) {
      updateSection(targetSection.id, {
        selected: [...targetSection.selected, id],
        counts: {
          ...targetSection.counts,
          [question.difficulty]: (targetSection.counts[question.difficulty] || 0) + 1,
        },
      });
    }

    setModal(null);
    notify('Custom question added');
  };

  return (
    <div className="app-shell">
      <Sidebar mobileNav={mobileNav} notify={notify} />

      <main className="main">
        <Header mobileNav={mobileNav} setMobileNav={setMobileNav} />

        <div className="content">
          <PageHeading onSave={saveAssessment} />
          <AssessmentStepper />

          <AssessmentDetails
            assessmentType={assessmentType}
            setAssessmentType={setAssessmentType}
            assessmentName={assessmentName}
            setAssessmentName={setAssessmentName}
            sectionTimer={sectionTimer}
            setSectionTimer={setSectionTimer}
            duration={duration}
            setDuration={setDuration}
          />

          <QuestionsSections
            sections={sections}
            setSections={setSections}
            questions={questions}
            searches={searches}
            setSearches={setSearches}
            updateSection={updateSection}
            addSection={addSection}
            setModal={setModal}
            notify={notify}
          />

          <StudentsSection
            students={students}
            filteredStudents={filteredStudents}
            selectedStudents={selectedStudents}
            setSelectedStudents={setSelectedStudents}
            studentSearch={studentSearch}
            setStudentSearch={setStudentSearch}
            filters={filters}
            setFilters={setFilters}
            uploadRef={uploadRef}
            importStudents={importStudents}
          />

          <ScheduleAccess
            start={start}
            setStart={setStart}
            end={end}
            setEnd={setEnd}
            access={access}
            setAccess={setAccess}
          />

          <AssessmentSummary
            sectionCount={sections.length}
            questionCount={totalQuestions}
            markCount={totalMarks}
            studentCount={selectedStudents.length}
            onSave={saveAssessment}
          />
        </div>
      </main>

      {toast && (
        <div className="toast">
          <Icon name="check" />
          {toast}
          <button onClick={() => setToast('')} type="button"><Icon name="close" size={15} /></button>
        </div>
      )}

      {modal?.type === 'question' && (
        <QuestionModal onClose={() => setModal(null)} onSave={saveCustomQuestion} />
      )}
    </div>
  );
}
