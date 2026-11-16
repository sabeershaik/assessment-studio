import React from 'react';
import Field from './Field';
import Icon from './Icon';

export default function AssessmentDetails({
  assessmentType,
  setAssessmentType,
  assessmentName,
  setAssessmentName,
  sectionTimer,
  setSectionTimer,
  duration,
  setDuration,
}) {
  return (
    <section className="card">
      <div className="card-title">
        <span className="card-icon lavender"><Icon name="clipboard" /></span>
        <div>
          <h2>Assessment details</h2>
          <p>Start with the basics of your new assessment.</p>
        </div>
      </div>
      <div className="form-grid">
        <Field label="Assessment type" required>
          <select value={assessmentType} onChange={(event) => setAssessmentType(event.target.value)}>
            <option>Main Assessment</option>
            <option>Practice Assessment</option>
            <option>Mock Test</option>
            <option>Quiz</option>
          </select>
        </Field>
        <Field label="Assessment name" required>
          <input
            placeholder="e.g. Semester 1 – General Aptitude"
            value={assessmentName}
            onChange={(event) => setAssessmentName(event.target.value)}
          />
        </Field>
        <Field label="Section-wise timer" required>
          <select value={sectionTimer} onChange={(event) => setSectionTimer(event.target.value)}>
            <option>Yes</option>
            <option>No</option>
          </select>
        </Field>
        <Field label="Total duration (minutes)" required>
          <div className="input-icon">
            <Icon name="clock" />
            <input type="number" min="1" value={duration} onChange={(event) => setDuration(Number(event.target.value))} />
          </div>
        </Field>
      </div>
    </section>
  );
}
