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
const MainStack = createStackNavigator();
const ContactStack = createStackNavigator();
const TwitterStack = createStackNavigator();

const MainStackNavigator = ({ scene }) => {
  const theme = useTheme();

  const ScreenOptions = {
    // ...TransitionPresets.SlideFromRightIOS, // This is where the transition happens
    // headerStyle: {
    //   backgroundColor: '#f4511e'
    // }
  };

  return (
    <MainStack.Navigator
      screenOptions={{
        ...TransitionPresets.SlideFromRightIOS,
        headerStyle: {
          backgroundColor: theme?.colors.primary,
        },
        // headerShown: false,

        headerRight: () => <GeneralMenu />,
      }}
    >
      <MainStack.Screen
        name="Tots"
        component={ScheduleSelector}
        options={{
          title: 'HoraBus',
        }}
      />
      <MainStack.Screen
        name="Horari"
        component={ScheduleView}
        // options={({ route }) => ({ title: route.params.routeName })}
        options={{ title: 'Horari' }}
      />
    </MainStack.Navigator>
  );
};

const ContactStackNavigator = ({ navigation }) => {
  const theme = useTheme();
  return (
    // <Stack.Navigator screenOptions={ScreenOptions}>
    <ContactStack.Navigator
      screenOptions={{
        ...TransitionPresets.SlideFromRightIOS,
        headerStyle: {
          backgroundColor: theme?.colors.primary,
        },
        title: 'Contactar',
        headerTitleStyle: { alignSelf: 'center' },
        // headerRight: () => <GeneralMenu />,
        // headerLeft: () => (
        //   <ToggleButton
        //     mode="contained"
        //     icon="menu"
        //     onPress={() => navigation.toggleDrawer()}
        //   />
        // ),
      }}
    >
      <ContactStack.Screen name="Contactar" component={Contact} />
    </ContactStack.Navigator>
  );
};

const TwitterNavigator = ({ navigation }) => {
  const theme = useTheme();
  return (
    <TwitterStack.Navigator
      screenOptions={{
        ...TransitionPresets.SlideFromRightIOS,
        headerStyle: {
          backgroundColor: theme?.colors.primary,
        },
        headerTitleStyle: { alignSelf: 'center' },
        headerRight: () => <GeneralMenu />,
      }}
    >
      <TwitterStack.Screen
        name="Tweets"
        component={TwitterFeed}
        options={{
          title: 'Twitter BusGarraf',
          headerTitleStyle: { alignSelf: 'center' },
          // headerRight: () => <DKSwitch />,
          // headerLeft: () => (
          //   <ToggleButton
          //     mode="contained"
          //     icon="menu"
          //     onPress={() => navigation.toggleDrawer()}
          //   />
          // ),
        }}
      />
    </TwitterStack.Navigator>
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
        name="Horaris"
        component={ScheduleSelector}
        options={{
          title: 'HoraBus',
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
        options={({ route }) => ({ title: route.params.routeName })}
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
