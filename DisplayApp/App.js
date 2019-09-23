import React, {Component} from 'react';
import {Picker, StyleSheet, Text, View, Button} from 'react-native';
import HomeScreen from './UIcomponents/HomeScreen';
import DevOptions from './UIcomponents/DevOptions';
import ProcessArduino from './UIcomponents/ProcessArduino';
//import MainNavigation from './UIcomponents/MainNavigation';
import {RNSerialport, definitions, actions} from 'react-native-serialport';
import {DeviceEventEmitter} from 'react-native';
import GLOBALS from './UIcomponents/Globals'
//At the moment, react-native-wakeup-screen does not work
// import wakeUpApp from 'react-native-wakeup-screen';
import {createAppContainer, createStackNavigator, createSwitchNavigator} from 'react-navigation';
const MainNavigator = createSwitchNavigator({
            HomeScreen,DevOptions, ProcessArduino},
            //Start the application on the HomeScreen
            {initialRouteName: 'DevOptions'})

AppContainer = createAppContainer(MainNavigator);

//Temporary attempt to accesss Arduino data
class SecondActivity extends Component
{
 static navigationOptions =
 {
    title: 'SecondActivity',
 };

 render()
 {
    return(
       <View style = { styles.MainContainer }>

          <Text style = { styles.textStyle }> {global.SampleVar} </Text>

       </View>
    );
 }
}
export default class App extends Component{
constructor(){
		super();
//		global.weightlog = 998;
		this.state = {
			data: undefined,
			devices: [],
			selectedDevice: null,
			connected: false,
			debug: null


		};
		this.buffer = '';
	}

    pickDevice = (device)=>{
    		if(device){
    			this.setState({selectedDevice:device});
    		}
    }

    toggleConnection = ()=>{
        if(this.state.connected){
            RNSerialport.disconnect();
            this.setState({connected:false});
        }else{
            let deviceName = this.state.selectedDevice.name;
            let baudRate = 9600;
            this.setState({connected:true});
//			console.warn('Setting up connection');
//			console.warn(deviceName);
            RNSerialport.connectDevice(deviceName, baudRate);
        }
    }

    onUsbAttached = ()=>{
//		console.warn('USB attached');
        this.getDeviceList();
    }
    onUsbDetached = ()=>{
//		console.warn('Usb Detached');
    }
    onUsbNotSupported = ()=>{
//		console.warn('Usb not supported');
    }
    onError(error) {
        console.warn('Code: ' + error.errorCode + ' Message: ' +error.errorMessage)
    }
    onConnectedDevice = ()=>{
//		console.warn('Connected');

        this.setState({connected:true});
    }
    onDisconnectedDevice = ()=>{
//		console.warn('Disconnected');
        this.setState({connected:false});
    }
    onServiceStarted = ()=>{
//		console.warn('Service started');
        this.getDeviceList();
    }
    onServiceStopped = ()=>{
//		console.warn('Service stopped');
    }

    onReadData = (data)=>{
        data = data.payload;
//		console.warn('reading data!!!');
        for(let i=0; i<data.length; i++){
            let character = String.fromCharCode(data[i]);
            if(character === '\n' || character === '\r'){
                if(this.buffer !== ''){
                    this.processData(this.buffer);
                }
                this.buffer = '';
            }else{
                this.buffer += character;
            }
        }
    }

    processData = (data)=>{
//		console.log('processing data');
        if(data[0] === 'w'){
            this.setState({weight: this.buffer.substring(1)});
//			console.log('proper weight');
//			console.warn(this.state.weight);
//            GLOBAL.COLOR.WEIGHT = this.state.weight;
            global.weightlog = this.state.weight;
//            console.warn(global.weightlog)
//			console.log('recorded proper weight');
        }else if(data[0] === 'm'){
            console.warn('test');//wakeUpApp();
        }else{
            // this.setState({weight: this.buffer});

//			console.warn('buffered set');
//			console.warn(this.state.weight);
        }
    }

    getDeviceList = ()=>{
//		console.warn('Getting device list');
        // RNSerialport.connectDevice('COM8', 9600);
        // this.setState({devices:'COM8'});
        // this.setState({selectedDevice:'COM8'});
        // console.warn(this.state.devices.length);
        RNSerialport.getDeviceList(response => {
//			console.warn(response);
            if(!response.status) {
//				console.warn(response);
//				console.warn(response.devices);
                alert('Code: ' + response.errorCode + ' Message: ' +response.errorMessage);
                return;
            }

            // console.warn('test');
            this.setState({devices:response.devices});
//			console.warn(this.state.selectedDevice);
            this.setState({selectedDevice:response.devices[0]});
            this.toggleConnection();
            if(!Boolean(this.state.selectedDevice)){
                this.setState({selectedDevice:response.devices[0]});
                if(!this.state.connected){
                    this.toggleConnection();
                }
            }
        });
    }
    ///It initializes by adding listeners. But it seems like DeviceEventEmitter is not even noticing detached devices
    ///Maybe it's listening to the wrong thing
    componentDidMount() {

            DeviceEventEmitter.addListener('onServiceStarted', this.onServiceStarted, this);
            DeviceEventEmitter.addListener('onServiceStopped', this.onServiceStopped,this);
            DeviceEventEmitter.addListener('onDeviceAttached', this.onUsbAttached, this);
            DeviceEventEmitter.addListener('onDeviceDetached', this.onUsbDetached, this);
            DeviceEventEmitter.addListener('onDeviceNotSupported', this.onUsbNotSupported, this);
            DeviceEventEmitter.addListener('onError', this.onError, this);
            DeviceEventEmitter.addListener('onConnected', this.onConnectedDevice, this);
            DeviceEventEmitter.addListener('onDisconnected', this.onDisconnectedDevice, this);

            DeviceEventEmitter.addListener('onReadDataFromPort', (data)=>this.onReadData(data), this);
            // DeviceEventEmitter.addListener(actions.ON_SERVICE_STARTED, this.onServiceStarted,this);
            // DeviceEventEmitter.addListener(actions.ON_SERVICE_STOPPED, this.onServiceStoppe,this);
            // DeviceEventEmitter.addListener(actions.ON_DEVICE_ATTACHED, this.onUsbAttached,this);
            // DeviceEventEmitter.addListener(actions.ON_DEVICE_DETACHED, this.onUsbDetached,this);
            // DeviceEventEmitter.addListener(actions.ON_CONNECTED, this.onConnectedDevice,this);
            // DeviceEventEmitter.addListener(actions.ON_DISCONNECTED, this.onDisconnectedDevice,this);
    //		console.warn('i AM CONNECTED THROUGH WIFI I AM RETARDED');
            console.warn('T_T AYYAYAYAAA');
            console.warn(GLOBALS.COLOR.ORANGE)
            // Added listeners
             RNSerialport.setAutoConnect(false);
             RNSerialport.startUsbService();

    }

    componentWillUnmount() {
        DeviceEventEmitter.removeAllListeners();
        RNSerialport.stopUsbService();
    }

    render(){

        return (

                //Using another project's app format (Michael Housworth)

//                    <AppContainer/>
                <View>
                				{
                						<Text>{global.weightlog} {this.state.weight}</Text>

                				}
                </View>

                ///Can I nest the modules in one view? Would it intelligently stack them?

//                    <ProcessArduino name="huhh"/>


            )
        }


}
