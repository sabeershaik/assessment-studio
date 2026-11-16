import React, { useState } from 'react';
import Field from './Field';
import Icon from './Icon';

export default function QuestionModal({ onClose, onSave }) {
  const [title, setTitle] = useState('');
  const [answer, setAnswer] = useState('');
  const [difficulty, setDifficulty] = useState('Easy');
  const [topic, setTopic] = useState('General Knowledge');

  return (
    <div className="modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-header">
          <div><h2>Add a question</h2><p>Create a new question for your section.</p></div>
          <button className="icon-btn" onClick={onClose} type="button"><Icon name="close" /></button>
        </div>
        <div className="modal-fields">
          <Field label="Question" required>
            <textarea rows="3" placeholder="Type your question..." value={title} onChange={(event) => setTitle(event.target.value)} />
          </Field>
          <Field label="Answer" required>
            <input placeholder="Correct answer" value={answer} onChange={(event) => setAnswer(event.target.value)} />
          </Field>
          <Field label="Topic">
            <input value={topic} onChange={(event) => setTopic(event.target.value)} />
          </Field>
          <Field label="Difficulty">
            <select value={difficulty} onChange={(event) => setDifficulty(event.target.value)}>
              <option>Easy</option><option>Medium</option><option>Hard</option>
            </select>
          </Field>
        </div>
        <div className="modal-footer">
          <button className="outline" onClick={onClose} type="button">Cancel</button>
          <button
            className="primary"
            disabled={!title.trim() || !answer.trim()}
            onClick={() => onSave({ title, answer, difficulty, topic })}
            type="button"
          >
            Add question
          </button>
        </div>
      </div>
    </div>
  );
}
