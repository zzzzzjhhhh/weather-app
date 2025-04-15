'use client';
import React, { useState, useEffect } from 'react';
import styles from './page.module.css';
import { CitySelector } from '@/components/CitySelector/CitySelector';
import { useQueryWeather } from '@/hooks/useQueryWeather';
import { cityOptions } from './constant';

const WeatherApp: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState<CityOption>(cityOptions[0]);
  const { data: weatherData, isLoading, error } = useQueryWeather(selectedCity);
  const handleCityChange = (cityOpt: CityOption) => {
    setSelectedCity(cityOpt);
  };

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <h1>{selectedCity.key}城市天气预报</h1>
        <CitySelector
          cityOptions={cityOptions}
          selectedCity={selectedCity}
          handleCityChange={handleCityChange}
        />
      </header>

      {isLoading ? (
        <div className={styles.loading}>加载中...</div>
      ) : error ? (
        <div className={styles.error}>{error}</div>
      ) : (
        <div className={styles.forecastContainer}>
          {weatherData.map(day => (
            <div key={day.date} className={styles.forecastCard}>
              <h3>{day.date}</h3>
              <p className={styles.weatherDesc}>{day.dayweather}</p>
              <div className={styles.tempContainer}>
                <span className={styles.tempMax}>
                  最高温度：{day.daytemp_float}°C
                </span>
                <span className={styles.tempMin}>
                  最低温度：{day.nighttemp_float}°C
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
