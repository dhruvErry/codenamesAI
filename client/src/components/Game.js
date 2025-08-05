import { useState, useEffect } from 'react';
import Board from './Board';
import TeamPanel from './TeamPanel';
import Clue from './Clue';
import './Game.css'
import Swal from 'sweetalert2'
import { useAtom, useAtomValue } from "jotai";
import { socketAtom, cluesAtom, playerAtom, activeClueIndexAtom, redTurnAtom, redLeftAtom, blueLeftAtom, themeAtom, gameOverAtom } from "../Atoms";
import { useLocation, Navigate, useParams } from "react-router-dom";
import SettingsPopup from './SettingsPopup';

function Game() {
    const socket = useAtomValue(socketAtom)
    const [clues, setClues] = useAtom(cluesAtom);
    const [activeClueIndex, setActiveClueIndex] = useAtom(activeClueIndexAtom);
    const [cards, setCards] = useState([]);
    const [spy, setSpy] = useState(false);
    const [redLeft, setRedLeft] = useAtom(redLeftAtom);
    const [blueLeft, setBlueLeft] = useAtom(blueLeftAtom);
    const [gameOver, setGameOver] = useAtom(gameOverAtom);
    const location = useLocation();
    const { roomName } = useParams(); // Get room name from URL
    const room = roomName || location.state?.room; // Use URL param or fallback to state
    const name = location.state?.name;
    const [redTurn, setRedTurn] = useAtom(redTurnAtom);
    const theme = useAtomValue(themeAtom);
    const [player, setPlayer] = useAtom(playerAtom);

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
        socket.on("create game", (room, player) => {
            setCards(room.cards);
            setClues(room.clues);
            setActiveClueIndex(room.activeClueIndex);
            setRedTurn(room.redTurn);
            setRedLeft(room.redLeft);
            setBlueLeft(room.blueLeft);
            if (player) {
                setPlayer(player);
            }
            setGameOver(false); // Reset game over state when new game is created
        })
        return () => { socket.off("create game") }
    }, [socket])

    useEffect(() => {
        socket.on("update player", (player) => {
            setPlayer(player);
        })
        return () => { socket.off("update player") }
    }, [socket])

    useEffect(() => {
        if (room) {
            console.log("Emitting join room", room, name || "Anonymous");
            socket.emit("join room", room, name || "Anonymous");
        }
    }, [room, name, socket])

    useEffect(() => {
        socket.on("room not found", (roomName) => {
            console.log("Room not found:", roomName);
            // Redirect to home page
            window.location.href = "/";
        });
        return () => { socket.off("room not found") }
    }, [socket])

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
            updated[index].rightClicked = !updated[index].rightClicked;
            setCards(updated);  
        })
        return () => { socket.off("right clicked") }
        }, [socket, cards])

    useEffect(() => {
        socket.on("change turn", (team) => {
            console.log("Received change turn, setting redTurn to:", team);
            setRedTurn(team === 'red');
            setActiveClueIndex(null);
            
            // Clear all right clicks when turn changes
            setCards(prevCards => prevCards.map(card => ({
                ...card,
                rightClicked: false
            })));
        })
        return () => { socket.off("change turn") }
    }, [socket])

    useEffect(() => {
        socket.on("update game", (gameState) => {
            const clickedTeam = gameState.clickedTeam;
            if (clickedTeam === 'grey' && gameState.swapped) {
                console.log("Player team:", player.team);
                // Use the previous turn state to determine which team benefits
                const impededTeam = gameState.redTurn ? 'blue' : 'red'; // Opposite of current turn since turn was switched
                Swal.fire({
                    text: `A neutral card has been converted into a card of the ${impededTeam} team's color!`,
                    icon: 'warning',
                    confirmButtonText: player?.team != impededTeam ? "Alright!" : "That's a shame."
                });
            } else if (clickedTeam === 'black') {
                setGameOver(true);
                Swal.fire({
                    text: `Game over! ${gameState.redTurn ? 'Red' : 'Blue'} team has lost!`,
                    icon: player?.team === (gameState.redTurn ? 'red' : 'blue') ? 'error' : 'success',
                    confirmButtonText: "Oh!"
                });
            }
            if (gameState.redLeft === 0) {
                setGameOver(true);
                Swal.fire({
                    text: "Game over, the Red team has won!",
                    icon: player?.team === 'red' ? 'success' : 'error',
                    confirmButtonText: "Oh!"
                });
            } else if (gameState.blueLeft === 0) {
                setGameOver(true);
                Swal.fire({
                    text: "Game over, the Blue team has won!",
                    icon: player?.team === 'blue' ? 'success' : 'error',
                    confirmButtonText: "Oh!"
                });
            }
            else {
                // Check if turn changed and clear right clicks if it did
                const turnChanged = redTurn !== gameState.redTurn;
                
                setCards(gameState.cards);
                setRedTurn(gameState.redTurn);
                setRedLeft(gameState.redLeft);
                setBlueLeft(gameState.blueLeft);
                setClues(gameState.clues);
                setActiveClueIndex(gameState.activeClueIndex);
                
                // If turn changed, clear all right clicks
                if (turnChanged) {
                    setCards(prevCards => prevCards.map(card => ({
                        ...card,
                        rightClicked: false
                    })));
                }
            }
        })
        return () => { socket.off("update game") }
    }, [socket, player])

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

    function handleNewGame() {
        socket.emit("new game", room);
        setGameOver(false);
    }
    
    // Redirect to home if no room data
    if (!room) {
        return <Navigate to="/" replace />;
    }
    
    return (
        <div className={`game-container ${theme}`}>
            <SettingsPopup onNewGame={handleNewGame} />
            <div className= 'team red'>
                <TeamPanel
                    color = "red"
                />
            </div>
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
                {gameOver ? (
                    <div className="game-over-message">
                        <button onClick={handleNewGame}>NEW GAME</button>
                    </div>
                ) : (
                    <div className= 'clue'>
                        <Clue clues={clues} activeClueIndex={activeClueIndex} />
                    </div>
                )}
            </div>
            <div className= 'team blue'>
                <TeamPanel
                    color = "blue"
                />
            </div>
        </div>
    );
}

export default Game;