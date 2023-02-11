import React, { useState, useRef } from 'react';
import { FormEvent } from '../types/FormEvent.model';
import './NewEventForm.css';

const NewEventForm = (props: { addEvent: (event: FormEvent) => void, }) => {

    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [location, setLocation] = useState('Manchester');

    // below is the input type for React's event FROM ONSUBMIT
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, type: 'date' | 'title' | 'location') => {
        if (type === 'date') {
            setDate(e.target.value);
        }
        else if (type === 'title') {
            setTitle(e.target.value);
        }
        else if (type === 'location') {
            setLocation(e.target.value);
        }
    } 

    // need to do this for refs, like Vue's ref() as Ref<string>;
    // const title = useRef() as React.MutableRefObject<HTMLInputElement>;
    // const date = useRef() as React.MutableRefObject<HTMLInputElement>;

    const resetForm = () => {
        // title.current.value = "";
        // date.current.value = "";

        setTitle('');
        setDate('');
    }

    const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
        // need to prevent default form behavior on submit
        e.preventDefault();
        console.log(title, date);

        const event: FormEvent = { 
            // title: title.current.value, 
            // date: date.current.value, 

            title: title,
            date: date,
            location: location,
            id: Math.floor(Math.random()*12345),
        }
        console.log(event)
        props.addEvent(event);
        resetForm();
    }

    return (
        <form className='new-event-form' onSubmit={ handleSubmit }>
            {/* can either do this for <label htmlFor="title"></label> like vanilla HTML */}
            {/* JUST ngModel OR v-model */}
            <label>
                <span>Event Title:</span>
                {/* below uses onChange and value={ title } to create a controlled input, basically ngModel */}
                {/* <input type="text" ref={ title } /> */}
                <input type="text" onChange={ (e) => handleChange(e, 'title') } value={ title } />
            </label>
            <label>
                <span>Event Date:</span>
                {/* <input type="date" ref={ date } /> */}
                <input type="date" onChange={ (e) => handleChange(e, 'date') } value={ date } />
            </label>
            <label>
                <span>Event Location:</span>
                <select onChange={ (e) => handleChange(e, 'location') } value={ location } >
                    <option value="Manchester">Manchester</option>
                    <option value="Manchester">London</option>
                    <option value="Manchester">Worchester</option>
                </select>
            </label>
            <button type='submit'>Submit</button>
            <p onClick={ resetForm }>Reset Form</p>
        </form>
    )
}

export default NewEventForm;