import React from 'react';
import Icon from './Icon';

export default function PageHeading({ onSave }) {
  return (
    <div className="page-heading">
      <div>
        <div className="eyebrow">ASSESSMENT BUILDER</div>
        <h1>Create an assessment</h1>
        <p>Set up your assessment, choose questions, and invite your students.</p>
      </div>
      <button className="primary save-top" onClick={onSave} type="button">
        <Icon name="check" /> Save assessment
      </button>
    </div>
  );
}
