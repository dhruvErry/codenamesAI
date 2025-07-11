import { socketAtom } from '../Atoms';
import { useAtomValue } from 'jotai';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import './JoinForm.css';

function JoinForm () {
    // const [name, setName] = useState("");
    // const [room, setRoom] = useState("");
    const [connection, setConnection] = useState(false)
    const navigate = useNavigate();
    const socket = useAtomValue(socketAtom)

    useEffect(() => {
        const interval = setInterval(() => {
            setConnection(socket.connected)
        }, 2000);
        return () => clearInterval(interval); 
    }, [socket])

    function handleSubmit (e) {
        e.preventDefault()
        // setRoom(e.target[0].value)
        // setName(e.target[1].value)
        const room = e.target[0].value
        const name = e.target[1].value
        navigate('/game', {
            state: {room, name}
        });

        // socket.emit("join room", room, name)
    }    

    if (!connection) {
        return (
            <div className="container-form">
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
            <div className = "container-form">
                <div className = 'entry-form'>
                    <form className="join-form" onSubmit = {handleSubmit}>
                        <label htmlFor="room">Room</label>
                        <input className="form-input" placeholder = "Enter Room" id = "room" required/>
                        <label htmlFor="name">Name</label>
                        <input className="form-input" placeholder = "Enter Your Name" id = "name" required/>
                        <button className="form-button" type="submit">Create or Join Game</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default JoinForm;