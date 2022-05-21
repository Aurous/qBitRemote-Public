import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import * as SecureStore from 'expo-secure-store';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppContext from './global/AppContext.tsx';

import useCachedResources from './hooks/useCachedResources.ts';
import useColorScheme from './hooks/useColorScheme.ts';
import Navigation from './navigation/index.tsx';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const [loading, setLoading] = useState(true);

  const [host, setHost] = useState('');
  const [port, setPort] = useState();
  const [ssl, setSsl] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('Remote');

  async function getValueFor() {
    setHost(await SecureStore.getItemAsync('host'));
    setPort(await SecureStore.getItemAsync('port'));
    setUsername(await SecureStore.getItemAsync('username'));
    setPassword(await SecureStore.getItemAsync('passwordRes'));
    setSsl(await SecureStore.getItemAsync('ssl'));
    setLoading(false);
  }

  getValueFor();

  const userSettings = {
    host,
    port,
    ssl,
    username,
    nickname,
    password,
    setHost,
    setPort,
    setSsl,
    setUsername,
    setPassword,
    setNickname,
  };

  if (!loading && isLoadingComplete) {
    return (
      <AppContext.Provider value={userSettings}>

      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
      </AppContext.Provider>
    );
  }

  return null;
}
