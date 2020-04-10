import React, {Fragment} from "react";
import { Forecast } from './foreCast';

export const Result = (props) => {
  const {
    city,
    country,
    date,
    description,
    main,
    temp,
    sunset,
    sunrise,
    humidity,
    wind,
    highestTemp,
    lowestTemp,
    forecast
  } = props.results;

  const forecasts = forecast.map(item => (
    <div className="location__forCastItem" >
      <Forecast
        key={item.dt}
        temp={Math.floor(item.main.temp * 1) / 1}
        icon={item.weather[0].icon}
        month={item.dt_txt.slice(5, 7)}
        day={item.dt_txt.slice(8, 10)}
        hour={item.dt_txt.slice(11, 13) * 1}
      />
    </div>
  ));

  const weatherIcon = {
    'Thunderstorm':  (() => <span><i className="fa fa-bolt"></i></span>),
    'Drizzle':  (() => <span><i className="fas fa-cloud-rain"></i></span>),
    'Rain':  (() => <span><i className="fas fa-cloud-showers-heavy"></i></span>),
    'Snow':  (() => <span><i className="fa fa-snowflake-o"></i></span>),
    'Clear':  (() => <span><i className="fa fa-sun"></i></span>),
    'Clouds':  (() => <span><i className="fa fa-cloud"></i></span>),
    'Haze':  (() => <span><i className="fas fa-smog"></i></span>),
  }

  return (
    <div className="location">
      <div className="location__info">
        <h3>{city}, {country}</h3>
        <p>{date}</p>
      </div>
      <div className="location__details">
        <div className="left">
          {weatherIcon[main] ? weatherIcon[main]() : <span><i className="fas fa-smog"></i></span>}
          <div className="temprature">
            <p className="title"> {Math.floor(temp)}&#176;</p>
            <p className="name"> {description}</p>
          </div>
        </div>
        <div className="right">
         <div className="item">
           <p title="Lowest temprature"><i className="fas fa-temperature-low"></i><span>{lowestTemp}&#176;</span></p> 
         </div>
         <div className="item">
           <p  title="Sunrise"><i className="fas fa-sun"></i><span>{sunrise.toString().slice(0,4)}</span></p> 
         </div>
         <div className="item">
           <p  title="Chances of rain"><i className="fas fa-cloud-rain"></i><span>{humidity}%</span></p> 
         </div>
         <div className="item">
           <p  title="Highest temprature"><i className="fas fa-temperature-high"></i><span>{highestTemp}&#176;</span></p> 
         </div>
         <div className="item">
           <p  title="Sunset"><i className="far fa-sun"></i><span>{sunset.toString().slice(0,4)}</span></p> 
         </div>
         <div className="item">
           <p  title="Wind"><i className="fas fa-wind"></i><span>{wind} <small>mph</small> </span></p> 
         </div>
        </div>
      </div>
     
        <div className="location__forCast">
          {forecast &&
            <Fragment>
              <h3>Forcast</h3>
              <div className="location__forCastWrapper">
                {forecasts}
              </div>
            </Fragment>
          }
        </div>
      
      
    </div>
  );
}
