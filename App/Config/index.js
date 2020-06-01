// src/config/index.js

import config from 'react-native-config';
import AsyncStorage from '@react-native-community/async-storage';
import { GoogleSignin} from '../common'

let configs =  {
  api: {
    host: "https://www.googleapis.com/calendar/v3/",
    apiToken :"AIzaSyBrDZ2wOk_LCGD0hhjID80xiDfyGFE8zd8",
    timeout: 20000,
  }
};

const API_HOST = configs.api.host;

export {
  API_HOST
}

export default configs