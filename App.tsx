/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { FC } from 'react';
import AppStack from './src/navigations/appstack';

const App:FC = () => {
  return (
    <>
      <AppStack />
    </>
  );
};

export default App;
