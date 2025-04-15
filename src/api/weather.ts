export const fetchWeather = async (params: {city: string}) => {
  const response = await fetch(
    `https://restapi.amap.com/v3/weather/weatherInfo?city=${params.city}&key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&extensions=all`
  );
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data: WeatherAPIResponse = await response.json();

  return data;
};
