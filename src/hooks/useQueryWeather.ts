import { useEffect, useState } from 'react';

export const useQueryWeather = (city: CityOption) => {
  const [forecasts, setForecasts] = useState<DailyForecast[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWeatherData = async (selectedCity: CityOption) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://restapi.amap.com/v3/weather/weatherInfo?city=${selectedCity.value}&key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&extensions=all`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: WeatherAPIResponse = await response.json();
      if (!data.forecasts?.[0]?.casts) {
        return;
      }
      setForecasts(data.forecasts?.[0]?.casts);
    } catch (err) {
      setError('无法获取天气数据，请检查城市名称或稍后再试');
      console.error('Error fetching weather data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData(city);
  }, [city]);

  return { data: forecasts, isLoading, error };
};
