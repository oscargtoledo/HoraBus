// ./App.js
require('dotenv').config();
require('fs');
import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
  getStateFromPath,
} from '@react-navigation/native';
import {
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
  Provider as PaperProvider,
} from 'react-native-paper';
const CombinedDefaultTheme = {
  ...PaperDefaultTheme,
  ...NavigationDefaultTheme,
  // roundness: 10,
  dark: false,
  colors: {
    ...PaperDefaultTheme.colors,
    ...NavigationDefaultTheme.colors,
    primary: '#01579b',
    primaryDark: '#002f6c',
    primaryLight: '#4f83cc',
    background: '#01579b',
    accent: '#0091ea',
    columnAccent: '#5390E0',
    surface: '#01457A',
    card: '#224C6B',
    text: '#ffffff',
  },
};
const CombinedDarkTheme = {
  ...PaperDarkTheme,
  ...NavigationDarkTheme,
  dark: true,
  mode: 'adaptative',
  colors: {
    ...PaperDarkTheme.colors,
    ...NavigationDarkTheme.colors,
    background: '#121212',
    accent: '#6d6d6d',
    primary: '#212121',
    columnAccent: '#6b6b6b',
    primary: '#424242',
    primaryLight: '#6b6b6b',
  },
};

import React, { useEffect } from 'react';

// import { MainStackNavigator } from './src/navigation/StackNavigator';
// import BottomTabNavigator from './src/navigation/TabNavigator';

// import { Text } from 'react-native-paper';
// import { createStackNavigator } from '@react-navigation/stack';
// import Home from './src/screens/Home';
// import About from './src/screens/About';
// import SafeAreaView from 'react-native-safe-area-view';
import DrawerNavigator from './src/navigation/DrawerNavigator';
import PreferencesContext from './src/preferences/context';
import { StatusBar, BackHandler } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import GeneralMenu from './src/utils/GeneralMenu';
import * as serviceWorkerRegistration from './src/serviceWorkerRegistration';

const linking = {
  prefixes: ['https://horabus.netlify.app', 'horabus://'],
  config: {
    screens: {
      NotFound: '*',
      Twitter: {
        path: 'Twitter',
        screens: {
          Tweets: '',
        },
      },
      Contact: '',
      Horaris: {
        path: 'Horaris',
        screens: {
          Tots: '',
          Horari: {
            // initialRouteName: 'Horaris',
            path: '/:routeId',
          },
        },
      },
    },
  },
  // getStateFromPath(path, config) {
  //   const defaultState = getStateFromPath(path, config);
  //   // add first page to routes, then you will have a back btn
  //   const { routes } = defaultState;
  //   console.log(routes);
  //   const firstRouteName = 'Horaris';
  //   if (routes && routes.length === 1 && routes[0].name !== firstRouteName) {
  //     defaultState.routes.unshift({ name: firstRouteName });
  //   }
  //   return defaultState;
  // },
};

import {
  ContactStackNavigator,
  ScheduleNavigator,
  TwitterNavigator,
} from './src/navigation/StackNavigator';
import Contact from './src/screens/Contacts';
import TabNavigator from './src/navigation/TabNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
function App() {
  const [isThemeDark, setIsThemeDark] = React.useState(false);
  const [isHidingUnselected, setHideUnselected] = React.useState(false);

  const theme = isThemeDark ? CombinedDarkTheme : CombinedDefaultTheme;
  BackHandler.addEventListener('hardwareBackPress', function () {
    return true;
  });
  const Tab = createBottomTabNavigator();
  const Stack = createStackNavigator();

  useEffect(() => {
    const getDarkTheme = async () => {
      try {
        const value = await AsyncStorage.getItem('darkTheme');
        console.log(JSON.parse(value));
        return JSON.parse(value);
      } catch (e) {
        console.log('Error reading dark theme value');
      }
    };
    getDarkTheme().then(value => {
      if (value != null) setIsThemeDark(value);
    });
  }, []);
  return (
    <SafeAreaProvider>
      <PreferencesContext.Provider
        value={{
          isThemeDark,
          setIsThemeDark,
          isHidingUnselected,
          setHideUnselected,
        }}
      >
        <PaperProvider theme={theme}>
          <NavigationContainer theme={theme} linking={linking}>
            <TabNavigator />
          </NavigationContainer>
        </PaperProvider>
      </PreferencesContext.Provider>
    </SafeAreaProvider>
  );
}
let deferredPrompt;
window.addEventListener('beforeinstallprompt', e => {
  // Prevent the mini-infobar from appearing on mobile
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
  // Update UI notify the user they can install the PWA
  showInstallPromotion();
  // Optionally, send analytics event that PWA install promo was shown.
  console.log(`'beforeinstallprompt' event was fired.`);
});
serviceWorkerRegistration.register();

export default App;
