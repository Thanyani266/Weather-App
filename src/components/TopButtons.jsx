import PropTypes from 'prop-types';

const TopButtons = ({setQuery}) => {
    const cities = [
        {
            id: 1,
            title: 'Pretoria'
        },
        {
            id: 2,
            title: 'Johannesburg'
        },
        {
            id: 3,
            title: 'Polokwane'
        },
        {
            id: 4,
            title: 'Bloemfontein'
        },
        {
            id: 5,
            title: 'Durban'
        }
    ]
  return (
    <div  className="flex items-center justify-around my-6">
      {cities.map(city => (
        <button className="text-white text-lg font-medium" key={city.id} onClick={() => setQuery({q: city.title})}>{city.title}</button>
      ))}
    </div>
  )
}

TopButtons.propTypes = {
  setQuery: PropTypes.func
};

export default TopButtons
