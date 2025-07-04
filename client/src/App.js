import './App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import JoinForm  from './components/JoinForm';
import Game from './components/Game';

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Navigate to="/join" />} />
        <Route path="/join" element={<JoinForm/>} />
        <Route path="/game" element={<Game/>} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;