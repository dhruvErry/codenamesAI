import { socketAtom, themeAtom } from '../Atoms';
import { useAtomValue } from 'jotai';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import ThemeToggle from './ThemeToggle';
import './JoinForm.css';

function JoinForm () {
    // const [name, setName] = useState("");
    // const [room, setRoom] = useState("");
    const [connection, setConnection] = useState(false)
    const navigate = useNavigate();
    const socket = useAtomValue(socketAtom)
    const theme = useAtomValue(themeAtom)

    useEffect(() => {
        const interval = setInterval(() => {
            setConnection(socket.connected)
        }, 2000);
        return () => clearInterval(interval); 
    }, [socket])

    function handleSubmit (e) {
        e.preventDefault()
        const room = e.target[0].value
        const name = e.target[1].value
        navigate('/game', {
            state: {room, name}
        });
        // Do NOT emit here
    }    

    if (!connection) {
        return (
            <div className={`container-form ${theme}`}>
                <ThemeToggle />
                <div className='container-gif'>
                    <div className='gif'>
                        <img src="loading.gif"/>
                    </div>
                    <div className="loading">
                        Connecting to server...
                    </div>
                </div>
            </div>
        )
    }

    else {
        return (
            <div className = {`container-form ${theme}`}>
                <ThemeToggle />
                <div className = 'entry-form'>
                    <div className="title" style={{ color: '#009900', marginBottom: '2rem' }}>
                        CODEN
                        <span style={{ color: '#D00000' }}>AI</span>
                        MS
                    </div>
                    <form className="join-form" onSubmit = {handleSubmit}>
                        <input className="form-input" placeholder = "Enter Room" id = "room" required/>
                        <input className="form-input" placeholder = "Enter Your Name" id = "name" required/>
                        <button className="form-button" type="submit">Create or Join Game</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default JoinForm;