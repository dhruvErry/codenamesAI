// import socket from '../socket';
import {useState} from 'react';
import { useNavigate } from "react-router-dom";
import './JoinForm.css';

function JoinForm () {
    const [name, setName] = useState("");
    const [room, setRoom] = useState("");
    const navigate = useNavigate();

    function handleSubmit (e) {
        e.preventDefault()
        setRoom(e.target[0].value)
        setName(e.target[1].value)
        // socket.emit("join room", (room, name))
        navigate('/game')
    }

    return (
        <div className = "containerForm">
            <div className = 'entryForm'>
                <form onSubmit = {handleSubmit}>
                    <label htmlFor="room">Room</label>
                    <input placeholder = "Enter Room" id = "room" required/>
                    <label htmlFor="name">Name</label>
                    <input placeholder = "Enter Your Name" id = "name" required/>
                    <button type="submit">Create or Join Game</button>
                </form>
            </div>
        </div>
    )
}

export default JoinForm;