import React, {Fragment}  from 'react';
import {getDate} from '../utils';

export const Forecast = (props) => {
	console.log(props)
	const { temp, month, day, hour, icon, item:{main:{temp_max,humidity,feels_like}, wind:{speed}} } = props;
	const iconUrl = `https://openweathermap.org/img/w/${icon}.png`;
	return(
		<Fragment>
			<p>
				<span>{getDate(null, day, month[1]-1)}</span>
				<span>{hour}:00</span>
			</p>
			<div className="forecast__temp">
				<img src={iconUrl} alt={'icon'}/>
				<p>{temp}&#176;</p>
			</div>   
			<p>
				<span><i class="fas fa-temperature-low" aria-hidden="true"></i> {feels_like}</span>
				<span><i class="fas fa-cloud-rain" aria-hidden="true"></i> {humidity}%</span>
			</p>
			<p>
				<span><i class="fas fa-temperature-high" aria-hidden="true"></i> {temp_max}</span>
				<span><i class="fas fa-wind" aria-hidden="true"></i>{speed} <small> mph</small></span>
			</p>
		</Fragment>
	)
}

