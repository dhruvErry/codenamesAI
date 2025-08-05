import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import JoinForm  from './components/JoinForm';
import Game from './components/Game';
import GitHubButton from './components/GitHubButton';

function App() {
  return (
    <>
      <GitHubButton />
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