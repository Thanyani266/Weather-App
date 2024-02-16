import { 
    UilArrowUp,
    UilArrowDown,
    UilTemperature,
    UilTear,
    UilWind,
    UilSun,
    UilSunset 
} from '@iconscout/react-unicons'
import { formatToLocalTime, iconUrlFromCode } from '../services/WeatherService'
import PropTypes from 'prop-types'

const TemperatureAndDetails = ({weather: {
  description, 
  icon, 
  temp, 
  temp_min, 
  temp_max,
  sunrise,
  sunset,
  speed,
  humidity,
  feels_like,
  timezone
}}) => {
  return (
    <div>
      <div className="flex items-center justify-center py-6 text-xl text-cyan-300">
        <p>{description}</p>
      </div>
      <div className="flex flex-row items-center justify-center text-white py-3">
        <img src={iconUrlFromCode(icon)} alt="sun" className="w-20"/>
      </div>
      <div className="text-5xl text-center">{`${temp.toFixed()}°`}</div>
      <div className="flex flex-col space-y-2">
        <div className="flex font-light text-sm items-center justify-center">
            <UilTemperature size={18} className='mr-1'/>
            Real feel:
            <span className='font-medium ml-1'>{`${feels_like.toFixed()}°`}</span>
        </div>
        <div className="flex font-light text-sm items-center justify-center">
            <UilTear size={18} className='mr-1'/>
            Humidity:
            <span className='font-medium ml-1'>{`${humidity.toFixed()}%`}</span>
        </div>
        <div className="flex font-light text-sm items-center justify-center">
            <UilWind size={18} className='mr-1'/>
            Wind speed:
            <span className='font-medium ml-1'>{`${speed.toFixed()}km/h`}</span>
        </div>
      </div>
      <div className='flex flex-row items-center justify-center space-x-2 text-white text-sm py-3'>
        <UilSun />
        <p className='font-light'>Rise: 
          <span className='font-medium ml-1'> 05:47
            {formatToLocalTime(sunrise, timezone, 'hh:mm a') 
            
            }
          </span>
        </p>
        <p className='font-light'>|</p>
        <UilSunset />
        <p className='font-light'>Set: 
          <span className='font-medium ml-1'>18:37
          {formatToLocalTime(sunset, timezone, 'hh:mm a') }
          </span>
        </p>
        <p className='font-light'>|</p>
        <UilArrowUp />
        <p className='font-light'>High: <span className='font-medium ml-1'>{`${temp_max.toFixed()}°`}</span></p>
        <p className='font-light'>|</p>
        <UilArrowDown />
        <p className='font-light'>Low: <span className='font-medium ml-1'>{`${temp_min.toFixed()}°`}</span></p>
      </div>
    </div>
  )
}

export default TemperatureAndDetails

TemperatureAndDetails.propTypes = {
  weather: PropTypes.object
};
