import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import {
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
} from 'react-native-paper';
const CombinedDefaultTheme = {
  ...PaperDefaultTheme,
  ...NavigationDefaultTheme,
  // roundness: 10,
  dark: false,
  colors: {
    ...PaperDefaultTheme.colors,
    ...NavigationDefaultTheme.colors,
    primary: '#01579b',
    primaryDark: '#002f6c',
    primaryLight: '#4f83cc',
    background: '#01579b',
    accent: '#0091ea',
    columnAccent: '#5390E0',
    surface: '#01457A',
    card: '#224C6B',
    text: '#ffffff',
    onSurface: '#01579b',
  },
};
const CombinedDarkTheme = {
  ...PaperDarkTheme,
  ...NavigationDarkTheme,
  dark: true,
  mode: 'adaptative',
  colors: {
    ...PaperDarkTheme.colors,
    ...NavigationDarkTheme.colors,
    background: '#121212',
    accent: '#6d6d6d',
    primary: '#212121',
    columnAccent: '#6b6b6b',
    primary: '#424242',
    primaryLight: '#6b6b6b',
    onSurface: '#212121',
  },
};

export { CombinedDarkTheme, CombinedDefaultTheme };
