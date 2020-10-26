import { useContext } from 'react';

import PreferencesContext from './context'

export default function usePreferences() {
  const { isThemeDark, setIsThemeDark } = useContext(PreferencesContext);

  const toggleTheme = () => setIsThemeDark(!isThemeDark);

  return { isThemeDark, setIsThemeDark, toggleTheme }

}