import React from 'react';
import Field from './Field';
import Icon from './Icon';
import Pill from './Pill';

export default function StudentsSection({
  students,
  filteredStudents,
  selectedStudents,
  setSelectedStudents,
  studentSearch,
  setStudentSearch,
  filters,
  setFilters,
  uploadRef,
  importStudents,
}) {
  return (
    <>
      <div className="section-header" id="students">
        <div>
          <h2>Students &amp; schedule</h2>
          <p>Choose who can take this assessment and when.</p>
        </div>
        <Pill tone="purple">{selectedStudents.length} students selected</Pill>
      </div>

      <section className="card">
        <div className="card-title">
          <span className="card-icon blue"><Icon name="users" /></span>
          <div>
            <h2>Assign students</h2>
            <p>Showing students from Meenakshi Ramaswamy College of Engineering</p>
          </div>
        </div>
        <div className="student-tools">
          <div className="search-wrap">
            <Icon name="search" />
            <input
              placeholder="Search by name, email, or roll no."
              value={studentSearch}
              onChange={(event) => setStudentSearch(event.target.value)}
            />
          </div>
          {[
            ['department', 'Department'],
            ['year', 'Year'],
            ['level', 'UG / PG'],
            ['batch', 'Batch'],
          ].map(([key, label]) => (
            <select
              key={key}
              aria-label={label}
              value={filters[key]}
              onChange={(event) => setFilters((previous) => ({ ...previous, [key]: event.target.value }))}
            >
              <option value="">{label}</option>
              {[...new Set(students.map((student) => student[key]).filter(Boolean))].map((value) => (
                <option key={value} value={value}>{value}</option>
              ))}
            </select>
          ))}
          <button className="outline upload-btn" onClick={() => uploadRef.current?.click()} type="button">
            <Icon name="upload" size={16} /> Import CSV
          </button>
          <input hidden ref={uploadRef} type="file" accept=".csv" onChange={importStudents} />
        </div>

        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>
                  <input
                    aria-label="Select all visible students"
                    type="checkbox"
                    checked={filteredStudents.length > 0 && filteredStudents.every((student) => selectedStudents.includes(student.id))}
                    onChange={(event) => setSelectedStudents((previous) => event.target.checked
                      ? [...new Set([...previous, ...filteredStudents.map((student) => student.id)])]
                      : previous.filter((id) => !filteredStudents.some((student) => student.id === id)))}
                  />
                </th>
                <th>Name</th><th>Email</th><th>Roll number</th><th>Department</th><th>Year</th><th>UG/PG</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => (
                <tr key={student.id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedStudents.includes(student.id)}
                      onChange={(event) => setSelectedStudents((previous) => event.target.checked
                        ? [...previous, student.id]
                        : previous.filter((id) => id !== student.id))}
                    />
                  </td>
                  <td><strong>{student.name}</strong></td>
                  <td>{student.email}</td>
                  <td>{student.roll}</td>
                  <td>{student.department}</td>
                  <td>{student.year}</td>
                  <td><Pill>{student.level}</Pill></td>
                </tr>
              ))}
            </tbody>
          </table>
          {!filteredStudents.length && <div className="empty-small">No students match your filters.</div>}
        </div>
        <div className="table-footer">
          <span><strong>{selectedStudents.length}</strong> students selected</span>
          <div>
            <button className="text-button" onClick={() => setSelectedStudents(students.map((student) => student.id))} type="button">Select all</button>
            <button className="text-button muted" onClick={() => setSelectedStudents([])} type="button">Clear selection</button>
          </div>
        </div>
      </section>
    </>
  );
}
