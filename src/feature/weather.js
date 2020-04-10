import React from "react";
import {Result, NoResult, Search} from "../components"
import './index.scss';

export default class Wether extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        value: '',
        data: null,
        error: false
    };
  }

  onChange= (e) => {
    this.setState({value: e.target.value});
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { value } = this.state;
    const APIkey= '82f7c40fef1c306d9053c493f9bd340c';
    const weather = `https://api.openweathermap.org/data/2.5/weather?q=${value}&APPID=${APIkey}&units=metric`;
    const forecast = `https://api.openweathermap.org/data/2.5/forecast?q=${value}&APPID=${APIkey}&units=metric`;

    Promise.all([fetch(weather), fetch(forecast)])
      .then(([weatherResp, forCastResp]) => {
        if (weatherResp.ok && forCastResp.ok) {
          return Promise.all([weatherResp.json(), forCastResp.json()]);
        }
        throw Error(weatherResp.statusText, forCastResp.statusText);
      })
      .then(([weatherData, forCastData]) => {
        const months = [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'Nocvember',
          'December',
        ];
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const currentDate = new Date();
        const date = `${days[currentDate.getDay()]} ${currentDate.getDate()} ${
          months[currentDate.getMonth()]
        }`;
        const sunset = new Date(weatherData.sys.sunset * 1000).toLocaleTimeString().slice(0, 5);
        const sunrise = new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString().slice(0, 5);

        const weatherInfo = {
          city: weatherData.name,
          country: weatherData.sys.country,
          date,
          description: weatherData.weather[0].description,
          main: weatherData.weather[0].main,
          temp: weatherData.main.temp,
          highestTemp: weatherData.main.temp_max,
          lowestTemp: weatherData.main.temp_min,
          sunrise,
          sunset,
          clouds: weatherData.clouds.all,
          humidity: weatherData.main.humidity,
          wind: weatherData.wind.speed,
          forecast: forCastData.list,
        };
        this.setState({
          data: weatherInfo,
          error: false,
        });
      })
      .catch(error => {
        console.log(error);

        this.setState({
          error: true,
          data: null,
        });
      });
  }

  render() {
    const { value, data, error } = this.state;
    return (
      <div className="weather">
        <div className={data ? 'weather__header': 'weather__header center'}>
            <h1>WEATHER APP</h1>    
            <Search value={value} onChange={this.onChange} onSubmit={this.onSubmit}/>
        </div>
        {data && <Result results={data}/>}
        {error && <NoResult error={error}/>}
      </div>
    );
  }
}
