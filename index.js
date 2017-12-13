import { AppRegistry } from 'react-native';
import App from './app/index.js';

// register root app component
AppRegistry.registerComponent('resume_recruiter', () => App);

// this line is required for expo
AppRegistry.registerComponent('main', () => App);
