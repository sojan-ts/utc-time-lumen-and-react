import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

function App() {
  const [dates, setDates] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/dates')
      .then(response => {
        const timestamps = response.data;
        const localDates = timestamps.map(timestamp => new Date(timestamp * 1000));
        setDates(localDates);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <h2>Dates:</h2>
      <ul>
        {dates.map((date, index) => (
          <li key={index}>
            <div>Date in dd-mm-yyyy format: <b>{date.toLocaleDateString('en-GB')}</b></div>
            <div>Date in yyyy-mm-dd format: <b>{date.toISOString().slice(0,10)} </b></div>
            <div>Time in 12 hour format: <b>{date.toLocaleTimeString('en-US')} </b></div>
            <div>Time in 24 hour format: <b>{date.toLocaleTimeString('en-US', { hour12: false })} </b></div>
            <div>Date and time in 24 hour format: <b>{date.toLocaleString('en-US', { hour12: false })} </b></div>
            <div>Date and time in 12 hour format: <b>{date.toLocaleString('en-US', { hour12: true })} </b></div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
