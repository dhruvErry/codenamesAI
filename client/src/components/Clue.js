import { socketAtom, playerAtom, cluesAtom, redTurnAtom, activeClueIndexAtom, themeAtom } from '../Atoms';
import { useAtom, useAtomValue } from "jotai";
import { useState, useEffect } from 'react';
import './Clue.css';

function Clue() {
    const socket = useAtomValue(socketAtom)
    const redTurn = useAtomValue(redTurnAtom)
    const activeClueIndex = useAtomValue(activeClueIndexAtom)
    const [clues, setClues] = useAtom(cluesAtom)
    const theme = useAtomValue(themeAtom)
    const player = useAtomValue(playerAtom)
    const isSpymaster = player?.spy || false;

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

    // Determine what to show based on spymaster status and clue state
    const hasClue = activeClueIndex !== null && clues[activeClueIndex];
    const isMyTurn = (redTurn && player?.team === 'red') || (!redTurn && player?.team === 'blue');
    
    const renderButton = () => {
        if (isMyTurn && !isSpymaster) {
            return (
                <form onSubmit = {endTurn}>
                    <button className = 'clue-button end-turn-button' style={{ background: redTurn ? 'red' : 'blue' }}>End Turn</button>
                </form>
            )
        } else {
            return null;
        }
    }

    // Show clue normally
    if (hasClue) {
        return (
            <div className = 'clue-display-container'>
                <div className = {`clue-display ${theme}`}>
                    {clues[activeClueIndex].clue.toUpperCase()} {'\u00A0'} {clues[activeClueIndex].number}
                </div>
                <div className = 'clue-bottom'>
                    {renderButton()}
                </div>
            </div>
        );
    }
    
    // If spymaster and no clue, check whose turn
    if (isSpymaster && !hasClue) {
        if (isMyTurn) {
            // Show enter clue box
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
            );
        } else {
            // Show waiting for clue
            return (
                <div className = {`clue-container ${theme}`}>
                    <div className="waiting-clue">Waiting for SpyMaster to set clue...</div>
                </div>
            );
        }
    }
    
    // If not spymaster and no clue, show waiting
    if (!isSpymaster && !hasClue) {
        return (
            <div className = {`clue-container ${theme}`}>
                <div className="waiting-clue">Waiting for SpyMaster to set clue...</div>
            </div>
        );
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