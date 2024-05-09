import React from 'react';
import './Tab.css'; // Import CSS file for styling

const Tab = ({ label, active, onSelect }) => {
  return (
    <div
      className={`tab ${active ? 'active' : ''}`}
      onClick={onSelect}
      role="button" // Add role="button" for accessibility
      tabIndex={0} // Add tabIndex={0} for keyboard accessibility
    >
      {label}
    </div>
  );
};

export default Tab;
