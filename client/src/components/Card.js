import './Card.css';
import { useAtomValue } from 'jotai';
import { themeAtom } from '../Atoms';

function Card({ word, team, rightClicked, revealed, visible, onClick, onContextMenu }) {
  const theme = useAtomValue(themeAtom);
  
  function getClassName() {
    let base = 'card';
    if (revealed) base = 'card-revealed';
    else if (rightClicked) base = 'card-clicked';

    // Show team color to spymasters (visible = true) or when card is revealed
    const teamClass = (visible || revealed) ? ` ${team}` : '';
    return base + teamClass + ` ${theme}`;
  }

  function getTextColor() {
    if (revealed) {
      // Return team color for revealed cards
      switch (team) {
        case 'red': return 'red';
        case 'blue': return 'blue';
        case 'yellow': return 'orange';
        case 'grey': return 'grey';
        case 'black': return 'black';
        default: return 'white';
      }
    }
    // Default colors for unrevealed cards
    if (visible) {
      // Spymasters see white text on colored cards
      return 'white';
    }
    return theme === 'dark' ? '#f0f0f0' : 'grey';
  }

  if (!revealed) {
    return (
      <div className={getClassName()} onClick={onClick} onContextMenu={onContextMenu}>
        <div className="word" style={{ color: getTextColor() }}>
          {word}
        </div>
      </div>
    );
  }

  return (
    <div className={getClassName()} onClick={onClick}>
      <div className="word" style={{ color: getTextColor() }}>
        {word}
      </div>
    </div>
  );
}

export default Card;
