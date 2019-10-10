/**
 * @format
 */
//
import {AppRegistry} from 'react-native';
import App from './App';
import HomeScreen from './UIcomponents/HomeScreen'
import DevOptions from './UIcomponents/DevOptions'
//import ProcessArduino from './UIcomponents/ProcessArduino'
import ProcessArduino2 from './UIcomponents/ProcessArduino2'
//import MainNavigation from './UIcomponents/MainNavigation'
import {name as appName} from './app.json';
import './UIcomponents/Globals'
AppRegistry.registerComponent(appName, () => App);
global.weightlog = 996
// import React, { Component } from 'react';
// import { Text, View } from 'react-native';

// export default class HelloWorldApp extends Component {
  // render() {
    // return (
      // <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        // <Text>Hello, world!</Text>
      // </View>
    // );
  // }
// }
