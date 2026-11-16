import React from 'react';

export default function Field({ label, required = false, children, hint }) {
  return (
    <label className="field">
      <span className="field-label">
        {label}{required && <b> *</b>}
      </span>
      {children}
      {hint && <small>{hint}</small>}
    </label>
  );
}
