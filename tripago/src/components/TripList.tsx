import { useState } from 'react';
import styles from '../styles/TripList.module.css'; // styles
import useFetch from '../hooks/useFetch';

function TripList() {
    const [url, setUrl] = useState('http://localhost:3000/trips');
    // custom hook to fetch the trips from our backend, basically an abstraction of below logic with useCallback and useEffect
    const { data: trips, isPending, error } = useFetch(url, { type: 'GET' });

    // use useCallback to prevent infinite loop, like const in useState. React just wants this to work, not nearly as bad as this.http.get({...})
    // also to prevent overhead/memory leaks with library, Angular manages this with the OnDestroy subscription functionality but React wants to do it for you
    // const fetchTrips = useCallback(
    //     async () => {
    //         const tripsJSON = await (await fetch(url)).json();
    //         setTrips(tripsJSON);
    //     },
    //     [url]
    // );

    // use useEffect to only run code once ON MOUNT TO DOM, AS DEPENDENCY ARRAY MAKES THE CODE RUN EVERY TIME ANY ELEM IN THERE CHANGES
    // useEffect(() => {
    //     fetchTrips();
    // }, [url, fetchTrips]);
  
    console.log(trips);

    return (
        <div className={ styles['trip-list'] }>
            <h2>Trip List</h2>
            { error.length > 0 && <div>
                <h2 color='red'>{ error }</h2>
            </div> }
            { isPending && <div>
                <h3>Loading Trips...</h3>
            </div> }
            <ul>
                {/* .map() for ngFor="let trip of trips;" requires PARENTHESIS BECAUSE JSX NOT FUNCTION */}
                { trips && trips.map((trip, index) => (
                    <li key={ index }>
                        <h3>{ trip.title }</h3>
                        <p>{ trip.price }</p>
                    </li>
                )) }
            </ul>
            <div className={ styles.filters }>
                <button onClick={ () => setUrl('http://localhost:3000/trips' + '?loc=europe') }>European Trips</button>
                <button onClick={ () => setUrl('http://localhost:3000/trips' + '?loc=america') }>American Trips</button>
                <button onClick={ () => setUrl('http://localhost:3000/trips') }>All Trips</button>
            </div>
        </div>
    )
}

export default TripList;