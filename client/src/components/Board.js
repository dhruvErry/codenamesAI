import Card from './Card';
import { useAtomValue } from 'jotai';
import { themeAtom, playerAtom } from '../Atoms';
import './Board.css';

function Board({ cards, onCardRightClick, onCardClick}) {
    const theme = useAtomValue(themeAtom);
    const player = useAtomValue(playerAtom);
    const isSpymaster = player?.spy || false;
    
    if (cards.length < 25) {
        return <div>Loading...</div>;
    }    return (
        <div className={`container-board ${theme}`}>
            {cards.map((card, i) => (
                <Card
                    key={i}
                    word={card.word}
                    team={card.team}
                    clicked={card.clicked}
                    revealed={isSpymaster ? true : card.revealed}
                    onClick={isSpymaster || card.revealed ? () => {} : () => onCardClick(i)}
                    onContextMenu={isSpymaster || card.revealed ? () => {} : (e) => onCardRightClick(e, i)}
                />
            ))}
        </div>
    );
}

export default Board;
