import React, {useCallback, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {theme} from '../../theme/main.theme';
import {IGetWeather, WeatherService} from '../../services/weather.service';
import FastImage from 'react-native-fast-image';
import {useFocusEffect} from '@react-navigation/native';
import {IWeatherResponse} from '../../interfaces/weather-response.interface';

const WeatherCard: React.FC<IGetWeather> = ({lat, lon}) => {
  console.log(`lat, lon: ${lat}, ${lon}`);
  const temperature = 17;
  const maxTemperature = 19;
  const minTemperature = 15;
  const condition = 'rain';
  const description = 'There is some rain';

  const [weatherData, setWeatherData] = useState<IWeatherResponse | null>();

  useFocusEffect(
    useCallback(() => {
      async function getWeatherData(latitude: number, longitude: number) {
        const weatherResponse = await WeatherService.get({
          lat: latitude,
          lon: longitude,
        });
        setWeatherData(weatherResponse);
      }

      getWeatherData(lat, lon);
      return () => getWeatherData(lat, lon);
    }, [lat, lon]),
  );

  console.log('\n\nweatherData: ', weatherData);
  return (
    <View style={styles.card}>
      <FastImage
        source={{
          uri: 'https://openweathermap.org/img/wn/09n@2x.png',
          priority: FastImage.priority.high,
        }}
        style={styles.icon}
        resizeMode={FastImage.resizeMode.contain}
      />

      <Text style={styles.temperature}>{temperature}°</Text>
      <Text style={styles.condition}>{condition}</Text>
      <Text style={styles.condition}>{description}</Text>
      <Text style={styles.temperatures}>
        Max: {maxTemperature}° Min: {minTemperature}°
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.buttonBackground,
    padding: theme.spacing.large,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: theme.colors.borderColor,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  icon: {
    width: 50,
    height: 50,
    marginBottom: theme.spacing.medium,
  },
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
