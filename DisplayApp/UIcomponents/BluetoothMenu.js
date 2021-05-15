

import * as React from 'react';
import { Text, View, StyleSheet , TextInput, TouchableHighlight, TouchableOpacity} from 'react-native';
import { Component } from 'react';
import DevOptions from './DevOptions';
import { Button, Alert, AppRegistry, Picker } from 'react-native';
import RNBluetoothClassic, {BTEvents} from 'react-native-bluetooth-classic';
import RNFS from 'react-native-fs';
import {ToastAndroid } from 'react-native';
//import {createStacknavigator} from 'react-navigation';

const BT_vector = ['00:14:03:06:32:6E', '00:14:03:05:0C:4D', '00:14:03:05:F4:D8']

export default class BluetoothMenu extends Component {
    constructor(){
        super();
        this.isDeveloper='This is the OperatorPassword'
        this.state = {displayType:'Welcome',
                      input_password: '',
                      myTimeout: null,
                      maxTime: 10000,
                      calibrationNum: null,
                      weight: 0,
                      BTconnected: false,
                      BTdeviceID: '00:14:03:05:F4:D8',
                      pickerValue: 'Java'}//10 seconds timeout after no action
//                BT1: '00:14:03:06:32:6E'
//                BT2: '00:14:03:05:0C:4D'
//                BT3: '00:14:03:05:F4:D8'

    }
    // Somehow the title screen is read from navigationOptions
    //Difference of having navigations inside or outside render options?
     static navigationOptions = {
             header:null
           };
//  componentDidMount(){
//        console.warn(Orientation)
////          Orientation.lockToPortrait();
//      }
  checkUp = () => {

      RNBluetoothClassic.write('a')
      this.setState({calibrationNum: this.state.calibrationNum+500})
  }
  checkUpFiner = () => {

        RNBluetoothClassic.write('s')
        this.setState({calibrationNum: this.state.calibrationNum+50})
    }
  checkDown = () => {
        RNBluetoothClassic.write('z')
        this.setState({calibrationNum: this.state.calibrationNum-500})
  }
  checkDownFiner = () => {
          RNBluetoothClassic.write('x')
          this.setState({calibrationNum: this.state.calibrationNum-50})
    }
  saveBTID = (curID) => {
      RNFS.writeFile(RNFS.DocumentDirectoryPath + '/configBluetooth.txt', curID, 'utf8')
      ToastAndroid.show('Saved BTdeviceID: ' + curID, 50);
  }


   componentDidMount(){

        RNFS.exists(RNFS.DocumentDirectoryPath + '/configBluetooth.txt')
            .then((exists) => {
                if(exists){

                    RNFS.readFile(RNFS.DocumentDirectoryPath + '/configBluetooth.txt', 'utf8')
                         .then((result) => {this.setState({BTdeviceID: result})
                                            this.connectBT(result)})


                }
                else{
                    RNFS.appendFile(RNFS.DocumentDirectoryPath + '/configBluetooth.txt', '00:14:03:06:32:6E', 'utf8')
                    ToastAndroid.show('No file exists', 10)
                }
        })



//    console.warn(calFactor);
//    this.myTimeout = setTimeout( () => {
//                      this.props.navigation.goBack()
//                      },20000)
//     RNBluetoothClassic.disconnect();
//     RNBluetoothClassic.connect(this.state.BTdeviceID)
//           .then(() => {
//             // Success code
//             this.setState({BTconnected:true})
////             RNBluetoothClassic.write('g')
//             RNBluetoothClassic.write('h')
//             RNBluetoothClassic.write(this.state.calibrationNum.toString())
//
//
//           })
//           .catch((error) => {
//             // Failure code
//             console.warn(error);
//           });
//
//     this.onRead = RNBluetoothClassic.addListener(BTEvents.READ, (data)=>this.onReadData(data), this);
  }
  connectBT = (curID) => {
             this.setState({BTdeviceID: curID});
             RNBluetoothClassic.disconnect();
             RNBluetoothClassic.connect(curID)
               .then(() => {
                 // Success code
                 this.setState({BTconnected: true})
                 ToastAndroid.show('Bluetooth Connected!', 1500);
               })
               .catch((error) => {
                 // Failure code
                 console.warn(error);
               });
            ToastAndroid.show(curID,10)
  }
  componentWillUnmount() {
          RNBluetoothClassic.disconnect();
      }
  componentDidUpdate(prevProps, prevState, snapshot){

//    if (prevProps.data !== this.props.data) {
        clearTimeout(this.myTimeout);
        this.myTimeout = setTimeout( () => {
                              this.props.navigation.goBack()
                              },20000)
//      }

  }
  render() {
    const {navigate} = this.props.navigation;
    const {goBack} = this.props.navigation;
    displayType = this.state.paramstest;
    const connected_test = this.props.navigation.getParam('connected_test', 0);

//    const input_password = '';
    return (
    //Buttons should be placed in Views so that they can be more modular
    <View style={styles2.container}>
        <Text style={styles2.value}> Device is connected: {String(this.state.BTconnected)} </Text>
        <Text style={styles2.value}> Please press a button to tweak the calibration: {this.state.calibrationNum}</Text>
        <Text style={styles2.value}> Weight: {this.state.weight} </Text>
        <Text style={styles2.value}> BTdeviceID: {this.state.BTdeviceID} </Text>

        {/*We should blank out the buttons if bluetooth isConnected() is false*/}

            <View style={styles2.containerrow}>
            <TouchableOpacity disabled={!this.state.BTconnected} style={styles2.button}  onPress={()=> this.saveBTID(this.state.BTdeviceID)}>
                                          <Text style={{color:'white'}}>Save Settings</Text>
                                        </TouchableOpacity>
            <TouchableOpacity  style={styles2.button}  onPress={()=> this.connectBT(BT_vector[0])}>
                                          <Text style={{color:'white'}}>Device 1</Text>
                                        </TouchableOpacity>
            <TouchableOpacity  style={styles2.button}  onPress={()=> this.connectBT(BT_vector[1])}>
                                          <Text style={{color:'white'}}>Device 2</Text>
                                          </TouchableOpacity>
            <TouchableOpacity  style={styles2.button}  onPress={()=> this.connectBT(BT_vector[2])}>
                                          <Text style={{color:'white'}}>Device 3</Text>
                                          </TouchableOpacity>
          {/*  Picker has annoying asynchronous setStates
//        <Picker
//                style={{ height: 50, width: 150 }}
//                selectedValue={this.state.pickerValue}
//                key={this.state.pickerValue}
//                value={this.state.pickerValue}
//                onValueChange={(itemValue, itemIndex) => {this.setState({BTdeviceID: itemValue});
//                                                         RNBluetoothClassic.disconnect();
//                                                         RNBluetoothClassic.connect(this.state.BTdeviceID)
//                                                           .then(() => {
//                                                             // Success code
//                                                             this.setState({BTconnected: true})
//                                                             ToastAndroid.show('Bluetooth Connected!', 1500);
//                                                           })
//                                                           .catch((error) => {
//                                                             // Failure code
//                                                             console.warn(error);
//                                                           });
//                                                         this.setState({pickerValue: itemValue})
//                                                         ToastAndroid.show(this.state.pickerValue, 10);}}
//              >
//            <Picker.Item label="Device 1" value={BT_vector[0]} />
//            <Picker.Item label="Device 2" value={BT_vector[1]} />
//            <Picker.Item label="Device 3" value={BT_vector[2]} />
//        </Picker>
            */}
            <TouchableOpacity style={styles2.button}  onPress={()=> this.props.navigation.goBack()}>
                                  <Text style={{color:'white'}}>Exit</Text>
                                </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles2 = StyleSheet.create({
	container: {
		flex: 3,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF',
	},
	containerrow: {

    		flexDirection: 'row',
    		justifyContent: 'center',
    		alignItems: 'center',
    		backgroundColor: '#F5FCFF',
    	},
    containercol: {

        		flexDirection: 'column',
        		justifyContent: 'center',
        		alignItems: 'center',
        		backgroundColor: '#F5FCFF',
        	},
	title: {
		fontSize: 8,
		textAlign: 'center',
	},
	device: {
		fontSize: 18,
		textAlign: 'center',
		color: '#333333',
		marginBottom: 5,
	},
	value: {
		fontSize: 25,
		textAlign: 'center',
		fontWeight: 'bold'
//		margin: 20,
//		flexGrow:1,
	},
	button: {
    	    height: "40%",
    	    padding: 10,
    	    margin: 20,
            elevation: 10,
            width: "10%",
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'black',
//            flexDirection: 'row',
          },
});


