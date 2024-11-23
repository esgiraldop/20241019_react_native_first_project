// if (__DEV__) {
//   require('./ReactotronConfig');
// }

import React, {useEffect, useState} from 'react';
import {StatusBar, useColorScheme, View} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
// import {DemoScreen} from './src/screens/demo.screen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  AddContactScreen,
  AllContactsScreen,
  ContactDetailsScreen,
  EditContactScreen,
} from './src/screens';
import {RootStackParamList} from './src/interfaces/navigation.interface';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {theme} from './src/theme/main.theme';
import {RegistrationScreen} from './src/screens/register.screen';
import {LoginScreen} from './src/screens/login.screen';
import {SyncProvider} from './src/contexts/contacts-syncronization.context';
import AppSplashScreen from './src/components/register/App-splash-screen.component';
// import {AuthProvider, useAuth} from './src/contexts/auth.context';
// import {Loader} from './src/components';
import {isNull} from './src/utilities/checkIsNull.utility';
import {getAsyncStorageValue} from './src/utilities/get-async-storage-contents.utility';

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {
  const [showSplash, setShowSplash] = useState(true);
  const isDarkMode = useColorScheme() === 'dark'; // TODO: Maybe define this in the main app theme?
  // const {isAuthenticated, isLoadingAuth} = useAuth(); // This didn't work
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(() => {
    // Set a timer to transition to the main app
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000); // splash duration
    console.log('isAuthenticated from app.tsx: ', isAuthenticated);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Check if token exists in AsyncStorage
    const checkToken = async () => {
      const token = await getAsyncStorageValue('token');
      if (token) setIsAuthenticated(!!token); // Set true if token exists, false otherwise
    };

    checkToken();
  }, []);

  return (
    // <AuthProvider> // This didn't work
    <SafeAreaProvider style={backgroundStyle}>
      <View style={{flex: 1}}>
        {showSplash ? (
          <AppSplashScreen />
        ) : (
          <>
            <StatusBar
              barStyle={isDarkMode ? 'light-content' : 'dark-content'}
              // barStyle={'dark-content'}
              backgroundColor={backgroundStyle.backgroundColor}
            />
            <SyncProvider>
              <NavigationContainer>
                <Stack.Navigator
                  initialRouteName={
                    !isAuthenticated && isNull(isAuthenticated)
                      ? 'Register'
                      : 'Contacts'
                  }
                  screenOptions={{
                    headerStyle: {
                      backgroundColor: theme.colors.background,
                    },
                    headerTintColor: theme.colors.textPrimary,
                    headerTitleStyle: {
                      fontSize: theme.fontSizes.title,
                      color: theme.colors.textPrimary,
                    },
                    animation: 'slide_from_right',
                    freezeOnBlur: true,
                  }}>
                  {!isAuthenticated ? (
                    <>
                      <Stack.Screen
                        name="Register"
                        component={RegistrationScreen}
                        options={{title: 'User registration'}}
                      />
                      <Stack.Screen
                        name="Login"
                        component={LoginScreen}
                        options={{title: 'User login'}}
                      />
                    </>
                  ) : (
                    <>
                      <Stack.Screen
                        name="Contacts"
                        component={AllContactsScreen}
                        options={{
                          title: 'Contacts',
                        }}
                      />
                      <Stack.Screen
                        name="ContactDetails"
                        component={ContactDetailsScreen}
                        options={{title: 'Contact details'}}
                      />
                      <Stack.Screen
                        name="AddContact"
                        component={AddContactScreen}
                        options={{title: 'Add new contact'}}
                      />
                      <Stack.Screen
                        name="EditContact"
                        component={EditContactScreen}
                        options={{title: 'Edit contact'}}
                      />
                    </>
                  )}
                </Stack.Navigator>
              </NavigationContainer>
            </SyncProvider>
          </>
        )}
      </View>
    </SafeAreaProvider>
    // </AuthProvider>
  );
}

export default App;
