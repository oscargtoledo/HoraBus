import React from 'react';
import { View, Button } from 'react-native';
import {
  useTheme,
  Appbar,
  TouchableRipple,
  Switch,
  Text,
} from 'react-native-paper';

import usePreferences from '../preferences/usePreferences';

function DarkModeSwitch(props) {
  const theme = useTheme();
  const { isThemeDark, toggleTheme } = usePreferences();
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text style={{ color: theme?.colors.text }}>Dark Mode</Text>
      {/* <TouchableRipple > */}
      <Switch
        onValueChange={() => toggleTheme()}
        color={'red'}
        value={isThemeDark}
      ></Switch>

      {/* </TouchableRipple> */}
    </View>
  );
}

// <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
//   <Text>Dark Mode</Text>
//   <Button title="test" onPress={() => { toggleTheme; console.log("e") }}>
//   </Button>
// </View >

export { DarkModeSwitch };
