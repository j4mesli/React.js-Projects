// styles
import './Navbar.css';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Searchbar from '../Searchbar/Searchbar';
import { useTheme } from '../../hooks/useTheme';

function Navbar() {
    // use the Service here in this component
    const { color, changeColor } = useTheme();

    return (
        // BELOW USES THE CONTEXT VALUE TO SET BACKGROUND COLOR
        <div className='navbar' style={{ backgroundColor: color }}>
            <nav onClick={ () => changeColor('pink') }>
                <Link to="/">Home</Link>
                <Searchbar />
                <Link to="/create">Create Recipe</Link>
            </nav>
        </div>
    );
}

export default Navbar;