/**
 * @format
 */

import * as React from 'react';
import {AppRegistry} from 'react-native';
import { PaperProvider, MD3LightTheme } from 'react-native-paper';
import {RealmProvider} from '@realm/react';
import App from './App';
import {name as appName} from './app.json';

import { CurrentTask } from './models/Tasks'


export default function Main() {
    return (
      <RealmProvider 
        deleteRealmIfMigrationNeeded={true}  // Только для разработки! Чтобы не создавать миграции
      schema={[CurrentTask]}
      >
        <PaperProvider theme={MD3LightTheme}>
          <App />
        </PaperProvider>
        </RealmProvider>
    );
  }
  
AppRegistry.registerComponent(appName, () => Main);
