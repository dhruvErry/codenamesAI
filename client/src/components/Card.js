import './Card.css';

function Card({ word, team, clicked, revealed, spy, onClick, onContextMenu }) {
  function getClassName() {
    let base = 'card';
    if (revealed) base = 'card-revealed';
    else if (clicked) base = 'card-clicked';

    const teamClass = spy || revealed ? ` ${team}` : '';
    return base + teamClass;
  }

  if (!revealed) {
    return (
      <div className={getClassName()} onClick={onClick} onContextMenu={onContextMenu}>
        <div className="word" style={{ color: 'grey' }}>
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
