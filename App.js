// ./App.js
require('dotenv').config();
require('fs');
import { NavigationContainer } from '@react-navigation/native';
import {
  Title,
  Paragraph,
  Provider as PaperProvider,
  Button,
  Divider,
} from 'react-native-paper';
import React, { useEffect, Suspense, lazy } from 'react';
import {
  CombinedDarkTheme,
  CombinedDefaultTheme,
} from './src/utils/themeConfig';

import PreferencesContext from './src/preferences/context';
import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as serviceWorkerRegistration from './src/serviceWorkerRegistration';

const linking = {
  prefixes: ['https://horabus.netlify.app', 'horabus://'],
  config: {
    screens: {
      NotFound: '*',
      Twitter: {
        path: 'Twitter',
        screens: {
          Tweets: '',
        },
      },
      Contact: '',
      Horaris: {
        path: 'Horaris',
        screens: {
          Tots: '',
          Horari: {
            // initialRouteName: 'Horaris',
            path: '/:routeId',
          },
        },
      },
    },
  },
};
import TabNavigator from './src/navigation/TabNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Modal, Portal, Text } from 'react-native-paper';

function App() {
  const [isThemeDark, setIsThemeDark] = React.useState(false);
  const [isHidingUnselected, setHideUnselected] = React.useState(false);
  const [showingFirstInfo, setShowFirstInfo] = React.useState(false);

  const theme = isThemeDark ? CombinedDarkTheme : CombinedDefaultTheme;

  const hideWelcomeModal = () => {
    setShowFirstInfo(false);
    AsyncStorage.setItem('showWelcome', false);
  };
  useEffect(() => {
    const getDarkTheme = async () => {
      try {
        const value = await AsyncStorage.getItem('darkTheme');
        // console.log(JSON.parse(value));
        return JSON.parse(value);
      } catch (e) {
        console.log('Error reading dark theme value');
      }
    };
    const getShowWelcome = async () => {
      try {
        const value = await AsyncStorage.getItem('showWelcome');
        return JSON.parse(value);
      } catch (e) {
        console.log('Error reading show welcome value');
      }
    };
    getDarkTheme().then(value => {
      if (value != null) setIsThemeDark(value);
    });
    getShowWelcome().then(value => {
      if (value != null) setShowFirstInfo(value);
      else setShowFirstInfo(true);
    });
  }, []);
  return (
    <SafeAreaProvider>
      <PreferencesContext.Provider
        value={{
          isThemeDark,
          setIsThemeDark,
          isHidingUnselected,
          setHideUnselected,
        }}
      >
        <PaperProvider theme={theme}>
          <NavigationContainer theme={theme} linking={linking}>
            <Suspense fallback={<div>Loading</div>}>
              <Portal>
                <Modal
                  visible={showingFirstInfo}
                  onDismiss={hideWelcomeModal}
                  contentContainerStyle={{
                    shadowOpacity: 0,
                    height: '80%',
                    width: '80%',
                    alignSelf: 'center',
                    alignContent: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '10%',
                    backgroundColor: theme?.colors.accent,
                    borderRadius: 30,
                  }}
                >
                  <Title>Ei!</Title>
                  <Divider style={{ height: 30 }} />
                  <Paragraph>
                    Aquesta aplicació encara és molt jove, i per tant és
                    possible que hi hagi errors. {'\n'}
                    {'\n'}Com que no tenim cap relació amb Busos Plana, els nous
                    horaris poden trigar uns dies a estar-hi.{'\n'}
                    {'\n'}Per qualsevol cosa, es pot contactar directament amb
                    mi a l'apartat de Contacte.
                    {'\n'}
                    {'\n'}
                    {'\n'}Espero que et sigui útil!
                  </Paragraph>
                  <Button mode="contained" onPress={hideWelcomeModal}>
                    OK!
                  </Button>
                </Modal>
              </Portal>
              <TabNavigator />
            </Suspense>
          </NavigationContainer>
        </PaperProvider>
      </PreferencesContext.Provider>
    </SafeAreaProvider>
  );
}
let deferredPrompt;
window.addEventListener('beforeinstallprompt', e => {
  // Prevent the mini-infobar from appearing on mobile
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
  // Update UI notify the user they can install the PWA
  showInstallPromotion();
  // Optionally, send analytics event that PWA install promo was shown.
  console.log(`'beforeinstallprompt' event was fired.`);
});
serviceWorkerRegistration.register();

export default App;
