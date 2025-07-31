import './App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import JoinForm  from './components/JoinForm';
import Game from './components/Game';

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Home/>} />
        <Route path="/join" element={<JoinForm/>} />
        <Route path="/game" element={<Game/>} />
        <Route path="/:roomName" element={<Game/>} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;