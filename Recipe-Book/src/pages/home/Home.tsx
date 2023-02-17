// styles
import './Home.css';
import React from 'react';
import { useFetch } from '../../hooks/useFetch';
import RecipeList from '../../components/RecipeList/RecipeList';
import { Recipe } from '../../types/Recipe.model';

function Home() {
    const { data, isPending, error } = useFetch('http://localhost:3000/recipes');

    return (
        <div className='home'>
            { error && <p className='error'>{ error }</p> }
            { isPending && <p className='loading'>Loading...</p> }
            { data !== undefined && data !== null && <RecipeList recipes={ data as Recipe[] }/> }
        </div>
    );
}

export default Home;