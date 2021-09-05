// ./navigation/TabNavigator.js

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import {
  MainStackNavigator,
  ContactStackNavigator,
  ScheduleNavigator,
  TwitterNavigator,
} from './StackNavigator';
import TwitterFeed from '../screens/TwitterFeed';
import Contact from '../screens/Contacts';

import { useTheme, Surface } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
const Tab = createMaterialBottomTabNavigator();

// const TabNavigator = () => {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen name="Inici" component={TabNavigatorContent} />
//     </Stack.Navigator>
//   );
// };

const TabNavigator = () => {
  const theme = useTheme();
  return (
    <Tab.Navigator
      // activeColor="#f0edf6"
      // inactiveColor="#3e2465"
      initialRouteName="Horaris"
      barStyle={{
        backgroundColor: theme?.colors.primary,

        // shadowOffset: {
        //   width: 0,
        //   height: 12,
        // },
        shadowOpacity: 1,
        shadowRadius: 13.0,
        borderTopWidth: 0,
        elevation: 8,
      }}
      shifting={true}
      // backBehavior={'history'}
      initialRouteName={'Horaris'}
      // theme={theme}
    >
      <Tab.Screen
        name="Horaris"
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="calendar-month"
              color={color}
              size={26}
            />
          ),
        }}
        component={MainStackNavigator}
      />
      <Tab.Screen
        name="Twitter"
        component={TwitterFeed}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="twitter" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Contacte"
        component={Contact}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="email" color={color} size={26} />
          ),
        }}
      />
      {/* <Tab.Screen
        name="NotFound"
        component={NotFound}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="email" color={color} size={26} />
          ),
        }}
      /> */}
    </Tab.Navigator>
  );
};
// function NotFound(props) {
//   return <Surface style={styles.container}>Not Found</Surface>;
// }
export default TabNavigator;
