import { socketAtom } from '../Atoms';
import {useState} from 'react';
import './Clue.css';

function Clue () {
    const [clue, setClue] = useState("");
    const [number, setNumber] = useState("");

    function handleSubmit (e) {
        e.preventDefault()
        setClue(e.target[0].value)
        setNumber(e.target[1].value)
        // socket.emit("join room", (room, name))
    }      
    
    if (clue === "") {
        return (
            <div className = 'clue-container'>
                <form className="clue-form" onSubmit = {handleSubmit}>
                    <label htmlFor="clue"></label>
                    <input className="clue-input" type="text" placeholder = "Enter Clue" id = "clue" required/>
                    <label htmlFor="number"></label>
                    <input className="clue-input" type = "number" placeholder = "0" id = "number" min = "0" required/>
                    <button type="submit" className= 'clue-button'>Give Clue</button>
                </form>
            </div>
        )
    }

    return (
        <div className = 'clue-display'>
            {clue.toUpperCase()} {'\u00A0'} {number}
        </div>
    )
}

export default Clue;