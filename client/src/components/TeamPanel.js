import './TeamPanel.css';
import { socketAtom } from '../Atoms';
import { useAtomValue } from 'jotai';
import { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";

function TeamPanel({redLeft, blueLeft}) {
    const { state } = useLocation();
    const { room, name } = state;
    const socket = useAtomValue(socketAtom)
    const [players, setPlayers] = useState([])
    
    useEffect(() => {
        socket.emit("join room", room, name)
    }, [])

    useEffect(() => {

    socket.on("update players", (newPlayers) => {
        console.log(JSON.parse(newPlayers))
        setPlayers(JSON.parse(newPlayers))
    })
    }, [socket])

    return (
        <div className="container-team">
            <div className="score redTeam">
                <div className="number">{redLeft}</div>
                <div className="team-members">
                    {players.map((player, i) => (
                        player.team === 'red' ? <div key={i}> {player.name} </div> : null
                    ))}
                </div>
            </div>
            <div className="score blueTeam">
                <div className="number">{blueLeft}</div>
                <div className="team-members">
                    {players.map((player, i) => (
                        player.team === 'blue' ? <div key={i}> {player.name} </div> : null
                    ))}
                </div>
            </div>
        </div>

    )
}

export default TeamPanel;