// styles
import './Recipe.css';
import React from 'react';
import { useParams } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';
import { Recipe as RecipeType } from '../../types/Recipe.model';
import { useTheme } from '../../hooks/useTheme';

function Recipe() {
    // BELOW IS THEMESERVICE FROM ANGULAR, FUNCTIONS JUST LIKE IT WITH SUBJECT()
    const { mode } = useTheme()
    // BELOW IS ACTIVATEDROUTE FROM ANGULAR
    const { id } = useParams();
    const url = 'http://localhost:3000/recipes/' + id;
    const { data: _recipe, isPending, error } = useFetch(url);

    return (
        <div className={ `recipe ${ mode }` }>
            { error && <p className='error'>{ error }</p> }
            { isPending && <p className="loading">Loading...</p> }
            { _recipe !== null && _recipe !== undefined && (
                <>
                    <h2 className="page-title">{ (_recipe as RecipeType).title }</h2>
                    <p><strong>Cooking Time: </strong> { (_recipe as RecipeType).cookingTime }</p>
                    <ul>
                        { (_recipe as RecipeType).ingredients.map(ingredient => <li key={ ingredient }>{ ingredient }</li>) }
                    </ul>
                    <p className="method">{ (_recipe as RecipeType).method }</p>
                </>
            ) }
        </div>
    );
}

export default Recipe;