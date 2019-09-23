import React, {Component} from 'react';
import {Picker, StyleSheet, Text, View, Button} from 'react-native';
import HomeScreen from './HomeScreen.js';
import DevOptions from './DevOptions';
import {RNSerialport, definitions, actions} from 'react-native-serialport';
import {DeviceEventEmitter} from 'react-native';
import GLOBAL from './Globals'


export default class ProcessArduino extends Component {
	constructor(){
		super();
//		global.weightlog = 997
		this.state = {
			data: undefined,
			devices: [],
			selectedDevice: null,
//			connected: false,
			debug: null


		};
		this.buffer = '';
	}

   

	render() {
	    const {navigate} = this.props.navigation;
	    const connected_test = this.props.navigation.getParam('connected_test', 0)
        const curWeight = this.props.navigation.getParam('curWeight', 0)
		return (
			<View style={styles.container}>
				{
//					this.state.connected ? (
						<Text style={styles.value}>{global.weightlog} {this.state.weight}</Text>
//					):(null)
				}

				{

					0===0 ? (
					    <Button
                                  title={'HomeScreen'}
                                  onPress={()=> navigate('HomeScreen', {connected_test:1})}

                             />
					):(
						<View>

							<Button title={this.state.connected?'Disconnect':'Connect!'} onPress={this.toggleConnection}></Button>
							{
								this.state.connected ? (
									<Text style={styles.device}>Selected device: {this.state.selectedDevice.name}</Text>
								):(
									<Picker
										style={{width:200}}

										selectedValue={this.state.selectedDevice}
										// console.warn(selectedValue);
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
		fontSize: 12,
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
