import React from "react";
import { FormEvent } from "../types/FormEvent.model";
// this CSS module here allows for component specific styles, like <style scoped> in Vue, or Angular's default behavior. Very Helpful
import styles from './EventList.module.css';

function EventList(props: { events: Array<FormEvent>, handleClick: (id: number) => void }) {
    return (
        <div>
            { props.events.map((event, index) => (
                <div className={ styles.card } key={ event.id }>
                    {/* below is like outputting EVENT AND INDEX with v-for or ngFor*/}
                    <h2>{ index }: {event.title}</h2>
                    <p>{ event.location } - { event.date }</p>
                    <button onClick={ () => props.handleClick(event.id) }>Delete Event</button>
                    {/* parentheses in function like handleClick() is automatically executed on browser load */}
                    {/* USE ANNOYMOUS FUNCTION INSTEAD TO PASS ARGUMENT INTO A FUNCTION LIKE ABOVE */}
                </div>
            )) }
        </div>
    );
}

export default EventList;