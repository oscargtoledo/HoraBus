// ./navigation/StackNavigator.js

import React from 'react';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';

import Home from '../screens/Home';
import About from '../screens/About';
import Contact from '../screens/Contacts';
import ScheduleSelector from '../screens/ScheduleSelector';
import ScheduleView from '../screens/ScheduleView';
import TwitterFeed from '../screens/TwitterFeed';
import {
  Switch,
  useTheme,
  Appbar,
  TouchableRipple,
  ToggleButton,
  Button,
} from 'react-native-paper';
import { Text, View } from 'react-native';
// import PreferencesContext from '../PreferencesContext';
import { DarkModeSwitch as DKSwitch } from '../utils/DarkModeSwitch';
import GeneralMenu from '../utils/GeneralMenu';
const Stack = createStackNavigator();

const MainStackNavigator = ({ scene }) => {
  const theme = useTheme();
  // const { toggleTheme, isThemeDark } = React.useContext(PreferencesContext);

  const ScreenOptions = {
    // ...TransitionPresets.SlideFromRightIOS, // This is where the transition happens
    // headerStyle: {
    //   backgroundColor: '#f4511e'
    // }
  };

  return (
    <Stack.Navigator
      screenOptions={{
        ...TransitionPresets.SlideFromRightIOS,
        headerStyle: {
          backgroundColor: theme?.colors.primary,
        },
        headerRight: () => <GeneralMenu />,
      }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="About" component={About} />
    </Stack.Navigator>
  );
};

const ContactStackNavigator = () => {
  return (
    // <Stack.Navigator screenOptions={ScreenOptions}>
    <Stack.Navigator
      screenOptions={{
        ...TransitionPresets.SlideFromRightIOS,
        headerStyle: {
          backgroundColor: theme?.colors.primary,
        },
        headerRight: () => <DKSwitch />,
      }}
    >
      <Stack.Screen name="Contact" component={Contact} />
    </Stack.Navigator>
  );
};

const TwitterNavigator = ({ navigation }) => {
  const theme = useTheme();
  return (
    <Stack.Navigator
      screenOptions={{
        ...TransitionPresets.SlideFromRightIOS,
        headerStyle: {
          backgroundColor: theme?.colors.primary,
        },
        headerRight: () => <GeneralMenu />,
      }}
    >
      <Stack.Screen
        name="View Tweets"
        component={TwitterFeed}
        options={{
          headerRight: () => <DKSwitch />,
          headerLeft: () => (
            <ToggleButton
              mode="contained"
              icon="menu"
              onPress={() => navigation.toggleDrawer()}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

const ScheduleNavigator = ({ navigation }) => {
  const theme = useTheme();
  return (
    <Stack.Navigator
      screenOptions={{
        ...TransitionPresets.SlideFromRightIOS,
        headerStyle: {
          backgroundColor: theme?.colors.primary,
        },
        headerRight: () => <GeneralMenu />,
      }}
    >
      <Stack.Screen
        name="Select Schedule"
        component={ScheduleSelector}
        options={{
          headerRight: () => <DKSwitch />,
          headerLeft: () => (
            <ToggleButton
              mode="contained"
              icon="menu"
              onPress={() => navigation.toggleDrawer()}
            />
          ),
        }}
      />
      <Stack.Screen
        name="Schedule Viewer"
        component={ScheduleView}
        // options={({ route }) => ({ title: route.params.routeName })}
      />
    </Stack.Navigator>
  );
};

export {
  MainStackNavigator,
  ContactStackNavigator,
  ScheduleNavigator,
  TwitterNavigator,
};
