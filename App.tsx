import React from 'react';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {useColorScheme} from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import {IdProvider} from './src/helpers/IdContext';
import {default as theme} from './custom-theme.json';

export default function App() {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider
        {...eva}
        theme={{...eva[isDarkMode ? 'dark' : 'light'], ...theme}}>
        <IdProvider>
          <AppNavigator />
        </IdProvider>
      </ApplicationProvider>
    </>
  );
}
