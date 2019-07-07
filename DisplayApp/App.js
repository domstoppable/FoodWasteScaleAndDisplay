import React, {Component} from 'react';
import {Picker, StyleSheet, Text, View, Button} from 'react-native';

import {RNSerialport} from 'react-native-serialport';
import {DeviceEventEmitter} from 'react-native';
import wakeUpApp from 'react-native-wakeup-screen';

export default class App extends Component {
	constructor(){
		super();
		this.state = {
			data: undefined,
			devices: [],
			selectedDevice: undefined,
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
		}else{
			let deviceName = this.state.selectedDevice.name;
			let baudRate = 9600;

			RNSerialport.connectDevice(deviceName, baudRate);
		}
	}

	onUsbAttached = ()=>{
		this.getDeviceList();
	}
	onUsbDetached = ()=>{
		console.log('Usb Detached');
	}
	onUsbNotSupperted = ()=>{
		console.log('Usb not supported');
	}
	onError(error) {
		console.log('Code: ' + error.errorCode + ' Message: ' +error.errorMessage)
	}
	onConnectedDevice = ()=>{
		console.log('Connected');
		this.setState({connected:true});
	}
	onDisconnectedDevice = ()=>{
		console.log('Disconnected');
		this.setState({connected:false});
	}
	onServiceStarted = ()=>{
		console.log('Service started');
		this.getDeviceList();
	}
	onServiceStopped = ()=>{
		console.log('Service stopped');
	}

	onReadData = (data)=>{
		data = data.payload;
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
		if(data[0] === 'w'){
			this.setState({weight: this.buffer.substring(1)});
		}else if(data[0] === 'm'){
			wakeUpApp();
		}else{
			this.setState({weight: this.buffer});
		}
	}

	getDeviceList = ()=>{
		RNSerialport.getDeviceList((response) => {
			if(!response.status) {
				alert('Code: ' + response.errorCode + ' Message: ' +response.errorMessage);
				return;
			}
			this.setState({devices:response.devices});
			if(!Boolean(this.state.selectedDevice)){
				this.setState({selectedDevice:response.devices[0]});
				if(!this.state.connected){
					this.toggleConnection();
				}
			}
		});
	}

	componentDidMount() {
		DeviceEventEmitter.addListener('onServiceStarted', this.onServiceStarted, this);
		DeviceEventEmitter.addListener('onServiceStopped', this.onServiceStoppe,this);
		DeviceEventEmitter.addListener('onDeviceAttached', this.onUsbAttached, this);
		DeviceEventEmitter.addListener('onDeviceDetached', this.onUsbDetached, this);
		DeviceEventEmitter.addListener('onDeviceNotSupported', this.onUsbNotSupperted, this);
		DeviceEventEmitter.addListener('onError', this.onError, this);
		DeviceEventEmitter.addListener('onConnected', this.onConnectedDevice, this);
		DeviceEventEmitter.addListener('onDisconnected', this.onDisconnectedDevice, this);

		DeviceEventEmitter.addListener('onReadDataFromPort', (data)=>this.onReadData(data), this);

		//Added listeners
		RNSerialport.setAutoConnect(false);
		RNSerialport.startUsbService();
	}

	componentWillUnmount() {
		DeviceEventEmitter.removeAllListeners();
	}

	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.title}>Food Waste Scale</Text>
				{
					this.state.connected ? (
						<Text style={styles.value}>{this.state.weight}</Text>
					):(null)
				}
				{
					this.state.devices.length === 0 ? (
						<Text>No devices found :(</Text>
					):(
						<View>
							<Button title={this.state.connected?'Disconnect':'Connect'} onPress={this.toggleConnection}></Button>
							{
								this.state.connected ? (
									<Text style={styles.device}>Selected device: {this.state.selectedDevice.name}</Text>
								):(
									<Picker
										style={{width:200}}
										selectedValue={this.state.selectedDevice}
										onValueChange={(itemValue, itemIndex) => this.pickDevice(itemValue)}
									>
										{
											this.state.devices.map((device, idx) => {
												return <Picker.Item key={idx} label={device.name} value={device} />
											})
										}
									</Picker>
								)
							}
						</View>
					)
				}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF',
	},
	title: {
		fontSize: 48,
		textAlign: 'center',
	},
	device: {
		fontSize: 18,
		textAlign: 'center',
		color: '#333333',
		marginBottom: 5,
	},
	value: {
		fontSize: 100,
		textAlign: 'center',
		margin: 10,
		flexGrow:1,
	},
});
