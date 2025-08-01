import React, { useState } from 'react';
import ThemeToggle from './ThemeToggle';
import './SettingsPopup.css';

function SettingsPopup() {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="github-container">
        <button className="github-button" onClick={() => window.open('https://github.com/dhruvErry/codenamesAI/', '_blank')}>
          <img 
            src="https://cdn.creazilla.com/icons/3255989/github-icon-lg.png" 
            alt="GitHub" 
          />
        </button>
      </div>
      
      <div className="settings-container">
        <button className="settings-button" onClick={togglePopup}>
          <img 
            src="https://i.ibb.co/rGYFSgx2/setingz.png" 
            alt="Settings" 
          />
        </button>
        
        {isOpen && (
          <div className="settings-popup">
            <div className="settings-header">
              <h3>Settings</h3>
              <button className="close-button" onClick={togglePopup}>
                ×
              </button>
            </div>
            <div className="settings-content">
              <div className="setting-item">
                <label>Theme:</label>
                <ThemeToggle />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default SettingsPopup; 