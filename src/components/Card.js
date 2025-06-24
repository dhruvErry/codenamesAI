import './Card.css';

function Card({word, team, clicked, revealed, spy, onClick, onContextMenu}) {

    function getCardColor() {
        if (spy || revealed) {
            switch (team) {
                case 'red': return 'red';
                case 'blue': return 'blue';
                case 'yellow': return 'orange';
                case 'grey': return 'grey';
                case 'black': return 'black';
                default: return 'white';
            }
        }
        return 'white';
    }

    if (!revealed) {
        if (!clicked) {
            return (
                <div className="card" onClick={onClick} onContextMenu={onContextMenu} style={{
                    backgroundColor: getCardColor()
                }}>
                    <div className="word" style={{
                        color: 'grey'
                    }}>
                        {word}
                    </div>
                </div>
            );
        }
        else {
            return (
                <div className="card-clicked" onClick={onClick} onContextMenu={onContextMenu} style={{
                    backgroundColor: getCardColor()
                }}>
                    <div className="word" style={{
                        color: 'grey'
                    }}>
                        {word}
                    </div>
                </div>
            );
        }
    }
    else {
        return (
            <div className="card-revealed" onClick={onClick} style={{
                backgroundColor: getCardColor()
            }}>
                <div className="word" style={{
                    color: 'white'
                }}>
                    {word}
                </div>
            </div>
        );
    }
}

export default Card;
