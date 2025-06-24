import Card from './Card';
import './Board.css';

function Board({ cards, spy, onCardRightClick, onCardClick}) {
    if (cards.length < 25) {
        return <div>Loading...</div>;
    }    return (
        <div className="container-board">
            {cards.map((card, i) => (
                <Card
                    key={i}
                    word={card.word}
                    team={card.team}
                    clicked={card.clicked}
                    revealed={card.revealed}
                    spy={spy}
                    onClick={spy || card.revealed ? () => {} : () => onCardClick(i)}
                    onContextMenu={spy || card.revealed ? () => {} : (e) => onCardRightClick(e, i)}
                />
            ))}
        </div>
    );
}

export default Board;
