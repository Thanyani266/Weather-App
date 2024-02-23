import PropTypes from 'prop-types';
import { iconUrlFromCode } from '../services/WeatherService';
import { useEffect, useState } from 'react';
import { DateTime } from 'luxon';

const Forecast = ({title, items, weather}) => {

  const [offset, setOffset] = useState()

  const offsettData = async () => {
    const response = await fetch('https://thanyani266.github.io/time_zone-offset_data/timezone.json')
    const responseData = await response.json()
    console.log(responseData);
    const displayData = responseData.find(item => item.offset === weather.timezone)
    setOffset(displayData.name)
  }

  useEffect(() => {
    offsettData();
  }, )
  return (
    <div>
      <div className="flex items-center justify-start mt-6">
        <p className="text-white font-medium uppercase">{title}</p>
      </div>
      <hr className="my-2"/>
      <div className="flex flex-row items-center justify-between text-white">
        {items.map((item, index) => (
          <div key={index} className="flex flex-col items-center justify-center">
            <p className="font-light text-sm">
              {DateTime.fromSQL(item.title).setZone(`${offset}`).toFormat("hh:mm a")}
            </p>
            <img src={iconUrlFromCode(item.icon)} alt="sun" className="w-12 my-1"/>
            <p className="font-medium">{`${item.temp.toFixed()}°`}</p>
          </div>
        ))}
        
      </div>
    </div>
  )
}

Forecast.propTypes = {
  title: PropTypes.string,
  items: PropTypes.array,
  weather: PropTypes.array
};

export default Forecast
