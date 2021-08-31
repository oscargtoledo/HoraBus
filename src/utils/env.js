import Constants from 'expo-constants';
import { Platform } from 'react-native';
import {
  API_URL as envAPI_URL,
  PRODUCTION_API_URL as envPROD_API_URL,
} from '@env';

let API_URL;

const releaseChannel = Constants.manifest.releaseChannel;

if (Platform.OS == 'web') {
  API_URL = 'https://buschedule-api.herokuapp.com';
} else {
  if (releaseChannel === undefined) {
    API_URL = envAPI_URL;
  } else if (releaseChannel.indexOf('production') !== -1) {
    API_URL = envPROD_API_URL;
  }
}

console.log('Current API url = ' + API_URL);
// API_URL = 'http://192.168.0.14:8080';
export default {
  API_URL,
};
