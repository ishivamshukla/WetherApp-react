import React from 'react'
import './WeatherStyle.css'


class WeatherApp extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isSearched:false,
            cityName:null,
            cityTemp:null,
            apiKey:"c8b922f9e4e3eb1bf2a778a976701b67",
            iconURL:null
        }
    }

    getData = () => {
        var CityName = document.getElementById("city").value;
        fetch(`http://api.openweathermap.org/data/2.5/weather?q=${CityName}&appid=${this.state.apiKey}`)
            .then(res => res.json())
            .then(res =>{
                console.log(res)
                if (res.cod != 200){
                    alert("Please Enter Correct City Name")
                }else {
                    var currentTemp = Math.floor(res.main.temp - 273.15)
                    var IconNum = res.weather[0].icon;
                    var IconUrl = `http://openweathermap.org/img/wn/${IconNum}@2x.png`
                    this.setState({
                        isSearched:true,
                        cityTemp:currentTemp,
                        cityName:CityName,
                        iconURL:IconUrl
                    })
                    document.getElementById("city").value = ""
                    console.log(new Date(res.dt*1000)); // minus

                }
            } )

    }

    render() {
        return (
            <div className="Card">
                <p className="Title">CHECK WEATHER DETAIL IN YOUR CITY</p>
                <label>Enter City Name</label><br/>
                <input className="cityInput" id = "city" autoFocus={true} type="text" placeholder="Enter City Name"/>
                <br/>
                <button onClick={this.getData} className="getBtn">GET DETAIL</button>

                {
                    this.state.isSearched?<div>
                        <p className="Temp">Temp: {this.state.cityTemp} *C</p>
                        <p className="tempCity">City: {this.state.cityName}</p>
                        <img className="tempCity" src={this.state.iconURL} width="40px"/>
                    </div>:<></>
                }
            </div>
        )
    }
}

export default WeatherApp