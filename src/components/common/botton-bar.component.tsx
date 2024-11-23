import React from 'react';
import {View, TouchableOpacity, StyleSheet, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {theme} from '../../theme/main.theme';
import {CommonActions, useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BottomBar = ({onHomePress}: {onHomePress: () => void}) => {
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token'); // Clear the token from AsyncStorage
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'Login'}], // Reset to the login flow
        }),
      );
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onHomePress}>
        <Icon name="home-outline" size={25} color={theme.colors.textPrimary} />
        <Text style={styles.buttonText}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Icon
          name="log-out-outline"
          size={25}
          color={theme.colors.textPrimary}
        />
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
    paddingVertical: theme.spacing.small,
    borderTopWidth: 5,
    borderTopColor: theme.colors.borderColor,
    width: '100%',
  },
  button: {
    alignItems: 'center',
  },
  buttonText: {
    color: theme.colors.textPrimary,
    fontFamily: theme.fonts.default.fontFamily,
    fontSize: theme.fontSizes.small,
    // marginTop: theme.spacing.small / 2,
  },
});

export default BottomBar;
