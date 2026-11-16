import React from 'react';
import Icon from './Icon';

export default function AssessmentSummary({ sectionCount, questionCount, markCount, studentCount, onSave }) {
  return (
    <div className="bottom-bar">
      <div>
        <span className="bottom-label">ASSESSMENT SUMMARY</span>
        <div className="summary-stats">
          <span><strong>{sectionCount}</strong> sections</span>
          <span><strong>{questionCount}</strong> questions</span>
          <span><strong>{markCount}</strong> marks</span>
          <span><strong>{studentCount}</strong> students</span>
        </div>
      </div>
      <button className="primary" onClick={onSave} type="button">
        <Icon name="check" /> Save assessment
      </button>
    </div>
  );
}
