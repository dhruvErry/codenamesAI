import { atom } from 'jotai';
import { io } from 'socket.io-client';

const serverURL = process.env.REACT_APP_SERVER_URL;
const socketAtom = atom(() => io(serverURL, { }));
const themeAtom = atom('light'); // 'light' or 'dark'

const playersAtom = atom([]);
const cluesAtom = atom([]);
const activeClueIndexAtom = atom(null);
const redTurnAtom = atom(true);
const redLeftAtom = atom(9);
const blueLeftAtom = atom(8);   

// const scoresAtom = atom({red: -1, blue: -1});

export { socketAtom, themeAtom, playersAtom, cluesAtom, activeClueIndexAtom, redTurnAtom, redLeftAtom, blueLeftAtom };