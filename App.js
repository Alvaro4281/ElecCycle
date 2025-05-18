import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import MainNavigator from './src/navigation/MainNavigator';
import { StatusBar } from 'react-native';
import { COLORS } from './src/constants/theme';

const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />
        <MainNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;