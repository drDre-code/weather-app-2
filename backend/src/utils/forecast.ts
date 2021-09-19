import request from "request";

export const forecast = (latitude: number, longitude: number, callback: (a: string | undefined, b: number, c: { [key: string]: string; } | undefined) => void) => {

  const appid = process.env.OWM_API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${appid}`;
  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback('Unable to Connect to weather service!', 500, undefined);
    } else if (response.body.error) {
      callback('Unable to find location', response.body.cod, undefined);
    } else if (response.body.cod !== 200) {
      callback(response.body.message, response.body.cod, undefined);
    } else {
      const data = response.body;
      const temperature = data.main.temp;
      const feelslike = data.main.feels_like;
      const humidity = data.main.humidity;
      const tempMin = data.main.temp_min;
      const tempMax = data.main.temp_max;
      const icon = data.weather[0].icon;
      const description = data.weather[0].description;
      const info = `It is currently ${temperature} degrees celsius out. The high today is ${tempMax} degrees celsius with a low of ${tempMin} degrees celsius. It feels like ${feelslike} degrees celsius out with humidity of ${humidity}%.`;
      const output = { icon, tempMin, tempMax, info, description };
      callback(undefined, response.body.cod, output);
    }
  });
};

