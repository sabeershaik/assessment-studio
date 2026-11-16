import React from 'react';
import Icon from './Icon';

export default function Sidebar({ mobileNav, notify }) {
  const scrollToStudents = () => {
    document.getElementById('students')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <aside className={`sidebar ${mobileNav ? 'show' : ''}`}>
      <div className="brand">
        <span className="brand-mark"><Icon name="spark" size={22} /></span>
        <span>assess<span className="brand-accent">flow</span><small>EDUCATOR WORKSPACE</small></span>
      </div>
      <div className="nav-caption">WORKSPACE</div>
      <nav>
        <button className="nav-item" onClick={() => notify('Dashboard preview is not included')} type="button">
          <Icon name="grid" /> Dashboard
        </button>
        <button className="nav-item active" type="button">
          <Icon name="clipboard" /> Assessments <span className="nav-dot" />
        </button>
        <button className="nav-item" onClick={scrollToStudents} type="button">
          <Icon name="users" /> Students
        </button>
        <button className="nav-item" onClick={() => notify('Settings preview is not included')} type="button">
          <Icon name="settings" /> Settings
        </button>
      </nav>
      <div className="sidebar-bottom">
        <div className="help-card">
          <span className="help-icon">✦</span>
          <strong>Build better assessments</strong>
          <p>Everything you need to create engaging evaluations.</p>
        </div>
        <div className="profile">
          <span className="avatar">ED</span>
          <div><strong>Educator</strong><small>Administrator</small></div>
          <span className="profile-more">⋯</span>
        </div>
      </div>
    </aside>
  );
}
