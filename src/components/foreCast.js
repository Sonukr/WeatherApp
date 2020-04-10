import React, {Fragment}  from 'react';


export const Forecast = (props) => {

    const { temp, month, day, hour, icon } = props;
    const iconUrl = `https://openweathermap.org/img/w/${icon}.png`;
    return(
        <Fragment>
            <p>{month}.{day}</p>
            <p>{hour}:00</p>
            <img src={iconUrl} alt={'icon'}/>
            <p>{temp}&#176;</p>
        </Fragment>
    )
}