import './GitHubButton.css';

function GitHubButton() {
  return (
    <div className="github-container">
      <button className="github-button" onClick={() => window.open('https://github.com/dhruvErry/codenamesAI/', '_blank')}>
        <img 
          src="/gitHub.png" 
          alt="GitHub" 
        />
      </button>
    </div>
  );
}

export default GitHubButton; 