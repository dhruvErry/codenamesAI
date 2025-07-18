import { socketAtom, cluesAtom } from '../Atoms';
import { useAtom, useAtomValue } from "jotai";
import { useState, useEffect } from 'react';
import './Clue.css';

function Clue({ clues, activeClueIndex }) {
    const socket = useAtomValue(socketAtom)

    function handleSubmit (e) {
        e.preventDefault()
        const clue = e.target[0].value
        const number = e.target[1].value
        socket.emit("clue", clue, number)
    }

    if (activeClueIndex === null || !clues[activeClueIndex]) {
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
            {clues[activeClueIndex].clue.toUpperCase()} {'\u00A0'} {clues[activeClueIndex].number}
        </div>
    )
}

export default Clue;