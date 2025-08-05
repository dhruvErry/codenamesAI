import Card from './Card';
import { useAtomValue } from 'jotai';
import { themeAtom, playerAtom, redTurnAtom, gameOverAtom } from '../Atoms';
import './Board.css';

function Board({ cards, onCardRightClick, onCardClick}) {
    const theme = useAtomValue(themeAtom);
    const player = useAtomValue(playerAtom);
    const redTurn = useAtomValue(redTurnAtom);
    const gameOver = useAtomValue(gameOverAtom);
    const isSpymaster = player?.spy || false;
    
    if (cards.length < 25) {
        return <div>Loading...</div>;
    }    return (
        <div className={`container-board ${theme}`}>
            {cards.map((card, i) => {
                const whoseTurn = redTurn ? "red" : "blue";
                const clickable = !gameOver && whoseTurn === player?.team && !isSpymaster && !card.revealed;
                return (
                    <Card
                        key={i}
                        word={card.word}
                        team={card.team}
                        rightClicked={card.rightClicked}
                        revealed={card.revealed}
                        visible={isSpymaster}
                        onClick={clickable ? () => onCardClick(i) : () => {}}
                        onContextMenu={clickable ? (e) => onCardRightClick(e, i) : (e) => e.preventDefault()}
                    />
                );
            })}
        </div>
    );
}

export default Board;
