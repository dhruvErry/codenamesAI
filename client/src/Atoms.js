import { atom } from 'jotai';
import { io } from 'socket.io-client';

const serverURL = process.env.REACT_APP_SERVER_URL;
const socketAtom = atom(() => io(serverURL, { }));
const themeAtom = atom('light'); // 'light' or 'dark'

const playerAtom = atom(null);

// const playersAtom = atom([]);
const cluesAtom = atom([]);
const activeClueIndexAtom = atom(null);
const redTurnAtom = atom(true);
const redLeftAtom = atom(0);
const blueLeftAtom = atom(0);   

// const scoresAtom = atom({red: -1, blue: -1});

export { socketAtom, themeAtom, playerAtom, cluesAtom, activeClueIndexAtom, redTurnAtom, redLeftAtom, blueLeftAtom };