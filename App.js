// ./App.js
// require('dotenv').config();
// require('fs');
import * as serviceWorkerRegistration from './src/serviceWorkerRegistration';
import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider, Text, Portal, Modal, Title, Divider, Paragraph,Button,Snackbar } from 'react-native-paper';
import PreferencesContext from './src/preferences/context';
import TabNavigator from './src/navigation/TabNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  CombinedDarkTheme,
  CombinedDefaultTheme,
} from './src/utils/themeConfig';

// import PreferencesContext from './src/preferences/context';
// import { Analytics, PageHit } from 'expo-analytics';
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
// import TabNavigator from './src/navigation/TabNavigator';
// import { SafeAreaProvider } from 'react-native-safe-area-context';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { Modal, Portal, Text } from 'react-native-paper';


// const analytics = new Analytics('UA-207649929-1', null, { debug: true })

function App() {
  const [isThemeDark, setIsThemeDark] = React.useState(false);
  const [isHidingUnselected, setHideUnselected] = React.useState(false);
  const [showingFirstInfo, setShowFirstInfo] = React.useState(false);
  const [showReload, setShowReload] = React.useState(false);
  const [waitingWorker, setWaitingWorker] = React.useState(null);

  const theme = isThemeDark ? CombinedDarkTheme : CombinedDefaultTheme;

  const hideWelcomeModal = () => {
    setShowFirstInfo(false);
    AsyncStorage.setItem('showWelcome', false);
  };

  const onSWUpdate = registration => {
    console.log('updateLogged');
    setShowReload(true);
    setWaitingWorker(registration.waiting);
  };

  const onCacheSuccess = () => {
    console.log('Web is cached');
  };

  const reloadPage = () => {
    waitingWorker?.postMessage({ type: 'SKIP_WAITING' });
    setShowReload(false);
    window.location.reload(true);
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
    serviceWorkerRegistration.register({
      onUpdate: onSWUpdate,
      onSuccess: onCacheSuccess,
    });
    // analytics.hit(new PageHit('Home')).then(() => {console.log("Success")}).catch((e) => {console.log(e)})
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
                  Aquesta aplicació encara és molt jove, i per tant és possible
                  que hi hagi errors. {'\n'}
                  {'\n'}Com que no tenim cap relació amb Busos Plana, els nous
                  horaris poden trigar uns dies a estar-hi.{'\n'}
                  {'\n'}Per qualsevol cosa, es pot contactar directament amb mi
                  a l'apartat de Contacte.
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
            <Snackbar
              visible={showReload}
              duration={200000}
              onDismiss={reloadPage}
              action={{
                label: 'Recarregar',
              }}
              wrapperStyle={{
                height: window.innerHeight,
              }}
            >
              <Text>
                Hi ha una versió nova, clica el botó per a recarregar l'app
              </Text>
            </Snackbar>
          </NavigationContainer>
        </PaperProvider>
      </PreferencesContext.Provider>
    </SafeAreaProvider>

  );
}

const showInstallPromotion = () => {
  console.log('Can install app.');
};

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

export default App;
