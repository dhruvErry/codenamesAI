import { socketAtom, themeAtom, connectionAtom } from '../Atoms';
import { useAtomValue, useSetAtom } from 'jotai';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import ThemeToggle from './ThemeToggle';
import './JoinForm.css';

function JoinForm () {
    // const [name, setName] = useState("");
    // const [room, setRoom] = useState("");
    const navigate = useNavigate();
    const socket = useAtomValue(socketAtom)
    const theme = useAtomValue(themeAtom)
    const connection = useAtomValue(connectionAtom)
    const setConnection = useSetAtom(connectionAtom)
    const [showLoading, setShowLoading] = useState(true)

    useEffect(() => {
        // Show loading for minimum 2 seconds
        const timer = setTimeout(() => {
            setShowLoading(false);
        }, 1500);
        
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        // Continue checking connection in JoinForm
        const interval = setInterval(() => {
            const isConnected = socket.connected;
            console.log('JoinForm - socket.connected:', isConnected);
            setConnection(isConnected);
        }, 2000);
        
        return () => clearInterval(interval);
    }, [socket, setConnection]);

    // Debug logging
    console.log('JoinForm - connection:', connection, 'showLoading:', showLoading);

    function handleSubmit (e) {
        e.preventDefault()
        const room = e.target[0].value
        const name = "Player" + Math.floor(Math.random() * 1000) // Generate random player name
        navigate(`/${room}`, {
            state: {name}
        });
        // Do NOT emit here
    }    

    // Show loading if: not connected OR still in minimum loading time
    if (!connection || showLoading) {
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

    // Show form if connected AND minimum loading time has passed
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
                    <input className="form-input" placeholder = "Enter Room" id = "room" required autoFocus/>
                    {/* <input className="form-input" placeholder = "Enter Your Name" id = "name" required/> */}
                    <button className="form-button" type="submit">Create or Join Game</button>
                </form>
            </div>
        </div>
    )
}

export default JoinForm;