import React from 'react';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {useColorScheme} from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import {UserProvider} from "./src/helpers/userContext.tsx";
import { default as mapping } from './mapping.json'

export default function App() {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} customMapping={mapping} theme={eva.light}>
       <UserProvider >
           <AppNavigator />
       </UserProvider>
      </ApplicationProvider>
    </>
  );
}