import {useState} from 'react';
import { useNavigate } from "react-router-dom";
import './Game.css';

function Game () {
    const [cards, setCards] = useState(() =>
        ["apple", "river", "moon", "engine", "chair", "python", "satellite", "forest", "castle", "guitar", "volcano", "pencil", "window", "robot", "pirate", "diamond", "cloud", "battery", "mirror", "flute", "planet", "tunnel", "rocket", "glove", "cactus"]
        .map(word => ({ word, team: null, spy: false })))

    return (
        <div>This is the game</div>
    )
}

export default Game;