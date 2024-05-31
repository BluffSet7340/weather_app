import { useState } from "react"

// console.log(import.meta.env.REACT_APP_API_KEY)

// not particularly safe, but accessing API Key from the env
const API_KEY = process.env.REACT_APP_API_KEY;
// the above line doesn't work some reason

export default function WeatherForecast() {
    // console.log(process.env.REACT_APP_API_KEY);
    // weather variable and function to update weather using setWeather
    const [weather, setWeather] = useState({
        // define the object and its properties
        icon: "https://openweathermap.org/img/wn/10d@2x.png",
        temp: "20",
        city: "Paris",
        humidity: "30",
        visibility: "20",
        description: "This is a test. Please input a city or country"
    })

    function handleSubmit(event) {
        event.preventDefault()
        // target the event when button is clicked, the input field is referred to and its
        // input is collected and we return its value
        let city = event.target.city.value

        // if no city in field, print this statement to user
        if (!city) {
            alert("Please provide the city name")
            return

        }

        // want to test if the input gathering works
        // alert("city: " + city)
        // now we call the fetch method to grab data from url, this includes the city
        // couldn't access the API key from the .env file so I directly pasted it in. Had some issues so went for this cheap fix
        let url = `https://api.openweathermap.org/data/2.5/weather?q=` + city + `&&units=metric&appid=`;
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error();
                }
                // if successfull, returns a json object
                return response.json();
            })
            .then(data => { //calling the seWeather function, data is the variable
                setWeather({
                    // referrring to the JSON file, use dot operator accordingly
                    icon: "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png",
                    temp: data.main.temp,
                    city: data.name,
                    humidity: data.main.humidity,
                    visibility: data.visibility,
                    description: data.weather[0].description
                })
            })
            // catches any exceptions, uses an arrow function that accepts a parameter
            .catch(error => {
                alert("Unable to fetch the weather forecast")
            })
    }

    return (
        // a container with a top and bottom margin of 5
        <div className="container d-flex justify-content-center align-items-center"
        style={{height: "100vh"}}>
            {/* container that is centred inside of parent container.
             The container is centred on the x-axis, has a rounded border, text is centred,
             and the colour of the text is black, with all around padding of 4*/}
            <div className="rounded border text-center text-black p-4"
                style={{ backgroundColor: "#DBD053", width: "400px" }}>
                <h2 className="fw-bold mb-5">Today's Forecast</h2>
                {/* adds a form for user input, display flex to stack them column-wise */}
                {/* when form is submitted, need to implmement some functionality for it */}
                <form className="d-flex" onSubmit={handleSubmit}>
                    <input className="form-control me-2" placeholder="Enter a city" name="city" />
                    <button className="btn btn-outline-success" type="submit">Search</button>
                </form>
                {/* icon is taken from openweather website */}
                {/* we reference the weather object and get the variable using the dot operator */}
                <img src={weather.icon} alt="..." />
                {/* the display-4 means that text is the smallest, but larger than regular 
                heading classes*/}
                <h1 className="display-4 fw-medium">{weather.temp}°C</h1>
                <h1 className="mb-5">{weather.city}</h1>

                <div className="row mb-4 fs-5">
                    <div className="col">
                        <i className="bi bi-wind"></i> Humidity
                        <p>{weather.humidity}%</p>
                    </div>
                    <div className="col">
                        <i className="bi bi-eye"></i> Visibility
                        <p>{weather.visibility}km</p>
                    </div>
                </div>

                <div className="container">
                    {/* {weather.description} */}
                    <p className="fst-italic">"{weather.description}"</p>
                </div>
            </div>
        </div>
    )
}



