import React, {Component} from 'react';
import {Picker, StyleSheet, Text, View, Button, StatusBar} from 'react-native';
import HomeScreen from './UIcomponents/HomeScreen';
import DevOptions from './UIcomponents/DevOptions';
import OperatorPassword from './UIcomponents/OperatorPassword';
import OperatorComment from './UIcomponents/OperatorComment';
import ProcessArduino2 from './UIcomponents/ProcessArduino2';
import {RNSerialport, definitions, actions} from 'react-native-serialport';
import {DeviceEventEmitter} from 'react-native';
import GLOBALS from './UIcomponents/Globals';
//At the moment, react-native-wakeup-screen does not work
// import wakeUpApp from 'react-native-wakeup-screen';
import {createAppContainer, createStackNavigator, createSwitchNavigator} from 'react-navigation';
import {PermissionsAndroid} from 'react-native';
import {requestAppPermissions} from './UIcomponents/requestAppPermissions'
import ExportGoogleSheets from './UIcomponents/ExportGoogleSheets'
import TestGETForm from './UIcomponents/TestGETForm'
const MainNavigator = createStackNavigator({
            HomeScreen,DevOptions, ProcessArduino2, OperatorPassword, OperatorComment},
            //Start the application on the HomeScreen
            {initialRouteName: 'HomeScreen'})
AppContainer = createAppContainer(MainNavigator);

//Temporary attempt to accesss Arduino data

export default class App extends Component{
    constructor(){
		super();
		this.state = {
			data: undefined,
			devices: [],
			selectedDevice: null,
			connected: false,
			debug: null


		};
		this.buffer = '';
	}
	///Keeping this super light weight. Helper functions to ask for permissions
	async componentDidMount(){
	    StatusBar.setHidden(true);
	    requestAppPermissions();
	}

    render(){

        return (
                    //<TestGETForm/>
//                    <Text> yup </Text>
                   <AppContainer/>
                   ///clientid: 819216036500-mtq03qrsu1l3aolhnvs3m9d7ilavc38r.apps.googleusercontent.com
                   //clientsecret:YxZSHsOrabCfmlN7zvRXSO2F
            )
        }


}
