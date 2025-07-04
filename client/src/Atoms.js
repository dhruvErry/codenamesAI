import { atom } from 'jotai'
import { io } from 'socket.io-client';

const socketAtom = atom(() => io("http://localhost:8080"))

const playersAtom = atom([]);

// const scoresAtom = atom({red: -1, blue: -1});

export { socketAtom, playersAtom };