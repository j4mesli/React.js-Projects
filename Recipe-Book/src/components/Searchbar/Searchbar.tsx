// styles
import './Searchbar.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Searchbar() {
    const navigate = useNavigate();
    const [term, setTerm] = useState('');
    
    const handleSubmit = (e: any) => {
        e.preventDefault();
        navigate(`/search?q=${ term }`);
    }

    return (
        <div className='searchbar'>
            <form onSubmit={ e => handleSubmit(e) }>
                <label htmlFor="search">Search:</label>
                <input type="text" id='search' onChange={ (e) => setTerm(e.target.value) } value={ term } />
            </form>
        </div>
    )
}

export default Searchbar