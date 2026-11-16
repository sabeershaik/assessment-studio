import React from 'react';
import styled from 'styled-components';
import Icon from './Icon';

// styled-components is used here while retaining the existing CSS class name.
const Topbar = styled.header.attrs({ className: 'topbar' })``;

export default function Header({ mobileNav, setMobileNav }) {
  return (
    <Topbar>
      <button
        className="mobile-menu"
        onClick={() => setMobileNav((current) => !current)}
        aria-label="Toggle menu"
        type="button"
      >
        <Icon name="menu" />
      </button>
      <div className="breadcrumbs">
        Workspace <Icon name="arrow" size={14} />
        Assessments <Icon name="arrow" size={14} />
        <strong>Create assessment</strong>
      </div>
      <div className="topbar-right">
        <span className="status"><span /> Draft</span>
        <span className="avatar small">ED</span>
      </div>
    </Topbar>
  );
}
