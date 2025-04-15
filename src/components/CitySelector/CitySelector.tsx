import React from 'react';
import styles from './citySelector.module.css';
import { CityOption } from '@/app/types';

interface CitySelector {
  cityOptions: CityOption[];
  selectedCity: CityOption;
  handleCityChange: (option: CityOption) => void;
  isDisabled?: boolean;
}

export const CitySelector: React.FC<CitySelector> = props => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCityCode = e.target.value;
    const city =
      props.cityOptions.find(c => c.value === selectedCityCode) ||
      props.cityOptions[0];
    props.handleCityChange(city);
  };

  return (
    <div>
      <select
        className={styles.citySelector}
        value={props.selectedCity.value}
        onChange={handleChange}
        disabled={props.isDisabled}
      >
        {props.cityOptions.map(city => (
          <option key={city.value} value={city.value}>
            {city.key}
          </option>
        ))}
      </select>
    </div>
  );
};
