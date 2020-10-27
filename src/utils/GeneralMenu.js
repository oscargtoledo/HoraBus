import React from 'react';
import { View } from 'react-native';
import { useTheme, Menu, Text, ToggleButton } from 'react-native-paper';
import { DarkModeSwitch } from '../utils/DarkModeSwitch'

import usePreferences from '../preferences/usePreferences';


// const MenuWindow = () => {
//   return(

//   )
// }

const GeneralMenu = () => {
  const theme = useTheme();
  const { isThemeDark, toggleTheme } = usePreferences();

  const [visible, setVisible] = React.useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const menuButton = <ToggleButton mode="contained" onPress={openMenu} icon="dots-vertical" />
  return (
    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>

      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={menuButton}
        statusBarHeight={60}>
        {/* <Menu.Item onPress={() => { toggleTheme() }} title="Toggle Dark/Light theme" /> */}
        <DarkModeSwitch />
      </Menu>

    </View>
  )

}

export default GeneralMenu;
