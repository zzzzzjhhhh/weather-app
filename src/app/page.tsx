'use client';
import React, { useState, useEffect } from 'react';
import styles from './page.module.css';

interface WeatherAPIResponse {
  status: string;
  count: string;
  info: string;
  infocode: string;
  forecasts?: WeatherForecastResponse[];
}

interface DailyForecast {
  date: string;
  week: string;
  dayweather: string;
  nightweather: string;
  daytemp: string;
  nighttemp: string;
  daywind: string;
  nightwind: string;
  daypower: string;
  nightpower: string;
  daytemp_float: string;
  nighttemp_float: string;
}

interface WeatherForecastResponse {
  city: string;
  adcode: string;
  province: string;
  reporttime: string;
  casts: DailyForecast[];
}

interface CityOption {
  key: string;
  value: string;
}

const cityOptions: CityOption[] = [{
  key: '北京',
  value:'110000'
}, {
  key: '上海',
  value:'310000'
},{
  key: '广州',
  value:'440100'
},{
  key: '深圳',
  value:'440300'
},{
  key: '杭州',
  value:'330100'
},{
  key: '成都',
  value:'510100'
},{
  key: '重庆',
  value:'500000'
},{
  key: '长沙',
  value:'430100'
}]

const App: React.FC = () => {
  const [forecast, setForecast] = useState<DailyForecast[]>([]);
  const [selectedCity, setSelectedCity] = useState<CityOption>(cityOptions[0]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWeatherData = async (selectedCity: CityOption) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://restapi.amap.com/v3/weather/weatherInfo?city=${selectedCity.value}&key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&extensions=all`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: WeatherAPIResponse = await response.json();
      console.log(data, 'data');
      if (!data.forecasts?.[0]?.casts) {
        return;
      }
      setForecast(data.forecasts?.[0]?.casts);
    } catch (err) {
      setError('无法获取天气数据，请检查城市名称或稍后再试');
      console.error('Error fetching weather data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData(selectedCity);
  }, [selectedCity]);

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCityCode = e.target.value;
    const city = cityOptions.find(c => c.value === selectedCityCode) || cityOptions[0];
    setSelectedCity(city);
  };

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <h1>{selectedCity.key}城市天气预报</h1>
        <div className={styles.citySelector}>
          <select 
            value={selectedCity.value} 
            onChange={handleCityChange}
            disabled={loading}
          >
            {cityOptions.map(city => (
              <option key={city.value} value={city.value}>
                {city.key}
              </option>
            ))}
          </select>
        </div>
      </header>

      {loading ? (
        <div className={styles.loading}>加载中...</div>
      ) : error ? (
        <div className={styles.error}>{error}</div>
      ) : (
        <div className={styles.forecastContainer}>
          {forecast.map(day => (
            <div key={day.date} className={styles.forecastCard}>
              <h3>{day.date}</h3>
              <p className={styles.weatherDesc}>{day.dayweather}</p>
              <div className={styles.tempContainer}>
                <span className={styles.tempMax}>最高温度：{day.daytemp_float}°C</span>
                <span className={styles.tempMin}>最低温度：{day.nighttemp_float}°C</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
