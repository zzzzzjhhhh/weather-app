import { fetchWeather } from '@/api/weather';
import { CityOption, DailyForecast } from '@/app/types';
import { useEffect, useState } from 'react';

export const useQueryWeather = (city: CityOption) => {
  const [forecasts, setForecasts] = useState<DailyForecast[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWeatherData = async (selectedCity: CityOption) => {
    setIsLoading(true);
    setError(null);

    try {
      const responseData = await fetchWeather({city: selectedCity.key})
      if (!responseData.forecasts?.[0]?.casts) {
        return;
      }
      setForecasts(responseData.forecasts?.[0]?.casts);
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
