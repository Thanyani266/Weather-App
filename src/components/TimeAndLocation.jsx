import { DateTime } from "luxon"
//import { formatToLocalTime } from "../services/WeatherService"
import PropTypes from 'prop-types'
import { useEffect, useState } from "react";


const TimeAndLocation = ({weather: {name, country, timezone}}) => {
  const regionNames = new Intl.DisplayNames(
    ['en'], {type: 'region'}
  );

  const [offset, setOffset] = useState()

  const offsettData = async () => {
    const response = await fetch('https://thanyani266.github.io/time_zone-offset_data/timezone.json')
    const responseData = await response.json()
    console.log(responseData);
    const displayData = responseData.find(item => item.offset === timezone)
    setOffset(displayData.name)
  }

  useEffect(() => {
    offsettData();
  }, )

  return (
    <div>
      <div className="flex items-center justify-center">
        <p className="text-white text-xl font-extralight">
            {DateTime.now().setZone(`${offset}`).toFormat("cccc, dd LLL yyyy' | Local time: 'hh:mm a")}
        </p>
      </div>
      <div className="flex items-center justify-center my-3">
        <p className="text-white text-3xl font-medium">
            {`${name}, ${regionNames.of(`${country}`)}`}
        </p>
      </div>
    </div>
  )
}

export default TimeAndLocation

TimeAndLocation.propTypes = {
  weather: PropTypes.object
};
