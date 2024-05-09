/**
 * @format
 */

import * as React from 'react';
import {AppRegistry} from 'react-native';
import { PaperProvider, MD3LightTheme } from 'react-native-paper';
import App from './App';
import {name as appName} from './app.json';


export default function Main() {
    return (
      <PaperProvider theme={MD3LightTheme}>
        <App />
      </PaperProvider>
    );
  }
  
AppRegistry.registerComponent(appName, () => Main);
