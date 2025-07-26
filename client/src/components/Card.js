import './Card.css';
import { useAtomValue } from 'jotai';
import { themeAtom } from '../Atoms';

function Card({ word, team, clicked, revealed, spy, onClick, onContextMenu }) {
  const theme = useAtomValue(themeAtom);
  
  function getClassName() {
    let base = 'card';
    if (revealed) base = 'card-revealed';
    else if (clicked) base = 'card-clicked';

    const teamClass = spy || revealed ? ` ${team}` : '';
    return base + teamClass + ` ${theme}`;
  }

  if (!revealed) {
    return (
      <div className={getClassName()} onClick={onClick} onContextMenu={onContextMenu}>
        <div className="word" style={{ color: theme === 'dark' ? '#f0f0f0' : 'grey' }}>
          {word}
        </div>
      </div>
    );
  }

  return (
    <div className={getClassName()} onClick={onClick}>
      <div className="word" style={{ color: 'white' }}>
        {word}
      </div>
    </div>
  );
}

export default Card;
