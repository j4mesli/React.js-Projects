import { useState } from 'react';
import './App.css';
import TripList from './components/TripList';

function App() {
  const [showTrips, setShowTrips] = useState(true);

  return (
    <div className="App">
      { showTrips && <TripList /> }
      <button onClick={ () => setShowTrips(false) }>Hide Trips</button>
    </div>
  )
}

export default App;
