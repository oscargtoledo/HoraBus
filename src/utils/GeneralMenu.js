import React from 'react';
import { View } from 'react-native';
import {
  useTheme,
  Menu,
  Text,
  ToggleButton,
  Surface,
  Switch,
} from 'react-native-paper';
import { DarkModeSwitch } from '../utils/DarkModeSwitch';

import usePreferences from '../preferences/usePreferences';

// const MenuWindow = () => {
//   return(

//   )
// }

const GeneralMenu = () => {
  const theme = useTheme();
  const {
    isThemeDark,
    toggleTheme,
    isHidingUnselected,
    toggleHideSelected,
  } = usePreferences();

  const [visible, setVisible] = React.useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const menuButton = (
    <ToggleButton mode="contained" onPress={openMenu} icon="dots-vertical" />
  );
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={menuButton}
        statusBarHeight={60}
      >
        <DarkModeSwitch />
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text style={{ color: theme?.colors.text }}>Filter Mode</Text>
          <Switch
            onValueChange={() => toggleHideSelected()}
            color={'red'}
            value={isHidingUnselected}
          ></Switch>
        </View>
        {/* <Menu.Item onPress={() => { toggleTheme() }} title="Toggle Dark/Light theme" /> */}
      </Menu>
    </View>
  );
};

export default GeneralMenu;
