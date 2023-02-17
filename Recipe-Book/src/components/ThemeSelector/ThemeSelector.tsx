// styles
import './ThemeSelector.css';
import React from 'react';
import { useTheme } from '../../hooks/useTheme';
import modeIcon from '../../assets/mode_icon.svg';

const themeColors = ['#58249c','#249c6b','#b70233'];

function ThemeSelector() {
    const { changeColor, changeMode, mode } = useTheme();

    const toggleMode = () => {
        // TAKES CURRENT MODE AND CHANGES IT BASED OFF OF WHAT IT IS
        changeMode(mode === 'dark' ? 'light' : 'dark');
        console.log(mode)
    }

    return (
        <div className='theme-selector'>
            <div className='mode-toggle'>
                <img 
                    alt="dark/light mode toggle icon"
                    src={ modeIcon }
                    onClick={ () => toggleMode() }
                    // below is IF MODE IS DARK THEN INVERT ELSE DONT
                    style={{ filter: mode === 'dark' ? 'invert(100%)' : 'invert(20%)' }}
                />
            </div>
            <div className="theme-buttons">
                { themeColors.map(color => (
                    <div key={ color } onClick={ () => changeColor(color) } style={{ backgroundColor: color }} />
                )) }
            </div>
        </div>
    );
}

export default ThemeSelector