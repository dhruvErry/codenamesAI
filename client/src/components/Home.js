import { Link } from "react-router-dom";
import { useAtomValue } from 'jotai';
import { themeAtom } from '../Atoms';
import ThemeToggle from './ThemeToggle';
import './Home.css';

function Home() {
    const theme = useAtomValue(themeAtom);
    
    return (
        <div className={`join-prompt-container ${theme}`}>
            <ThemeToggle />
            <div className="join-prompt">
                <div className="title" style={{ color: '#009900', marginBottom: '2rem' }}>
                    CODEN
                    <span style={{ color: '#666666' }}>AI</span>
                    MS
                </div>
                <h2 style={{ color: '#4A4A4A', marginBottom: '1rem' }}>Ready to play Codenames?</h2>
                <p style={{ color: '#4A4A4A', marginBottom: '2rem' }}>Join a room to start the game</p>
                <Link to="/join" className="join-link-button">
                    Join a Room
                </Link>
            </div>
        </div>
    );
}

export default Home; 