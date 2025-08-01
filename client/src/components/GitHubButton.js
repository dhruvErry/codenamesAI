import React from 'react';
import './GitHubButton.css';

function GitHubButton() {
  return (
    <div className="github-container">
      <button className="github-button" onClick={() => window.open('https://github.com/dhruvErry/codenamesAI/', '_blank')}>
        <img 
          src="https://cdn.creazilla.com/icons/3255989/github-icon-lg.png" 
          alt="GitHub" 
        />
      </button>
    </div>
  );
}

export default GitHubButton; 