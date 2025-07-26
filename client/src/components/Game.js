import { useState, useEffect } from 'react';
import Board from './Board';
import TeamPanel from './TeamPanel';
import Clue from './Clue';
import './Game.css'
import Swal from 'sweetalert2'
import { useAtom, useAtomValue } from "jotai";
import { socketAtom, cluesAtom, activeClueIndexAtom, redTurnAtom, redLeftAtom, blueLeftAtom, themeAtom } from "../Atoms";
import { useLocation, Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import ThemeToggle from './ThemeToggle';

function Game() {
    const socket = useAtomValue(socketAtom)
    const [clues, setClues] = useAtom(cluesAtom);
    const [activeClueIndex, setActiveClueIndex] = useAtom(activeClueIndexAtom);
    const [cards, setCards] = useState([]);
    const [spy, setSpy] = useState(false);
    const [redLeft, setRedLeft] = useAtom(redLeftAtom);
    const [blueLeft, setBlueLeft] = useAtom(blueLeftAtom);
    const location = useLocation();
    const room = location.state?.room;
    const name = location.state?.name;
    const [redTurn, setRedTurn] = useAtom(redTurnAtom);
    const theme = useAtomValue(themeAtom);

    // useEffect(() => {
    //     const words = [
    //         "ANJEL", "TREE", "BOMB", "CAR", "BOOK", "DOG", "HOUSE", "SUN", "MOON", "FIRE",
    //         "WATER", "MOUSE", "KEY", "DOOR", "PLANE", "CLOUD", "APPLE", "GOLD", "SALT", "IRON",
    //         "PAPER", "PHONE", "RING", "SHIP", "FISH"
    //     ];

    //     const teamCounts = {
    //         red: 9,
    //         blue: 8,
    //         yellow: 5,
    //         grey: 2,
    //         black: 1
    //     };

    //     let teams = [];

    //     for (let color in teamCounts) {
    //         for (let i = 0; i < teamCounts[color]; i++) {
    //             teams.push(color);
    //         }
    //     }

    //     const shuffledWords = [...words].sort(() => Math.random() - 0.5);
    //     const shuffledTeams = [...teams].sort(() => Math.random() - 0.5);

    //     const generated = [];

    //     for (let i = 0; i < 25; i++) {
    //         generated.push({
    //             word: shuffledWords[i],
    //             team: shuffledTeams[i],
    //             clicked: false,
    //             revealed: false,
    //         });
    //     }

    //     setCards(generated);
    // }, []);

    useEffect(() => {
        socket.on("create game", (room) => {
            setCards(room.cards);
            setClues(room.clues);
            setActiveClueIndex(room.activeClueIndex);
            setRedTurn(room.redTurn);
            console.log("Received create game, redTurn:", room.redTurn);
        })
        return () => { socket.off("create game") }
    }, [socket])

    useEffect(() => {
        if (room && name) {
            console.log("Emitting join room", room, name);
            socket.emit("join room", room, name);
        }
    }, [])

    useEffect(() => {
        socket.on("clue", (clue, number, index) => {
            setClues(prev => [...prev, {clue: clue, number: number}]);
            setActiveClueIndex(index);
        })
        return () => { socket.off("clue") }
        }, [socket, clues])

    useEffect(() => {
        socket.on("right clicked", (index) => {
            const updated = [...cards];
            updated[index].clicked = !updated[index].clicked;
            setCards(updated);  
        })
        return () => { socket.off("right clicked") }
        }, [socket, cards])

    useEffect(() => {
        socket.on("change turn", (team) => {
            console.log("Received change turn, setting redTurn to:", team);
            setRedTurn(team === 'red');
            setActiveClueIndex(null);
        })
        return () => { socket.off("change turn") }
    }, [socket])

    useEffect(() => {
        socket.on("update game", (gameState) => {
            const revealedIndex = gameState.justRevealedIndex;
            if (revealedIndex !== null && revealedIndex !== undefined) {
                const card = gameState.cards[revealedIndex];
                if (card.team === 'grey') {
                    Swal.fire({
                        text: "A neutral card has been converted into a card of your color!",
                        icon: 'info',
                        confirmButtonText: "That's a shame."
                    });
                } else if (card.team === 'black') {
                    Swal.fire({
                        text: "Game over, you've lost!",
                        icon: 'error',
                        confirmButtonText: "Oh, no."
                    });
                }
            }
            setCards(gameState.cards);
            setRedTurn(gameState.redTurn);
            setRedLeft(gameState.redLeft);
            setBlueLeft(gameState.blueLeft);
            setClues(gameState.clues);
            setActiveClueIndex(gameState.activeClueIndex);
        })
        return () => { socket.off("update game") }
    }, [socket])

    useEffect(() => {
        socket.on("card clicked", (index) => {
            // No local logic, server will send update
        })
        return () => { socket.off("card clicked") }
    }, [socket])

    function handleCardClick(index) {
        socket.emit("card clicked", index)
    }    

    function handleCardRightClick(e, index) {
        e.preventDefault();    
        socket.emit("right clicked", index)
    }  
    
    // Redirect to home if no room data
    if (!room || !name) {
        return <Navigate to="/" replace />;
    }
    
    return (
        <div className={`game-container ${theme}`}>
            <ThemeToggle />
            {/* <div className= 'team'>
                <TeamPanel
                    redLeft={redLeft} 
                    blueLeft={blueLeft}    
                    // onEndTurn={() => {}}
                    // onReset={() => {}}
                />
            </div>/ */}
            <div className='vertical-container'>
                <div className= 'title' style={{ color: '#009900' }}>
                    CODEN
                    <span style={{ color: redTurn ? 'red' : 'blue' }}>AI</span>
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
                    <Clue clues={clues} activeClueIndex={activeClueIndex} />
                </div>
            </div>
            {/* <div className= 'team'>
                <TeamPanel
                    redLeft={redLeft} 
                    blueLeft={blueLeft}    
                    // onEndTurn={() => {}}
                    // onReset={() => {}}
                />
            </div> */}
        </div>
    );
}

export default Game;