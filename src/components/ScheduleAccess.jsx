import React from 'react';
import Field from './Field';
import Icon from './Icon';

export default function ScheduleAccess({ start, setStart, end, setEnd, access, setAccess }) {
  return (
    <section className="card">
      <div className="card-title">
        <span className="card-icon peach"><Icon name="calendar" /></span>
        <div>
          <h2>Schedule &amp; access</h2>
          <p>Set the assessment availability window.</p>
        </div>
      </div>
      <div className="form-grid schedule-grid">
        <Field label="Start date & time" required>
          <input type="datetime-local" value={start} onChange={(event) => setStart(event.target.value)} />
        </Field>
        <Field label="End date & time" required>
          <input type="datetime-local" min={start} value={end} onChange={(event) => setEnd(event.target.value)} />
        </Field>
        <Field label="Assessment access" required>
          <select value={access} onChange={(event) => setAccess(event.target.value)}>
            <option>Normal</option>
            <option>Restricted</option>
            <option>Open</option>
          </select>
        </Field>
      </div>
    </section>
  );
}
