
import React, {Component} from 'react';
import {Picker, StyleSheet, Text, View, Button} from 'react-native';
import HomeScreen from './HomeScreen'; //Imports should be without the curly braces for some reason for local imports
import DevOptions from './DevOptions';
import ProcessArduino from './ProcessArduino';
import {RNSerialport, definitions, actions} from 'react-native-serialport';
import {DeviceEventEmitter} from 'react-native';
// import wakeUpApp from 'react-native-wakeup-screen';
import {createAppContainer, createStackNavigator, createSwitchNavigator} from 'react-navigation';

export default MainNavigation{
//Need a main StackNavigator so that the screens can communicate with each other
    const MainNavigator = createSwitchNavigator(


                //Initialize the screens into the variable space in this main stack navigator
                {
                    HomeScreen,DevOptions, ProcessArduino2

                },
                //Start the application on the HomeScreen
                {initialRouteName: 'DevOptions'}

    );

    //Whatever this does
    const MainNavigation = createAppContainer(MainNavigator);
}