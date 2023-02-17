// styles
import { useLocation } from 'react-router-dom';
import './Search.css';
import React from 'react';
import { useFetch } from '../../hooks/useFetch';
import RecipeList from '../../components/RecipeList/RecipeList';
import { Recipe } from '../../types/Recipe.model';

function Search() {
    // BELOW GETS THE QUERY PARAMETERS OF THE SEARCH QUERY
    const locationObject = useLocation();
    const queryParams = new URLSearchParams(locationObject.search);
    const query = queryParams.get('q');
    const url = 'http://localhost:3000/recipes?q=' + query;

    const { data, isPending, error } = useFetch(url);
    
    return (
        <div>
            <h2 className="page-title">Recipes including "{ query }"</h2>
            { error && <p className="error">{ error }</p> }
            { isPending && <p className="loading">Loading...</p> }
            { data !== undefined && data !== null && <RecipeList recipes={ data as Recipe[] } /> }
        </div>
    );
}

export default Search;