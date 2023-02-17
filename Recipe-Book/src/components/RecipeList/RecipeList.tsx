// styles
import { useTheme } from '../../hooks/useTheme';
import { Recipe } from '../../types/Recipe.model';
import './RecipeList.css';
import React from 'react';
import { Link } from 'react-router-dom';

function RecipeList(props: { recipes: Recipe[] }) {

    const { mode } = useTheme();

    // RETURN THIS TEMPLATE INSTEAD OF THE BOTTOM JSX, IT RETURNS EARLY HERE
    if (props.recipes.length === 0) return <div className="error">No recipes to load...</div>

    return (
        <div className='recipe-list'>
            { props.recipes.map(recipe => (
                <div key={ recipe.id } className={ `card ${ mode }` }>
                    <h3>{ recipe.title }</h3>
                    <p><strong>Cooking Time: </strong>{ recipe.cookingTime }</p>
                    <div>{ recipe.method.substring(0,100) + (recipe.method.length > 100 ? '...' : '')  }</div>
                    <Link to={ `/recipes/${ recipe.id }` }>Cook This</Link>
                </div>
            )) }
        </div>
    );
}

export default RecipeList;