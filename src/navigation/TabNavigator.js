// ./navigation/TabNavigator.js

import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { MainStackNavigator, ContactStackNavigator, ScheduleNavigator } from "./StackNavigator";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator>
      {/* <Tab.Screen name="Home" component={MainStackNavigator} /> */}
      <Tab.Screen name="Routes" component={ScheduleNavigator} />
      {/* <Tab.Screen name="Contact" component={ContactStackNavigator} /> */}
    </Tab.Navigator>
  );
};

export default TabNavigator;