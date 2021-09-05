import { useContext } from 'react';

import PreferencesContext from './context';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function usePreferences() {
  const { isThemeDark, setIsThemeDark, isHidingUnselected, setHideUnselected } =
    useContext(PreferencesContext);

  const storeDarkThemeInfo = async () => {
    try {
      const jsonValue = JSON.stringify(!isThemeDark);
      console.log(jsonValue);
      await AsyncStorage.setItem('darkTheme', jsonValue);
    } catch (e) {
      console.log(e);
    }
  };
  const toggleTheme = () => {
    storeDarkThemeInfo();
    setIsThemeDark(!isThemeDark);
  };
  const toggleHideSelected = () => setHideUnselected(!isHidingUnselected);

  return {
    isThemeDark,
    setIsThemeDark,
    toggleTheme,
    isHidingUnselected,
    setHideUnselected,
    toggleHideSelected,
  };
}
