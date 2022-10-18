import React from 'react'
import 'react-native-gesture-handler';
import Router from './src/router/Router';
import SplashScreen from 'react-native-splash-screen';

export default function App() {
  React.useEffect(() => {
    SplashScreen.hide();
  })
  return (
    <Router/>
  )
}
