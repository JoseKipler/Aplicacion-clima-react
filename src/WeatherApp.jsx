import { useState } from 'react'
import './WeatherApp.css'

export const WeatherApp = () => {


    const [city, setCity] = useState('')
    const [WheatherData, setWheatherData] = useState(null)

    const urlBase = 'https://api.openweathermap.org/data/2.5/weather'
    const API_KEY =  '65b1738ec7a120cdfdacb575c0fce239'
    const difKelvin = 273.15 // Restar este numero a los grados Kelvin


    const fetchWheatherData = async () => {
        try {
            const response = await fetch( `${urlBase}?q=${city}&appid=${API_KEY}&lang=es`)
            const data = await response.json()
            setWheatherData(data)
        }
        catch (error)
         { console.error('Ha hanido un error ', error)}
    }

    const handleSumbit = (event) => {
        event.preventDefault()
        fetchWheatherData()
    }

    const handleCityChange = (event) => {
        setCity(event.target.value)
    }

  return (
    <div className="container">
    <h1>App de clima</h1>
    <form onSubmit={handleSumbit}>
        <input
         type="text"
          placeholder="Ingresa una ciudad" 
          value={city}
          onChange={handleCityChange}
          />
        <button type="submit">Buscar</button>
    </form>


    {WheatherData && (
        <div>
            <h2>{WheatherData.name} , {WheatherData.sys.country}</h2>
            <p> La Temperatura actual es {Math.floor(WheatherData.main.temp - difKelvin)} °C </p>
            <p> La condicion meteorologica actual es: {WheatherData.weather[0].description}</p>
            <img
                        src={`https://openweathermap.org/img/wn/${WheatherData.weather[0].icon}@2x.png`}
                        alt={WheatherData.weather[0].description}
                    />
        </div>
    )}

    </div>
  )
}

