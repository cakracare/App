import React from 'react';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import AppNavigator from './src/navigation/AppNavigator';
import {IdProvider} from "./src/helpers/IdContext.tsx";


export default function App() {
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
       <IdProvider>
           <AppNavigator />
       </IdProvider>
      </ApplicationProvider>
    </>
  );
}