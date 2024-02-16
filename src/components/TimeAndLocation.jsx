import { formatToLocalTime } from "../services/WeatherService"
import PropTypes from 'prop-types'


const TimeAndLocation = ({weather: {dt, timezone, name, country}}) => {
  return (
    <div>
      <div className="flex items-center justify-center">
        <p className="text-white text-xl font-extralight">
            {console.log(formatToLocalTime(dt, timezone, "ccc, dd LLL yyyy' | Local time: 'hh:mm a"))}
        </p>
      </div>
      <div className="flex items-center justify-center my-3">
        <p className="text-white text-3xl font-medium">
            {`${name}, ${country}`}
        </p>
      </div>
    </div>
  )
}

export default TimeAndLocation

TimeAndLocation.propTypes = {
  weather: PropTypes.object
};
