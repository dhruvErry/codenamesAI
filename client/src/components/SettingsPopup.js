import React, { useState, useEffect, useRef } from 'react';
import ThemeToggle from './ThemeToggle';
import './SettingsPopup.css';

function SettingsPopup({ onNewGame }) {
  const [isOpen, setIsOpen] = useState(false);
  const popupRef = useRef(null);
  const buttonRef = useRef(null);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && 
          popupRef.current && 
          !popupRef.current.contains(event.target) &&
          buttonRef.current &&
          !buttonRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="settings-container">
      <button ref={buttonRef} className={`settings-button ${isOpen ? 'rotated' : ''}`} onClick={togglePopup}>
        <img 
          src="https://i.ibb.co/rGYFSgx2/setingz.png" 
          alt="Settings" 
        />
      </button>
      
      {isOpen && (
        <div ref={popupRef} className="settings-popup">
          <div className="settings-content">
            <div className="setting-item">
              <label>Theme:</label>
              <ThemeToggle />
            </div>
            <div className="setting-item">
              <button 
                className="new-game-button" 
                onClick={() => {
                  onNewGame();
                  togglePopup();
                }}
              >
                New Game
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SettingsPopup; 