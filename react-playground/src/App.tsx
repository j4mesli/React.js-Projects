import React from 'react';
import Title from './components/Title';
import './App.css';
import { useState } from 'react';
import { FormEvent } from './types/FormEvent.model';
import Modal from './components/Modal';
import EventList from './components/EventList';
import NewEventForm from './components/NewEventForm';

function App() {
  const [showModal, setShowModal] = useState(false);
  const [showEvents, setShowEvents] = useState(true);

  // use this syntax to declare a variable and allow for state to be changed
  // instead of linking with (click)/@click or ngModel/v-model, use this destructured syntax
  const [events, setEvents] = useState([] as Array<FormEvent> );

  const addEvent = (event: typeof events[0]) => {
    setEvents((prevEvents) => {
      // uses array spread syntax to spread existing events and add a new event 
      return [ ...prevEvents, event ];
    });
    setShowModal(false);
  } 
  
  const handleClick = (id: number) => {
    // this is how you remove it from an array, with the filter method onto set events
    // LITERALLY OVERRIDING THE PREVIOUS ARRAY WITH THE NEW ARRAY FROM FILTER, PURE TS
    setEvents(
      // pass previous state of events (prevEvents) into the function, then return the filter method called on it 
      (prevEvents) => {
        return prevEvents.filter((event) => {
          return event.id !== id;
        });
      }
    );
    console.log(id);
  }

  const handleClose = () => {
    setShowModal(false);
  }

  const subtitle = "All the latest events in MarioLand";

  return (
    <div className="App">
      <Title title="Events in Your Area" subtitle={ subtitle } /> {/* this is component injection */}

      {/* this syntax below is just v-if="showEvents" AS IT IS JUST PURE TS */}
      { showEvents &&
        (<div>
          <button onClick={ () => setShowEvents(false) }>Hide Events</button>
        </div>)
      }
      { !showEvents &&
        (<div>
          <button onClick={ () => setShowEvents(true) }>Show Events</button>
        </div>)
      }
      {/* ngFor="let event of events; let i = index;" and v-for="(i, events) in events" but with pure JS .map(), pretty cool */}
      { // this bit here is basically *ngIf="showEvents", as 'showEvents && ...' is PURE TS TO DISPLAY/HIDE THE EVENTS
        showEvents && <EventList handleClick={ handleClick } events={ events } /> 
      }

      {/* <Modal>
        <h2>10% Off Coupon Code!!</h2>
        <p>Use the code "M4R10" at checkout!</p>
      </Modal> */}
      {showModal && <Modal handleClose={ handleClose } isSalesModal={ false }>
        <NewEventForm addEvent={ addEvent } />
      </Modal> }
      <br />
      <button onClick={ () => setShowModal(true) }>Add New Event</button>
    </div>
  );
}

export default App;
