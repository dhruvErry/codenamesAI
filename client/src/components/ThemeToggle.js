import { useAtom } from 'jotai';
import { themeAtom } from '../Atoms';
import './ThemeToggle.css';

function ThemeToggle() {
    const [theme, setTheme] = useAtom(themeAtom);

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    return (
        <button 
            className={`theme-toggle ${theme}`} 
            onClick={toggleTheme}
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
        </button>
    );
}

export default ThemeToggle; 