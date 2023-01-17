import Constants from 'expo-constants';
import { Platform } from 'react-native';
import {
  API_URL as envAPI_URL,
  PRODUCTION_API_URL as envPROD_API_URL,
  TIMEOUT as envTIMEOUT
} from '@env';


let API_URL;

const releaseChannel = Constants.manifest.releaseChannel;

if (Platform.OS == 'web') {
  // API_URL = 'https://horabus-api.onrender.com';
  // API_URL = 'http://localhost:8080';
  API_URL = envAPI_URL;
} else {
  if (releaseChannel === undefined) {
    API_URL = envAPI_URL;
  } else if (releaseChannel.indexOf('production') !== -1) {
    API_URL = envPROD_API_URL;
  }
}


export default {
  API_URL,
  envTIMEOUT
};
