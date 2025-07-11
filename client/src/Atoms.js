import { atom } from 'jotai'
import { io } from 'socket.io-client';

const serverURL = process.env.REACT_APP_SERVER_URL;
const socketAtom = atom(() => io(serverURL, { }))

const playersAtom = atom([]);

// const scoresAtom = atom({red: -1, blue: -1});

export { socketAtom, playersAtom };