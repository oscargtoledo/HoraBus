import React from 'react';
import { View, Text, Button } from 'react-native';
import { useTheme, Appbar, TouchableRipple, Switch } from 'react-native-paper';

import usePreferences from '../preferences/usePreferences';

function DarkModeSwitch(props) {
  const theme = useTheme();
  const { isThemeDark, toggleTheme } = usePreferences();
  return (
    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
      <Text>Dark Mode</Text>
      {/* <TouchableRipple > */}
      <Switch
        onValueChange={() => toggleTheme()}
        color={'red'}
        value={isThemeDark}
      ></Switch>
      <Button title="test" onPress={() => { toggleTheme; console.log("e") }}>

      </Button>
      {/* </TouchableRipple> */}


    </View >
  )

}

// <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
//   <Text>Dark Mode</Text>
//   <Button title="test" onPress={() => { toggleTheme; console.log("e") }}>
//   </Button>
// </View >


export { DarkModeSwitch };