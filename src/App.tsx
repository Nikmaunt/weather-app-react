import React, {useCallback,KeyboardEvent, useState} from 'react';
import axios from 'axios'




function App() {

    const [data, setData] = useState<any>({})
    const [location, setLocation]= useState('')

    const url = `https://api.weatherapi.com/v1/current.json?key=fd43efb3a0c74d3abee155705221912&q=${location}&aqi=no`

    const searchLocation = (event:KeyboardEvent<HTMLInputElement>) => {
        if(event.key ==="Enter") {
            axios.get(url).then((response)=> {
                setData(response.data)
                console.log(response.data)
            })
            setLocation('')
        }
    }
    return (
        <div className="app">
            <div className="search">
                <input
                    value={location}
                    onChange={event=> setLocation(event.target.value)}
                    onKeyPress={searchLocation}
                    placeholder='Enter Location'
                    type="text"/>
            </div>
            <div className="container">
                <div className="top">
                    <div className="location">
                        {data.location ?<p>{ data.location.name}</p> : null }
                    </div>
                    <div className="temp">
                        {data.location ?<h1>{ data.current.temp_c.toFixed()}°C</h1> : null }
                    </div>
                    <div className="description">
                        {data.current ? <p>{data.current.condition.text}</p> : null }
                    </div>
                </div>
                { data.location != undefined &&
                    <div className="bottom">
                    <div className="feels">
                        {data.current ? <p className='bold'>{data.current.feelslike_c.toFixed()}°C</p> : null }
                        <p> Feels like</p>
                    </div>
                    <div className="humidity">
                        {data.current ? <p className='bold'>{data.current.humidity.toFixed()}%</p> : null }
                        <p>Humidity</p>
                    </div>
                    <div className="wind">
                        {data.current ? <p className='bold'>{data.current.vis_km.toFixed()}KM/H</p> : null }
                        <p>Wind speed</p>
                    </div>
                </div>
                }
            </div>
        </div>
    );
}

export default App;
