

import * as React from 'react';
import { Text, View, StyleSheet , TextInput, TouchableHighlight, TouchableOpacity} from 'react-native';
import { Component } from 'react';
import DevOptions from './DevOptions';
import { Button, Alert, AppRegistry } from 'react-native';
import RNBluetoothClassic, {BTEvents} from 'react-native-bluetooth-classic';
import RNFS from 'react-native-fs';
import {ToastAndroid } from 'react-native';
//import {createStacknavigator} from 'react-navigation';


export default class CalibrationMenu extends Component {
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
                      BTdeviceID: '00:14:03:06:32:6E'}//10 seconds timeout after no action
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
  saveCalFactor = () => {
      RNFS.writeFile(RNFS.DocumentDirectoryPath + '/configCal.txt', this.state.calibrationNum.toString(), 'utf8')
      ToastAndroid.show('Saved Calibration Factor!', 50);
  }
//  setTimeout(function(){that.setState({timePassed: true})}, 1000);

    onReadData = (data)=>{
        data = data.data;

        oldWeight = this.state.weight;
        this.processData(data)
        newWeight = this.state.weight;

    }

    processData = (data)=>{
//		console.log('processing data');
        if(data[0] === 'w'){
            this.setState({weight: data.substring(1)})

        }else if(data[0] === 'm'){
//                console.warn('test');//wakeUpApp();
        }else if(data[0] === 'R'){
            ToastAndroid.show('Successfully Tared!', 50);

        }else if(data[0] === 'A'){
                     ToastAndroid.show('Successfully Increased!', ToastAndroid.SHORT);
        }else if(data[0] === 'Z'){
                     ToastAndroid.show('Successfully Decreased!', ToastAndroid.SHORT);
        }else if(data[0] === 'g'){
            this.setState({calibrationNum: data.substring(1)})

            ToastAndroid.show('Found calibration...', ToastAndroid.SHORT)
        }

    }
    tareWeights = () =>{
          RNBluetoothClassic.write('t')
    }
   componentDidMount(){
        RNFS.exists(RNFS.DocumentDirectoryPath + '/configCal.txt')
            .then((exists) => {
                if(exists){

                    RNFS.readFile(RNFS.DocumentDirectoryPath + '/configCal.txt', 'utf8')
                         .then((result) => {this.setState({calibrationNum: parseInt(result)})})

                }
                else{
                    RNFS.appendFile(RNFS.DocumentDirectoryPath + '/configCal.txt', '-5096', 'utf8')
                }
        })


//    console.warn(calFactor);
    this.myTimeout = setTimeout( () => {
                      this.props.navigation.goBack()
                      },20000)
    RNBluetoothClassic.disconnect();
     RNBluetoothClassic.connect(this.state.BTdeviceID)
           .then(() => {
             // Success code
             this.setState({BTconnected:true})
//             RNBluetoothClassic.write('g')
             RNBluetoothClassic.write('h')
             RNBluetoothClassic.write(this.state.calibrationNum.toString())
           })
           .catch((error) => {
             // Failure code
             console.warn(error);
           });

     this.onRead = RNBluetoothClassic.addListener(BTEvents.READ, (data)=>this.onReadData(data), this);
  }
  componentWillUnmount() {
          this.onRead.remove();//
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

        {/*We should blank out the buttons if bluetooth isConnected() is false*/}

        <View style={styles2.containerrow}>
        <TouchableOpacity disabled={!this.state.BTconnected} style={styles2.button}  onPress={()=> this.checkDown()}>
                  <Text style={{color:'white'}}>Decrease Calibration </Text>
                </TouchableOpacity>
        <TouchableOpacity disabled={!this.state.BTconnected}  style={styles2.button}  onPress={()=> this.checkDownFiner()}>
                  <Text style={{color:'white'}}>Decrease Finer Calibration</Text>
                </TouchableOpacity>

        <TouchableOpacity disabled={!this.state.BTconnected}  style={styles2.button}  onPress={()=> this.tareWeights()}>
                  <Text style={{color:'white'}}>Tare Weight</Text>
                </TouchableOpacity>
        <TouchableOpacity disabled={!this.state.BTconnected} style={styles2.button}  onPress={()=> this.checkUpFiner()}>
                <Text style={{color:'white'}}>Increase Finer Calibration</Text>
              </TouchableOpacity>
        <TouchableOpacity disabled={!this.state.BTconnected}  style={styles2.button}  onPress={()=> this.checkUp()}>
                    <Text style={{color:'white'}}>Increase Calibration</Text>
                  </TouchableOpacity>

            </View>



            <View style={styles2.containerrow}>
            <TouchableOpacity disabled={!this.state.BTconnected} style={styles2.button}  onPress={()=> this.saveCalFactor()}>
                                          <Text style={{color:'white'}}>Save Settings</Text>
                                        </TouchableOpacity>
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


