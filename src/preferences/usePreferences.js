import { useContext } from 'react';

import PreferencesContext from './context';

export default function usePreferences() {
  const {
    isThemeDark,
    setIsThemeDark,
    isHidingUnselected,
    setHideUnselected,
  } = useContext(PreferencesContext);

  const toggleTheme = () => setIsThemeDark(!isThemeDark);
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
