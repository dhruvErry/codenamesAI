import { useState, useEffect } from 'react';
import Board from './Board';
import TeamPanel from './TeamPanel';
import Clue from './Clue';
import './Game.css'
import Swal from 'sweetalert2'
import { useAtom, useAtomValue } from "jotai";
import { socketAtom, cluesAtom, activeClueIndexAtom } from "../Atoms";

function Game() {
    const socket = useAtomValue(socketAtom)
    const [clues, setClues] = useAtom(cluesAtom);
    const [activeClueIndex, setActiveClueIndex] = useAtom(activeClueIndexAtom);
    const [cards, setCards] = useState([]);
    const [spy, setSpy] = useState(false);
    const [redLeft, setRedLeft] = useState(9)
    const [blueLeft, setBlueLeft] = useState(8)
    const [redTurn, setRedTurn] = useState(true)

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
        })
        return () => { socket.off("create game") }
        }, [socket, cards])

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
        socket.on("card clicked", (index) => {
            const updated = [...cards];
            updated[index].revealed = true;
            updated[index].clicked = false;
            setCards(updated);
            if (cards[index].team === 'red'){
                setRedLeft(prev => prev - 1)
                if (!redTurn){
                    setRedTurn(true)
                }
            }
            else if (cards[index].team === 'blue'){
                setBlueLeft(prev => prev - 1)
                if (redTurn){
                    setRedTurn(false)
                }
            }
            else if (cards[index].team === 'grey'){
                Swal.fire({
                text: "A neutral card has been converted into a card of your color!",
                type: 'success',
                confirmButtonText: "That's a shame."
                })
                setRedTurn(prev => !prev)
            }
            else if (cards[index].team === 'black'){
                Swal.fire({
                text: "Game over, you've lost!",
                type: 'success',
                confirmButtonText: "Oh, no."
                })
            }
            else {
                setRedTurn(prev => !prev)
            } 
        })
        return () => { socket.off("card clicked") }
        }, [socket, cards])

    function handleCardClick(index) {
        socket.emit("card clicked", index)
    }    

    function handleCardRightClick(e, index) {
        e.preventDefault();    
        socket.emit("right clicked", index)
    }  
    
    return (
        <div className="game-container">
            {/* <div className= 'team'>
                <TeamPanel
                    redLeft={redLeft} 
                    blueLeft={blueLeft}    
                    // onEndTurn={() => {}}
                    // onReset={() => {}}
                />
            </div>/ */}
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