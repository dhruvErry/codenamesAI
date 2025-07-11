import { io } from 'socket.io-client';

const serverURL = process.env.REACT_APP_SERVER_URL;
const socket = io(serverURL);    

// const socket = io('http://localhost:8080');

export default socket;