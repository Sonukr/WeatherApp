import React from "react";

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

  // const forecasts = forecast.map(item => (   <ForecastHour     key={item.dt}
  //  temp={Math.floor(item.main.temp * 1) / 1}     icon={item.weather[0].icon}
  //  month={item.dt_txt.slice(5, 7)}     day={item.dt_txt.slice(8, 10)}
  // hour={item.dt_txt.slice(11, 13) * 1}   /> ));

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
    <div className="result">
      <div className="location__info">
        <h3>{city}, {country}</h3>
        <p>{date}</p>
      </div>
      <div className="location__details">
        <div className="left">
          {weatherIcon[main] ? weatherIcon[main]() : <span><i className="fas fa-smog"></i></span>}
          <div className="temprature">
            <p className="title"> {Math.floor(temp)}&#176;</p>
            <p className="name"> {main}</p>
          </div>
        </div>
        <div className="right">
         <div className="item">
           <span><i class="fas fa-temperature-low"></i></span> {lowestTemp}
         </div>
         <div className="item">
           <span><i class="fas fa-temperature-low"></i></span> {lowestTemp}
         </div>
         <div className="item">
           <span><i class="fas fa-temperature-low"></i></span> {lowestTemp}
         </div>
         <div className="item">
           <span><i class="fas fa-temperature-low"></i></span> {lowestTemp}

         </div>
         <div className="item">
           <span><i class="fas fa-temperature-low"></i></span> {lowestTemp}
         </div>
         <div className="item">
           <span><i class="fas fa-temperature-low"></i></span> {lowestTemp}
         </div>
        </div>
      </div>
    </div>
  );
}
