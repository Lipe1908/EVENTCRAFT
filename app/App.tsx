
import React, { useEffect } from 'react';
import {GluestackUIProvider} from '@gluestack-ui/themed';
import {config} from '@gluestack-ui/config';

import StartNavigator from './res/screen/navigator';
import LoginScreen from './res/screen/Log-page/LoginScreen';
import { Platform } from 'react-native';
import SplashScreen from 'react-native-splash-screen';

export default function App() {

  useEffect(()=> {
    if(Platform.OS === 'android')
    SplashScreen.hide();
   },[]);
   
  return (
    <GluestackUIProvider config={config}>
      <StartNavigator/>
    </GluestackUIProvider>
  );
};

