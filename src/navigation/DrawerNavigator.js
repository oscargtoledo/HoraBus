// ./navigation/DrawerNavigator.js

import React from "react";

import { createDrawerNavigator } from "@react-navigation/drawer";
import { useWindowDimensions } from 'react-native';
import { ContactStackNavigator } from "./StackNavigator";

import { Text, View } from 'react-native';
import TabNavigator from "./TabNavigator";

const Drawer = createDrawerNavigator();


// function DrawerContent() {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Text>Drawer content</Text>
//     </View>
//   );
// }

const DrawerNavigator = () => {
  const dimensions = useWindowDimensions();
  return (
    <Drawer.Navigator
      drawerType={dimensions.width >= 768 ? 'permanent' : 'front'}
    // drawerContent={() => <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    //   <Text>Drawer content</Text>
    //   <Switch />
    // </View>}
    >
      <Drawer.Screen name="Home" component={TabNavigator} />
      <Drawer.Screen name="Contact" component={ContactStackNavigator} />
      {/* <Switch></Switch> */}
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;