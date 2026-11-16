import React from 'react';
import Field from './Field';
import Icon from './Icon';
import Pill from './Pill';

export default function QuestionsSections({
  sections,
  setSections,
  questions,
  searches,
  setSearches,
  updateSection,
  addSection,
  setModal,
  notify,
}) {
  return (
    <>
      <div className="section-header">
        <div>
          <h2>Questions &amp; sections</h2>
          <p>Organize your questions into focused sections.</p>
        </div>
        <button className="outline" onClick={addSection} type="button">
          <Icon name="plus" /> Add section
        </button>
      </div>

      {sections.map((section, index) => {
        const term = (searches[section.id] || '').toLowerCase();
        const available = questions.filter(
          (question) => !section.selected.includes(question.id) && question.title.toLowerCase().includes(term),
        );
        const chosen = questions.filter((question) => section.selected.includes(question.id));
        const countByDiff = (difficulty) => chosen.filter((question) => question.difficulty === difficulty).length;
        const markTotal = ['Easy', 'Medium', 'Hard'].reduce(
          (total, difficulty) => total + section.counts[difficulty] * section.marks[difficulty],
          0,
        );

        return (
          <section className="card section-card" key={section.id}>
            <div className="section-top">
              <div className="section-number">{String(index + 1).padStart(2, '0')}</div>
              <div className="section-title">
                <h3>Section {index + 1}</h3>
                <p>Configure questions and scoring</p>
              </div>
              <button
                className="icon-btn danger"
                title="Remove section"
                onClick={() => sections.length > 1
                  ? setSections((previous) => previous.filter((item) => item.id !== section.id))
                  : notify('Keep at least one section')}
                type="button"
              >
                <Icon name="trash" />
              </button>
            </div>

            <div className="section-settings">
              <Field label="Section name" required>
                <input
                  value={section.name}
                  placeholder="Enter section name"
                  onChange={(event) => updateSection(section.id, { name: event.target.value })}
                />
              </Field>
              <Field label="Duration (minutes)" required>
                <input
                  type="number"
                  min="1"
                  value={section.duration}
                  onChange={(event) => updateSection(section.id, { duration: Number(event.target.value) })}
                />
              </Field>
              <Field label="Question type">
                <select value={section.type} onChange={(event) => updateSection(section.id, { type: event.target.value })}>
                  <option>One-word</option>
                  <option>Multiple choice</option>
                  <option>Short answer</option>
                </select>
              </Field>
            </div>

            <label className="checkline">
              <input
                type="checkbox"
                checked={section.optional}
                onChange={(event) => updateSection(section.id, { optional: event.target.checked })}
              />
              This section contains optional questions
            </label>

            <div className="question-panels">
              <div className="question-panel">
                <div className="panel-head">
                  <h4>Question bank</h4>
                  <Pill>{available.length} available</Pill>
                </div>
                <div className="search-wrap">
                  <Icon name="search" />
                  <input
                    placeholder="Search questions..."
                    value={searches[section.id] || ''}
                    onChange={(event) => setSearches((previous) => ({ ...previous, [section.id]: event.target.value }))}
                  />
                </div>
                <div className="question-list">
                  {available.length ? available.map((question) => (
                    <div className="question-row" key={question.id}>
                      <div className="question-info">
                        <strong>{question.title}</strong>
                        <span>{question.topic} · <Pill tone={question.difficulty.toLowerCase()}>{question.difficulty}</Pill></span>
                      </div>
                      <button
                        className="add-question"
                        aria-label={`Add ${question.title}`}
                        onClick={() => updateSection(section.id, {
                          selected: [...section.selected, question.id],
                          counts: { ...section.counts, [question.difficulty]: countByDiff(question.difficulty) + 1 },
                        })}
                        type="button"
                      >
                        <Icon name="plus" size={16} />
                      </button>
                    </div>
                  )) : <div className="empty-small">No matching questions</div>}
                </div>
              </div>

              <div className="question-panel selected-panel">
                <div className="panel-head">
                  <h4>Selected questions</h4>
                  <Pill tone="purple">{chosen.length} selected</Pill>
                </div>
                <div className="selected-subhead">Questions included in this section</div>
                <div className="question-list">
                  {chosen.length ? chosen.map((question) => (
                    <div className="question-row" key={question.id}>
                      <div className="question-info">
                        <strong>{question.title}</strong>
                        <span>{question.topic} · <Pill tone={question.difficulty.toLowerCase()}>{question.difficulty}</Pill></span>
                      </div>
                      <button
                        className="icon-btn"
                        title="Remove question"
                        onClick={() => updateSection(section.id, {
                          selected: section.selected.filter((id) => id !== question.id),
                          counts: { ...section.counts, [question.difficulty]: Math.max(0, countByDiff(question.difficulty) - 1) },
                        })}
                        type="button"
                      >
                        <Icon name="close" size={15} />
                      </button>
                    </div>
                  )) : (
                    <div className="empty-state">
                      <span className="empty-symbol"><Icon name="clipboard" size={26} /></span>
                      <strong>No questions selected</strong>
                      <p>Add questions from the bank to get started.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="section-actions">
              <button className="soft-button" onClick={() => setModal({ type: 'question', sectionId: section.id })} type="button">
                <Icon name="plus" size={16} /> Add custom question
              </button>
              <button
                className="text-button"
                onClick={() => {
                  const text = JSON.stringify(chosen, null, 2);
                  const blob = new Blob([text], { type: 'application/json' });
                  const url = URL.createObjectURL(blob);
                  const link = document.createElement('a');
                  link.href = url;
                  link.download = `section-${index + 1}-questions.json`;
                  link.click();
                  URL.revokeObjectURL(url);
                }}
                type="button"
              >
                <Icon name="upload" size={16} /> Export questions JSON
              </button>
            </div>

            <div className="scoring">
              <div className="scoring-title">
                <h4>Scoring configuration</h4>
                <p>Set question counts and marks by difficulty.</p>
              </div>
              <div className="score-grid">
                {['Easy', 'Medium', 'Hard'].map((difficulty) => (
                  <div className="score-item" key={difficulty}>
                    <div className="score-item-title">
                      <Pill tone={difficulty.toLowerCase()}>{difficulty}</Pill>
                      <span>{countByDiff(difficulty)} selected</span>
                    </div>
                    <div className="score-fields">
                      <Field label="Questions">
                        <input
                          type="number"
                          min="0"
                          max={countByDiff(difficulty)}
                          value={section.counts[difficulty]}
                          onChange={(event) => updateSection(section.id, {
                            counts: {
                              ...section.counts,
                              [difficulty]: Math.max(0, Math.min(countByDiff(difficulty), Number(event.target.value))),
                            },
                          })}
                        />
                      </Field>
                      <Field label="Marks each">
                        <input
                          type="number"
                          min="0"
                          value={section.marks[difficulty]}
                          onChange={(event) => updateSection(section.id, {
                            marks: { ...section.marks, [difficulty]: Math.max(0, Number(event.target.value)) },
                          })}
                        />
                      </Field>
                    </div>
                  </div>
                ))}
              </div>
              <div className="score-total">
                <span>Section total</span>
                <strong>{markTotal} marks</strong>
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
}
