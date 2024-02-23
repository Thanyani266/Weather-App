//import UilReact from '@iconscout/react-unicons/icons/uil-react'
import { useEffect, useState } from 'react'
import './App.css'
import Forecast from './components/Forecast'
import Inputs from './components/Inputs'
import TemperatureAndDetails from './components/TemperatureAndDetails'
import TimeAndLocation from './components/TimeAndLocation'
import TopButtons from './components/TopButtons'
import getFormattedWeatherData from './services/WeatherService'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [query, setQuery] = useState({q: 'berlin'})
  const [units, setUnits] = useState('metric')
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    const fetchWeather = async () => {
      const message = query.q ? query.q : 'current location.'

      toast.info('Fetching weather for ' + message)
      await getFormattedWeatherData({...query, units})
      .then(data => {
        toast.success(`Successfully fetched weather for ${data.name}, ${data.country}`)
        //const zone = data.find(item => item.timezone === "")
        setWeather(data)
      })
    }
  
    fetchWeather();
  }, [query, units])

  const formatBackground = () => {
    if(!weather) return 'from-purple-500 to-pink-500'
    const threshold = units === 'metric' ? 20 : 60
    if(weather.temp <= threshold) return 'from-purple-500 to-pink-500'

    return 'from-yellow-500 to-orange-500'
  }

  return (
    <div className={`mx-auto p-5 bg-gradient-to-r shadow-xl shadow-gray-400 ${formatBackground()}`}>
      <TopButtons setQuery={setQuery} />
      <Inputs setQuery={setQuery} units={units} setUnits={setUnits} />

      { weather && (
        <>
        <TimeAndLocation weather = {weather}/>
        <TemperatureAndDetails weather={weather}/>
        <Forecast title='3-hour forecast' items={weather.hourly} weather={weather}/>
        </>
      )}

      <ToastContainer autoClose={5000} theme='colored' newestOnTop={true} />

    </div>
  )
}

export default App
