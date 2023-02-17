// styles
import { useFetch } from '../../hooks/useFetch';
import './Create.css';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Create() {
    // THIS IS THE METHOD THAT ALLOWS FOR PROGRAMATIC REDIRECTS
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [method, setMethod] = useState('');
    const [cookingTime, setCookingTime] = useState('');
    const [newIngredient, setNewIngredient] = useState('');
    const [ingredients, setIngredients] = useState<string[]>([]);
    // BELOW IS THE DIRECT REFERENCE OF THE DOM ELEMENT, LIKE QUERYSELECTOR
    const ingredientInput = useRef<any>();

    const { postData, data, error } = useFetch('http://localhost:3000/recipes', "POST");

    const handleAdd = (e: React.ChangeEvent<any>) => {
        e.preventDefault();
        // below removes whitespace from the ingredient
        const ing = newIngredient.trim();
        if (ing && !ingredients.includes(ing)) {
            setIngredients(prevIngredients => [...prevIngredients, ing])
        }
        setNewIngredient('');
        // below is the exact typing for the useRef class
        ingredientInput.current.focus();
    }
    const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        postData({ title, ingredients, method, cookingTime: cookingTime + ' minutes' });
    }

    // REDIRECT THE USER AFTER THE USER POSTS A NEW RECIPE TO THE DATABASE WITH USEEFFECT
    useEffect(() => {
        if (data) {
            navigate('/');
        }
    }, [data]);

    return (
        <div className='create'>
            <h2 className="page-title">Add a New Recipe</h2>
            {/* BELOW IS SYNTAX FOR TSX FORM, WITH "VALUE", "ONCHANGE", "ONSUBMIT", AND <LABEL> JSX UNIQUE */}
            <form onSubmit={ handleSubmit }>
                <label>
                    <span>Recipe Title</span>
                    <input 
                        type="text"
                        onChange={ (e) => setTitle(e.target.value) }
                        value={ title }
                        required
                    />
                </label>

                <label>
                    <span>Recipe Ingredients:</span>
                    <div className="ingredients">
                        <input 
                            type="text" 
                            onChange={ (e) => setNewIngredient(e.target.value) }
                            value={ newIngredient }
                            ref={ ingredientInput }
                        />
                        <button onClick={ handleAdd } type='button' className='btn'>Add</button>
                    </div>
                </label>
                <p>Current ingredients: { ingredients.map(ingredient => <em key={ ingredient }>{ ingredient }, </em>) }</p>

                <label>
                    <span>Recipe Method:</span>
                    <textarea
                        onChange={ (e) => setMethod(e.target.value) }
                        value={ method }
                        required
                    ></textarea>
                </label>
                <label>
                    <span>Cooking Time (Minutes):</span>
                    <input 
                        type="number" 
                        onChange={ (e) => setCookingTime(e.target.value) }
                        value={ cookingTime }
                        required
                    />
                </label>

                <button className='btn'>Submit</button>
            </form>
        </div>
    );
}

export default Create;