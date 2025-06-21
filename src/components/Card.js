// Card.js
import './Card.css';

function Card({word, team, revealed, spy, onClick}) {
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

    return (
        <div className="card" onClick={onClick} style={{
            backgroundColor: getCardColor()
        }}>
            <div className="word" style={{
                color: spy || revealed? 'white' : 'grey'
            }}>
                {word}
            </div>
        </div>
    );
}

export default Card;
