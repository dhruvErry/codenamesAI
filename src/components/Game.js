import { useState, useEffect } from 'react';
import Board from './Board';
import TeamPanel from './TeamPanel';
import Clue from './Clue';
import './Game.css'
import Swal from 'sweetalert2'
import { io } from 'socket.io-client';

function Game() {
    const [cards, setCards] = useState([]);
    const [spy, setSpy] = useState(false);
    const [redLeft, setRedLeft] = useState(9)
    const [blueLeft, setBlueLeft] = useState(8)

    useEffect(() => {
        const words = [
            "ANJEL", "TREE", "BOMB", "CAR", "BOOK", "DOG", "HOUSE", "SUN", "MOON", "FIRE",
            "WATER", "MOUSE", "KEY", "DOOR", "PLANE", "CLOUD", "APPLE", "GOLD", "SALT", "IRON",
            "PAPER", "PHONE", "RING", "SHIP", "FISH"
        ];

        const teamCounts = {
            red: 9,
            blue: 8,
            yellow: 5,
            grey: 2,
            black: 1
        };

        let teams = [];

        for (let color in teamCounts) {
            for (let i = 0; i < teamCounts[color]; i++) {
                teams.push(color);
            }
        }

        const shuffledWords = [...words].sort(() => Math.random() - 0.5);
        const shuffledTeams = [...teams].sort(() => Math.random() - 0.5);

        const generated = [];

        for (let i = 0; i < 25; i++) {
            generated.push({
                word: shuffledWords[i],
                team: shuffledTeams[i],
                clicked: false,
                revealed: false,
            });
        }

        setCards(generated);
    }, []);

    function handleCardClick(index) {
        const updated = [...cards];
        updated[index].revealed = true;
        updated[index].clicked = false;
        setCards(updated);
        if (cards[index].team === 'red'){
            setRedLeft(prev => prev - 1)
        }
        else if (cards[index].team === 'blue'){
            setBlueLeft(prev => prev - 1)
        }
        else if (cards[index].team === 'grey'){
            Swal.fire({
            text: "A neutral card has been converted into a card of your color!",
            type: 'success',
            confirmButtonText: "That's a shame."
            })
        }
    }    

    function handleCardRightClick(e, index) {
        e.preventDefault();
        const updated = [...cards];
        updated[index].clicked = !updated[index].clicked;
        setCards(updated);      
        console.log(updated[index].clicked, 'Ryt Clict')
    }  
    
    return (
        <div className="game-container">
            <div className= 'team'>
                <TeamPanel
                    redLeft={redLeft} 
                    blueLeft={blueLeft}    
                    // onEndTurn={() => {}}
                    // onReset={() => {}}
                />
            </div>
            <div className='vertical-container'>
                <div className= 'title' style={{ color: 'green' }}>
                    CODEN
                    <span style={{ color: 'blue' }}>AI</span>
                    MS
                </div>
                <div className= 'board'>
                    <Board
                        cards={cards}
                        spy={spy}
                        onCardClick={handleCardClick}
                        onCardRightClick={handleCardRightClick}
                    />
                </div>
                <div className= 'clue'>
                    <Clue
                    />
                </div>
            </div>
            <div className= 'team'>
                <TeamPanel
                    redLeft={redLeft} 
                    blueLeft={blueLeft}    
                    // onEndTurn={() => {}}
                    // onReset={() => {}}
                />
            </div>
        </div>
    );
}

export default Game;