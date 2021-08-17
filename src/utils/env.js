import Constants from 'expo-constants';

let API_URL;

const releaseChannel = Constants.manifest.releaseChannel;

if (releaseChannel === undefined) {
  API_URL = process.env.API_URL;
} else if (releaseChannel.indexOf('production') !== -1) {
  API_URL = process.env.PRODUCTION_API_URL;
}

// API_URL = 'https://buschedule-api.herokuapp.com';

export default {
  API_URL,
};
