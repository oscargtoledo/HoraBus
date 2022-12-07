import Constants from 'expo-constants';
import { Platform } from 'react-native';

import {
  API_URL as ENV_API_URL,
  PRODUCTION_API_URL as ENV_PRODUCTION_API_URL,
  TIMEOUT as ENV_TIMEOUT
} from '@env';


let API_URL;
let TIMEOUT = ENV_TIMEOUT;

const releaseChannel = Constants.manifest.releaseChannel;

if (Platform.OS == 'web') {
  API_URL = 'https://horabus-api.onrender.com';
  // API_URL = 'http://localhost:8080';
} else {
  if (releaseChannel === undefined) {
    API_URL = ENV_API_URL;
  } else if (releaseChannel.indexOf('production') !== -1) {
    API_URL = ENV_PRODUCTION_API_URL;
  }
}


export default {
  API_URL,
  TIMEOUT
};
