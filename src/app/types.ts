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
