import Constants from 'expo-constants';
import { Platform } from 'react-native';

let API_URL;

const releaseChannel = Constants.manifest.releaseChannel;

if (Platform.OS == 'web') {
  API_URL = 'https://buschedule-api.herokuapp.com';
} else {
  if (releaseChannel === undefined) {
    API_URL = process.env.API_URL;
  } else if (releaseChannel.indexOf('production') !== -1) {
    API_URL = process.env.PRODUCTION_API_URL;
  }
}

export default {
  API_URL,
};
