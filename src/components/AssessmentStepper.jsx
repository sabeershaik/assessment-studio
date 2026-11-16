import React from 'react';

export default function AssessmentStepper() {
  return (
    <div className="stepper">
      <div className="step active"><span>1</span> Basic details</div>
      <div className="step-line" />
      <div className="step active"><span>2</span> Questions &amp; sections</div>
      <div className="step-line" />
      <div className="step active"><span>3</span> Students &amp; schedule</div>
    </div>
  );
}
