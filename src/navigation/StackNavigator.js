// ./navigation/StackNavigator.js

import React from "react";
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";

import Home from "../screens/Home";
import About from "../screens/About";
import Contact from "../screens/Contacts";
import ScheduleSelector from "../screens/ScheduleSelector";
import ScheduleView from "../screens/ScheduleView";
import { Switch, useTheme, Appbar, TouchableRipple } from 'react-native-paper';
import { Text, View } from 'react-native';
// import PreferencesContext from '../PreferencesContext';
import { DarkModeSwitch as DKSwitch } from '../utils/DarkModeSwitch';
const Stack = createStackNavigator();




const MainStackNavigator = ({ scene }) => {
  // const theme = useTheme();
  // const { toggleTheme, isThemeDark } = React.useContext(PreferencesContext);

  const ScreenOptions = {
    // ...TransitionPresets.SlideFromRightIOS, // This is where the transition happens
    // headerStyle: {
    //   backgroundColor: '#f4511e'
    // }

  };

  return (
    <Stack.Navigator screenOptions={ScreenOptions}>
      <Stack.Screen name="Home"
        component={Home}
        options={{
          headerRight: () => (<DKSwitch />)
        }}
      />
      <Stack.Screen name="About" component={About} />
    </Stack.Navigator>
  );
};

const ContactStackNavigator = () => {

  return (
    // <Stack.Navigator screenOptions={ScreenOptions}>
    <Stack.Navigator >
      <Stack.Screen name="Contact" component={Contact} />
    </Stack.Navigator>
  );
};

const ScheduleNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Select Schedule" component={ScheduleSelector} />
      <Stack.Screen name="Schedule Viewer" component={ScheduleView} />
    </Stack.Navigator>
  );
};

export { MainStackNavigator, ContactStackNavigator, ScheduleNavigator };