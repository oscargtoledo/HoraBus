// ./App.js
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
  colors: {
    ...PaperDefaultTheme.colors,
    ...NavigationDefaultTheme.colors,
  },
};
const CombinedDarkTheme = {
  ...PaperDarkTheme,
  ...NavigationDarkTheme,
  colors: {
    ...PaperDarkTheme.colors,
    ...NavigationDarkTheme.colors,
    background: '#121212',
    primary: '#424242',

  },
};



import React from "react";

import { MainStackNavigator } from "./src/navigation/StackNavigator";
import BottomTabNavigator from "./src/navigation/TabNavigator";
import DrawerNavigator from "./src/navigation/DrawerNavigator";
import PreferencesContext from './src/preferences/context';


import { createStackNavigator } from "@react-navigation/stack";
import Home from "./src/screens/Home";
import About from "./src/screens/About";



function App() {
  const [isThemeDark, setIsThemeDark] = React.useState(false);
  const theme = isThemeDark ? CombinedDarkTheme : CombinedDefaultTheme;

  return (
    <PreferencesContext.Provider value={{ isThemeDark, setIsThemeDark }}>
      <PaperProvider theme={theme}>
        <NavigationContainer theme={theme}>
          {/* <MainStackNavigator /> */}
          {/* <BottomTabNavigator /> */}
          <DrawerNavigator />
        </NavigationContainer>
      </PaperProvider>
    </PreferencesContext.Provider>


  );
};
export default App;