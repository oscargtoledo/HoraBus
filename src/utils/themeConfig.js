import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import {
  MD3DarkTheme as PaperDarkTheme,
  MD3LightTheme as PaperDefaultTheme,
  adaptNavigationTheme
} from 'react-native-paper';
const CombinedDefaultTheme = {
  ...PaperDefaultTheme,
  // ...NavigationDefaultTheme,
  ...adaptNavigationTheme({reactNaivgationLight: NavigationDefaultTheme, reactNavigationDark: NavigationDarkTheme}),
  // roundness: 10,
  dark: false,
  colors: {
    // ...PaperDefaultTheme.colors,
    // ...NavigationDefaultTheme.colors,
    primary: '#01579b',
    primaryDark: '#002f6c',
    primaryLight: '#4f83cc',
    background: '#01457A',
    accent: '#0091ea',
    columnAccent: '#5390E0',
    surface: '#016AB5',
    card: '#224C6B',
    text: '#ffffff',
    onSurface: '#01579b',
    icons: '#80ABCD',
  },
};
const CombinedDarkTheme = {
  ...PaperDarkTheme,
  // ...NavigationDarkTheme,
  ...adaptNavigationTheme({reactNavigationDark: NavigationDarkTheme}),
  dark: true,
  mode: 'adaptative',
  colors: {
    // ...PaperDarkTheme.colors,
    // ...NavigationDarkTheme.colors,
    primary: '#424242',
    primaryLight: '#6b6b6b',
    background: '#1E1E1E',
    accent: '#6d6d6d',
    columnAccent: '#6b6b6b',
    surface: "#515151",
    onSurface: '#212121',
    icons: '#A1A1A1',
  },
};

export { CombinedDarkTheme, CombinedDefaultTheme };
