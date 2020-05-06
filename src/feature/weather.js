import React from "react";
import {Result, NoResult, Search} from "components"
import './index.scss';
import {getDate} from '../utils.js'

const GeoError = {
	1: "User denied the request for Geolocation.",
	2: "Location information is unavailable.",
	3: "The request to get user location timed out.",
	4: "An unknown error occurred."
}

export default class Wether extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        value: '',
        data: null,
        error: false,
        geoError:{},
        position :{}
    };
  }

  componentDidMount() {
    this.init();
  };

  init(){
    try {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition( (positionData) => {
                this.setState({ position: positionData.coords});
                this.onSubmit();
            }, (error) => {
								console.log(error,error.PERMISSION_DENIED, "dddd");
								this.setState({error: true, geoError: error});
            })
        } else { 
            this.setState({error: true});
            console.log('Geolocation is not Available.');
        }
    }catch(e){

    }
  }

  onChange= (e) => {
    this.setState({value: e.target.value});
  }

  onSubmit = (e) => {
    e && e.preventDefault();
    const { value, position, position:{latitude, longitude }} = this.state;
    console.log(this.state)
    const APIkey= '82f7c40fef1c306d9053c493f9bd340c';

    let forecast, weather = '';
    if(value) {
        weather = `https://api.openweathermap.org/data/2.5/weather?q=${value}&APPID=${APIkey}&units=metric`;
        forecast = `https://api.openweathermap.org/data/2.5/forecast?q=${value}&APPID=${APIkey}&units=metric`;    
    }else if(position){
        console.log('ddddd')
        weather = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${APIkey}&units=metric`;
        forecast = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&APPID=${APIkey}&units=metric`;    
    }

    Promise.all([fetch(weather), fetch(forecast)])
      .then(([weatherResp, forCastResp]) => {
        if (weatherResp.ok && forCastResp.ok) {
          return Promise.all([weatherResp.json(), forCastResp.json()]);
        }
        throw Error(weatherResp.statusText, forCastResp.statusText);
      })
      .then(([weatherData, forCastData]) => {
				const currentDate = new Date();
				const date = getDate(currentDate.getDay(),currentDate.getDate(), currentDate.getMonth());
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
    const { value, data, error, geoError } = this.state;
    return (
      <div className="weather">
        <div className={data ? 'weather__header': 'weather__header center'}>
            <h1>WEATHER APP</h1>    
            <Search value={value} onChange={this.onChange} onSubmit={this.onSubmit}/>
        </div>
        {data && <Result results={data}/>}
        {error && <NoResult error={error} message={GeoError[geoError.PERMISSION_DENIED]}/>}
      </div>
    );
  }
}
