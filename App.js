// ./App.js
// require('dotenv').config();
import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
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
  // mode: 'adaptative',
  dark: false,

  colors: {
    ...PaperDefaultTheme.colors,
    ...NavigationDefaultTheme.colors,
    primary: '#01579b',
    primaryDark: '#002f6c',
    primaryLight: '#4f83cc',
    background: '#01579b',
    accent: '#3c67a3',
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

  colors: {
    ...PaperDarkTheme.colors,
    ...NavigationDarkTheme.colors,
    background: '#121212',
    accent: '#424242',
    primary: '#212121',
    columnAccent: '#6b6b6b',
    primary: '#424242',
  },
};

import React from 'react';

import { MainStackNavigator } from './src/navigation/StackNavigator';
import BottomTabNavigator from './src/navigation/TabNavigator';
import DrawerNavigator from './src/navigation/DrawerNavigator';
import PreferencesContext from './src/preferences/context';

import { Text } from 'react-native-paper';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './src/screens/Home';
import About from './src/screens/About';
import SafeAreaView from 'react-native-safe-area-view';
import { StatusBar, BackHandler } from 'react-native';

function App() {
  const [isThemeDark, setIsThemeDark] = React.useState(false);
  const [isHidingUnselected, setHideUnselected] = React.useState(false);
  const theme = isThemeDark ? CombinedDarkTheme : CombinedDefaultTheme;
  BackHandler.addEventListener('hardwareBackPress', function () {
    return true;
  });
  return (
    <PreferencesContext.Provider
      value={{
        isThemeDark,
        setIsThemeDark,
        isHidingUnselected,
        setHideUnselected,
      }}
    >
      <PaperProvider theme={theme}>
        <NavigationContainer theme={theme}>
          {/* <MainStackNavigator /> */}
          {/* <BottomTabNavigator /> */}

          {/* <SafeAreaView backgroundColor={theme?.colors.primary}> */}
          {/* <Text>ey</Text> */}
          <StatusBar
            barStyle="light-content"
            backgroundColor={theme?.colors.primaryDark}
          ></StatusBar>
          {/* </SafeAreaView> */}
          <DrawerNavigator />
        </NavigationContainer>
      </PaperProvider>
    </PreferencesContext.Provider>
  );
}
export default App;
