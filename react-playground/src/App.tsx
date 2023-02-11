import React from 'react';
import './App.css';
import { useState } from 'react';

function App() {
  const [showEvents, setShowEvents] = useState(true);

  // use this syntax to declare a variable and allow for state to be changed
  // instead of linking with (click)/@click or ngModel/v-model, use this destructured syntax
  const [events, setEvents] = useState([
    { title: 'Mario\'s Bar Mitzvah', id: 1 },
    { title: 'Peach\'s Quinceanera', id: 2 },
    { title: 'Bowser\'s Ball', id: 3 },
  ]);
  
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

  return (
    <div className="App">
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
      { showEvents && // this bit here is basically *ngIf="showEvents", as 'showEvents && ...' is PURE TS TO DISPLAY/HIDE THE EVENTS
        events.map((event, index) => (
          <div key={ event.id }>
            {/* below is like outputting EVENT AND INDEX with v-for or ngFor*/}
            <h2>{ index }: {event.title}</h2>
            <button onClick={ () => handleClick(event.id) }>Delete Event</button>
            {/* parentheses in function like handleClick() is automatically executed on browser load */}
            {/* USE ANNOYMOUS FUNCTION INSTEAD TO PASS ARGUMENT INTO A FUNCTION LIKE ABOVE */}
          </div>
        ))
       }
    </div>
  );
}

export default App;
