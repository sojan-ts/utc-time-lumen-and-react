import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

function App() {
  const [dates, setDates] = useState([]);

  const [timezone, setTimezone] = useState('');
  const [datetime, setDatetime] = useState('');

  const [dmyformatted, setDmyformatted] = useState('');
  const [Dmyformattedtime, setDmyformattedtime] = useState('');

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

  useEffect(() =>{
    const getTimezoneDateTime = async () => {
      const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      setTimezone(timeZone);

      const response = await fetch(`http://localhost:8000/datesspecifictz?timezone=${timeZone}`);
      const data = await response.json();

      setDatetime(data.datetime);

      const formattedDatetime = new Date(data.datetime).toLocaleDateString('en-GB');
      setDmyformatted(formattedDatetime);

      const formattedtime = new Date(data.datetime).toLocaleTimeString('en-US', { hour12: true });
      setDmyformattedtime(formattedtime);
    
    };

    getTimezoneDateTime();
  })

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

      <div>
      <p>Your time zone is: <b>{timezone}</b></p>
      <p>The current datetime in your time zone is: <b>{datetime}</b></p>
      <p>Formatted date <i>(outside return)</i> : <b>{dmyformatted}</b></p>
      <p>Formatted time <i>(outside return)</i> : <b>{Dmyformattedtime}</b></p>
      <p>Formatted date <i>(inside return)</i> : <b> {new Date(datetime).toLocaleDateString('en-GB')} </b></p>
  <p>Formatted time <i>(inside return)</i> : <b> {new Date(datetime).toLocaleTimeString('en-US', { hour12: true })} </b></p>
  <p>Formatted time 24hr <i>(inside return)</i> : <b> {new Date(datetime).toLocaleTimeString('en-US', { hour12: false })} </b></p>
    </div>
    </div>
  );
}

export default App;
