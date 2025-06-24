// import socket from '../socket';
import {useState} from 'react';
import { useNavigate } from "react-router-dom";
import './Clue.css';

function Clue () {
    const [clue, setClue] = useState("");
    const [number, setNumber] = useState("");
    const navigate = useNavigate();

    function handleSubmit (e) {
        e.preventDefault()
        setClue(e.target[0].value)
        setNumber(e.target[1].value)
        // socket.emit("join room", (room, name))
        // navigate('/game')
    }      if (clue === "") {
        return (
            <div className = 'clue-container'>
                <form className="clue-form" onSubmit = {handleSubmit}>
                    <label htmlFor="clue"></label>
                    <input className="clue-input" type="text" placeholder = "Enter Clue" id = "clue" required/>
                    <label htmlFor="number"></label>
                    <input className="clue-input" type = "number" placeholder = "0" id = "number" min = "0" required/>
                    <button type="submit" className= 'clue-button'>Give Cloo</button>
                </form>
            </div>
        )
    }

    return (
        <div className = 'clue-display'>
            {clue.toUpperCase()} {number}
        </div>
    )
}

export default Clue;