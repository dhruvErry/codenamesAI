import './TeamPanel.css';
import { socketAtom } from '../Atoms';
import { useAtomValue } from 'jotai';
import { useState, useEffect } from 'react';

function TeamPanel({redLeft, blueLeft}) {
    const socket = useAtomValue(socketAtom)
    const [players, setPlayers] = useState([])
    
    useEffect(() => {
        socket.on("update players", (newPlayers) => {
            setPlayers(newPlayers)
        })
    })

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