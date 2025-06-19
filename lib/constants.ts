import { Platform } from 'react-native';
import Constants from 'expo-constants';

// Détection de l'environnement
const isRunningInExpoGo = Constants.expoVersion != null;
const isDevelopment = __DEV__;

// URLs selon l'environnement
const DEVELOPMENT_API_URL = "http://88.198.150.195:8613";
const DEVELOPMENT_SOCKET_URL = "http://88.198.150.195:8614";

// Pour APK, on peut avoir besoin d'URLs différentes
const PRODUCTION_API_URL = "http://88.198.150.195:8613";
const PRODUCTION_SOCKET_URL = "http://88.198.150.195:8614";

// URLs finales
export const API_URL = isDevelopment ? DEVELOPMENT_API_URL : PRODUCTION_API_URL;
export const API_SOCKET_URL = isDevelopment ? DEVELOPMENT_SOCKET_URL : PRODUCTION_SOCKET_URL;
export const PROJECT_ID = "81997082-7e88-464a-9af1-b790fdd454f8";

// Debug information
export const DEBUG_INFO = {
  isRunningInExpoGo,
  isDevelopment,
  platform: Platform.OS,
  apiUrl: API_URL,
  socketUrl: API_SOCKET_URL,
  expoVersion: Constants.expoVersion,
  manifestURL: Constants.manifest?.developer?.projectRoot,
};

// Fonction pour afficher les infos de debug
export const logNetworkInfo = () => {
  console.log('=== NETWORK DEBUG INFO ===');
  console.log('Environment:', isDevelopment ? 'DEVELOPMENT' : 'PRODUCTION');
  console.log('Platform:', Platform.OS);
  console.log('Expo Go:', isRunningInExpoGo);
  console.log('API URL:', API_URL);
  console.log('Socket URL:', API_SOCKET_URL);
  console.log('==========================');
};