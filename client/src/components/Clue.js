import { socketAtom, cluesAtom, redTurnAtom, activeClueIndexAtom, themeAtom } from '../Atoms';
import { useAtom, useAtomValue } from "jotai";
import { useState, useEffect } from 'react';
import './Clue.css';

function Clue() {
    const socket = useAtomValue(socketAtom)
    const redTurn = useAtomValue(redTurnAtom)
    const activeClueIndex = useAtomValue(activeClueIndexAtom)
    const [clues, setClues] = useAtom(cluesAtom)
    const theme = useAtomValue(themeAtom)

    function giveClue (e) {
        e.preventDefault()
        const clue = e.target[0].value
        const number = e.target[1].value
        socket.emit("clue", clue, number)
    }

    function endTurn (e) {
        e.preventDefault()
        socket.emit("change turn", redTurn ? 'blue' : 'red');
    }

    if (activeClueIndex === null || !clues[activeClueIndex]) {
        return (
            <div className = {`clue-container ${theme}`}>
                    <form className="clue-form" onSubmit = {giveClue}>
                        <label htmlFor="clue"></label>
                        <input className={`clue-input ${theme}`} type="text" placeholder = "Enter Clue" id = "clue" required/>
                        <label htmlFor="number"></label>
                        <input className={`clue-input ${theme}`} type = "number" placeholder = "0" id = "number" min = "0" required/>
                        <button
                            type="submit"
                            className='clue-button'
                            style={{ background: redTurn ? 'red' : 'blue' }}
                        >Give Clue</button>
                    </form>
            </div>
        )
    }

    return (
        <div className = 'clue-display-container'>
            <div className = {`clue-display ${theme}`}>
                {clues[activeClueIndex].clue.toUpperCase()} {'\u00A0'} {clues[activeClueIndex].number}
            </div>
            <div className = 'clue-bottom'>
                <form onSubmit = {endTurn}>
                    <button
                        className = 'clue-button end-turn-button'
                        style={{ background: redTurn ? 'red' : 'blue' }}
                    >End Turn</button>
                </form>
            </div>
        </div>
    )
}

export default Clue;