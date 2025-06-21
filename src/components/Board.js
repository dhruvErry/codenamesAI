
import { useState, useEffect } from 'react';
import Card from './Card';
import './Board.css';

function Board({ spy }) {
    const [cards, setCards] = useState([]);
    
    useEffect(() => {
        const words = [
            "ANJEL", "TREE", "BOMB", "CAR", "BOOK", "DOG", "HOUSE", "SUN", "MOON", "FIRE",
            "WATER", "MOUSE", "KEY", "DOOR", "PLANE", "CLOUD", "APPLE", "GOLD", "SALT", "IRON",
            "PAPER", "PHONE", "RING", "SHIP", "FISH"
        ];
        
        const teamCounts = {
            red: 9,
            blue: 8,
            yellow: 4,
            grey: 2,
            black: 1
        };
        
        let teams = [];
        
        for (let color in teamCounts) {
            for (let i = 0; i < teamCounts[color]; i++) {
                teams.push(color);
            }
        }
        
        // Shuffle both words and teams
        const shuffledWords = [...words].sort(() => Math.random() - 0.5);
        const shuffledTeams = [...teams].sort(() => Math.random() - 0.5);
        
        // const generated = shuffledWords.map((word, i) => ({
            //     word,
        //     team: shuffledTeams[i],
        //     revealed: false
        // }));
        
        const generated = [];
        
        for (let i = 0; i < 25; i++) {
            generated.push({
                word: shuffledWords[i],
                team: shuffledTeams[i],
                revealed: false
            });
        }
        
        setCards(generated);
    }, []);
    
    const cardObjects = [];
    
    if (cards.length < 25) {
        return <div>Loading...</div>;
    }
    
    for (let i = 0; i < 25; i++){
        const card = cards[i];
        cardObjects.push(
            <Card
            key = {i}
            word = {card.word}
            team = {card.team}
            revealed= {card.revealed}
            spy = {spy}
            onClick={spy ? () => {} : () => handleCardClick(i)}
            />  
        )
    }
    
    function handleCardClick(index) {
        const updated = [...cards];
        updated[index].revealed = true;
        setCards(updated);
        console.log(cards[index])
    }
    
    
    
    return (
        <div className="containerBoard">
            {cardObjects.map((card, index) => (
                <div key={index}>{card}</div> 
            ))}
        </div>
    );
}

export default Board;