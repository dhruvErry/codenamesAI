import './TeamPanel.css';
import { socketAtom, redLeftAtom, blueLeftAtom, playerAtom } from '../Atoms';
import { useAtomValue } from 'jotai';
import { useLocation, useParams } from "react-router-dom";

function TeamPanel({color}) {
    const { state } = useLocation();
    const { roomName } = useParams();
    const room = roomName || state?.room;
    const name = state?.name;
    const socket = useAtomValue(socketAtom)
    const redLeft = useAtomValue(redLeftAtom)
    const blueLeft = useAtomValue(blueLeftAtom)
    const player = useAtomValue(playerAtom)
    
    // useEffect(() => {
    //     socket.emit("join room", room, name)
    // }, [])

    // useEffect(() => {
    //     socket.on("update players", (newPlayers) => {
    //         console.log(JSON.parse(newPlayers))
    //         setPlayers(JSON.parse(newPlayers))
    //     })
    // }, [socket])

    const renderButtons = () => {
        if (!player) return null;
        
        const { team, spy } = player;
        
        // If team is empty or different than color, show both buttons
        if (!team || team !== color) {
            return (
                <>
                    <button className="join-team-button" onClick={() => socket.emit("join team", color, false)}>
                        Operative
                    </button>
                    <button className="join-team-button" onClick={() => socket.emit("join team", color, true)}>
                        SpyMaster
                    </button>
                </>
            );
        }
        
        // If team is same as color
        if (team === color) {
            if (spy === true) {
                // Currently spymaster, show option to join as operative
                return (
                    <button className="join-team-button" onClick={() => socket.emit("join team", color, false)}>
                        Operative
                    </button>
                );
            } else {
                // Currently operative, show option to join as spymaster
                return (
                    <button className="join-team-button" onClick={() => socket.emit("join team", color, true)}>
                        SpyMaster
                    </button>
                );
            }
        }
        
        return null;
    };

    return (
        // <div className="container-team">
        //     <div className="score redTeam">
        //         <div className="number">{redLeft}</div>
        //         <div className="team-members">
        //             {players.map((player, i) => (
        //                 player.team === 'red' ? <div key={i}> {player.name} </div> : null
        //             ))}
        //         </div>
        //     </div>
        //     <div className="score blueTeam">
        //         <div className="number">{blueLeft}</div>
        //         <div className="team-members">
        //             {players.map((player, i) => (
        //                 player.team === 'blue' ? <div key={i}> {player.name} </div> : null
        //             ))}
        //         </div>
        //     </div>
        // </div>
        <div className={`container-team ${color}`}> 
            <div className={`score-box ${color}Team`}>
                <div className="number">{color === 'red' ? redLeft : blueLeft}</div>
                {renderButtons()}
            </div>
        </div>

    )
}

export default TeamPanel;