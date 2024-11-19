import React, {useCallback, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {theme} from '../../theme/main.theme';
import {IGetWeather, WeatherService} from '../../services/weather.service';
import FastImage from 'react-native-fast-image';
import {useFocusEffect} from '@react-navigation/native';
import {IWeatherResponse} from '../../interfaces/weather-response.interface';
import {containerStyles} from '../../styles/container.styles';
import {imageStyles} from '../../styles/image.styles';

const WeatherCard: React.FC<IGetWeather> = ({lat, lon}) => {
  const [weatherData, setWeatherData] = useState<IWeatherResponse | null>();
  const [isWeatherDataLoading, setIsWeatherDataLoading] = useState<
    boolean | null
  >(null);
  const [errorWeatherData, setErrorWeatherData] = useState<boolean | null>(
    null,
  );
  useFocusEffect(
    useCallback(() => {
      async function getWeatherData(latitude: number, longitude: number) {
        const weatherResponse = await WeatherService.get({
          lat: latitude,
          lon: longitude,
        });
        setIsWeatherDataLoading(true);
        if (weatherResponse) {
          setWeatherData(weatherResponse);
          setIsWeatherDataLoading(false);
          setErrorWeatherData(false);
        } else {
          setIsWeatherDataLoading(false);
          setErrorWeatherData(true);
        }
      }
      getWeatherData(lat, lon);
      return () => getWeatherData(lat, lon);
    }, [lat, lon]),
  );

  return (
    <View style={containerStyles.card}>
      {isWeatherDataLoading ? (
        <Text>Weather data is loading...</Text>
      ) : errorWeatherData ? (
        <Text>Weather data could not be loaded</Text>
      ) : (
        <View style={containerStyles.card}>
          <FastImage
            source={{
              uri: `https://openweathermap.org/img/wn/${weatherData?.weather[0].icon}@2x.png`,
              priority: FastImage.priority.high,
            }}
            style={imageStyles.icon2}
            resizeMode={FastImage.resizeMode.contain}
          />

          <Text style={styles.temperature}>{weatherData?.main.temp}°</Text>
          <Text style={styles.condition}>
            {weatherData?.weather[0].description}
          </Text>
          <Text style={styles.temperatures}>
            Max: {weatherData?.main.temp_max}° Min: {weatherData?.main.temp_min}
            °
          </Text>
          <Text style={styles.condition}> dt: {weatherData?.dt}</Text>
          <Text style={styles.condition}>
            {' '}
            timezone: {weatherData?.timezone}
          </Text>
          <Text style={styles.condition}>
            {' '}
            windspeed: {weatherData?.wind.speed}
          </Text>
          <Text style={styles.condition}>
            {' '}
            wind direction: {weatherData?.wind.deg}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  temperature: {
    fontSize: theme.fontSizes.title,
    color: theme.colors.textPrimary,
    fontWeight: 'bold',
  },
  condition: {
    fontSize: theme.fontSizes.text,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.small,
  },
  temperatures: {
    fontSize: theme.fontSizes.text,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.small,
  },
});

export default WeatherCard;
