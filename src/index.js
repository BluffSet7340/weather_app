import React from 'react';
import ReactDOM from 'react-dom/client';
import WeatherForecast from './weather_forecast';

function App(){
  return (
    <>
      <h1>My React Application</h1>
    </>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <WeatherForecast/>
  </React.StrictMode>
);


