import { useState } from "react"
import { useNavigate } from "react-router-dom"

const Cities = () => {
  const cities = [
    {id: 1, city: 'Quezon City'},
    {id: 2, city: 'Manila'},
    {id: 3, city: 'Makati'},
    {id: 4, city: 'Taguig'},
    {id: 5, city: 'Pasig'}
  ]
  const [selectedIndex, setSelectedIndex] = useState(-1) 
  const [selectedCity, setSelectedCity] = useState('')
  const navigate = useNavigate()

  const handleCityClick = (index) => {
    setSelectedIndex(index)
    console.log('Selected city:', cities[index].city) 
    setSelectedCity(cities[index].city)
  }

  const handleCityOpen = (index) => {
    navigate(`/city?id=${encodeURIComponent(cities[index].id)}&name=${encodeURIComponent(cities[index].city)}`)
  }

  return (
    <>
      <div className="d-flex flex-column align-items-center w-100">
        <h5 className="text-center">This is from Cities.jsx file</h5>
        <h6 className="text-center">{selectedCity === '' ? 'No city selected.' : selectedCity + ' is selected.'}</h6>
        <div className="d-flex justify-content-center w-100">
          {cities.length === 0 && <p>No cities to display.</p>}
          <ul className="list-group w-75">
            {cities.map((item, index) => (
              <li
                className={`list-group-item ${selectedIndex === index ? 'list-group-item active' : ''}`}
                key={item.id}
                onClick={() => handleCityClick(index)}
              >
                <div className="d-flex flex-row justify-content-between">
                  {item.city}
                  <button className="btn btn-outline-secondary" onClick={() => handleCityOpen(index)}>Open</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}

export default Cities

  //OLD CODE
  // return (
  //   <>
  //     <h5>This is from List Group.jsx file</h5>
  //     {cities.length === 0 && <p>No cities to display.</p>}
  //     <ul className="list-group">
  //       {cities.map((item, index) => (
  //         <li 
  //           className={ selectedIndex === index ? 'list-group-item active' : 'list-group-item' } 
  //           key={index}
  //           onClick={() => { setSelectedIndex(index)}}
  //         >
  //           {item}
  //         </li>
  //       ))}
  //     </ul>
  //   </>
  // )