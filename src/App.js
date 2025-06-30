import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import JoinForm  from './components/JoinForm';
import Game from './components/Game';
import Board from './components/Board';
import Card from './components/Card';

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/join" element={<JoinForm/>} />
        <Route path="/game" element={<Game/>} />
        <Route path="/board" element={<Board/>} />
        <Route path="/card" element={<Card/>} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
