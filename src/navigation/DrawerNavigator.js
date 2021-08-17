// ./navigation/DrawerNavigator.js

import React from 'react';

import { createDrawerNavigator, DrawerItem } from '@react-navigation/drawer';
import { useWindowDimensions, Text, View, BackHandler } from 'react-native';
import {
  ContactStackNavigator,
  ScheduleNavigator,
  TwitterNavigator,
} from './StackNavigator';
import { Button, useTheme } from 'react-native-paper';
import TabNavigator from './TabNavigator';
import { DarkModeSwitch as DKSwitch } from '../utils/DarkModeSwitch';
import { ScrollView } from 'react-native-gesture-handler';

const Drawer = createDrawerNavigator();
function CustomDrawerContent({ navigation }) {
  return (
    <ScrollView>
      <Button
        mode="contained"
        onPress={() => {
          // Navigate using the `navigation` prop that you received
          navigation.navigate('Home');
        }}
      >
        Select Schedule
      </Button>
      <Button
        mode="contained"
        onPress={() => {
          // Navigate using the `navigation` prop that you received
          navigation.navigate('TwitterFeed');
        }}
      >
        Twitter Feed
      </Button>
    </ScrollView>
  );
}

const DrawerNavigator = () => {
  const dimensions = useWindowDimensions();
  const theme = useTheme();

  return (
    <Drawer.Navigator
      drawerType={dimensions.width >= 768 ? 'permanent' : 'front'}
      edgeWidth={25}
      // drawerContent={() => (
      //   <View
      //     style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
      //   >
      //     <DKSwitch></DKSwitch>
      //     {/* <Switch /> */}
      //   </View>
      // )}
      drawerContent={props => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Home" component={ScheduleNavigator} />
      <Drawer.Screen name="TwitterFeed" component={TwitterNavigator} />
      <Drawer.Screen name="Contact" component={ContactStackNavigator} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
