// if (__DEV__) {
//   require('./ReactotronConfig');
// }

import React from 'react';
import {StatusBar, useColorScheme} from 'react-native';
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

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark'; // TODO: Maybe define this in the main app theme?
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaProvider style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Contacts">
          {/* <Stack.Screen name="Demo" component={DemoScreen} /> */}
          <Stack.Screen name="Contacts" component={AllContactsScreen} />
          <Stack.Screen
            name="ContactDetails"
            component={ContactDetailsScreen}
          />
          <Stack.Screen name="AddContact" component={AddContactScreen} />
          <Stack.Screen name="EditContact" component={EditContactScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
