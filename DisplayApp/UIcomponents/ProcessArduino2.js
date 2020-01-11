import React, {Component} from 'react';
import {Picker, StyleSheet, Text, View, Button, TouchableHighlight} from 'react-native';
import HomeScreen from './HomeScreen.js';
import DevOptions from './DevOptions';
import {RNSerialport, definitions, actions} from 'react-native-serialport';
import {DeviceEventEmitter} from 'react-native';
import GLOBAL from './Globals'
//import RNFetchBlob from 'react-native-fetch-blob';
import GoogleSheet, { batchGet, append } from 'react-native-google-sheet';
import ExportGoogleSheets from './ExportGoogleSheets'
import {ToastAndroid } from 'react-native';
import {SheetsExport} from './SheetsExport';


const spreadsheetId = '1hLF01Bkc8HvhI3VE3bKnMK-MFCzOwic2s9h36uOPV3Y'
const formURI = 'https://docs.google.com/forms/d/1bdTauz1McigC98QHIEo_4jvB75s0sQBC3SdQrE30xuQ/formResponse';
const sheetsURI = 'https://sheets.googleapis.com/v4/spreadsheets/' + spreadsheetId + ':append';
// write the current list of answers to a local csv file
//const pathToWrite = `${RNFetchBlob.fs.dirs.DownloadDir}/A3.csv`;
//const fieldNames = GLOBAL.fieldNames;
const fieldNames = {
    'Timestamp': 'entry.1812376040',
    'Weight': 'entry.21551981',
    'SubjectID': 'entry.757893397',
    'Comments': 'entry.1385450040',
    };
export default class ProcessArduino2 extends Component {
	constructor(){
		super();
		this.state = {
			data: undefined,
			devices: [],
			selectedDevice: null,
			debug: null,
            init_text: 'Initializing...',
            weight: null,
            date: '',
            curTime: '',
            tapsPassword:0,
            tapsComment:0,
            myInterval:null,
            date: '',
            dateWrite: '',
            subjectID: 'Subject 1',
            // If modifying these scopes, delete token.json.
            SCOPES: ['https://www.googleapis.com/auth/spreadsheets'],
            // The file token.json stores the user's access and refresh tokens, and is
            // created automatically when the authorization flow completes for the first
            // time.
            TOKEN_PATH: 'token.json',

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
                RNSerialport.connectDevice(deviceName, baudRate);
            }
        }

        onUsbAttached = ()=>{

            this.getDeviceList();
        }
        onUsbDetached = ()=>{

        }
        onUsbNotSupported = ()=>{
    //		console.warn('Usb not supported');
        }
        onError(error) {
//            console.warn('Code: ' + error.errorCode + ' Message: ' +error.errorMessage)
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
//    			console.warn(this.state.weight);

    //			console.log('recorded proper weight');
            }else if(data[0] === 'm'){
//                console.warn('test');//wakeUpApp();
            }else{
                // this.setState({weight: this.buffer});

    //			console.warn('buffered set');
    //			console.warn(this.state.weight);
            }
        }

        getDeviceList = ()=>{
            RNSerialport.getDeviceList(response => {
                if(!response.status) {
                    alert('Code: ' + response.errorCode + ' Message: ' +response.errorMessage);
                    return;
                }

                this.setState({devices:response.devices});
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
                //First evaluate the file "config.txt"

//                RNFetchBlob.fs.readFile('/config.txt', 'utf8').then((data) => {console.warn(data)});

                var that = this;
                var date = new Date().getDate(); //Current Date
                var month = new Date().getMonth() + 1; //Current Month
                var year = new Date().getYear(); //Current Year
                var hours = new Date().getHours(); //Current Hours
                var min = new Date().getMinutes(); //Current Minutes
                var sec = new Date().getSeconds(); //Current Seconds
                var AMPM = '';
                var day_string = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
                this.myInterval = setInterval( () => {
                      this.setState({
                            curTime : new Date().toDateString()

                      })
                        var date = new Date().getDate(); //Current Date
                        var month = new Date().getMonth() + 1; //Current Month
                        var year = new Date().getFullYear() -2000; //Current Year
                        var day = new Date().getDay();
                        var hours = new Date().getHours(); //Current Hours
                        //Conversion from military time to normal time

                        if (hours > 0 && hours <= 12){
                            hours = hours;
                            AMPM = 'AM';
                        }
                        else if (hours >  12){
                            hours = hours - 12;
                            AMPM = 'PM';
                        } else if (hours == 0){
                            hours = 12;
                            AMPM = 'AM';
                        }

                        var min = new Date().getMinutes(); //Current Minutes
                        var sec = new Date().getSeconds(); //Current Seconds

                       this.setState({date: day_string[day] +  ', ' + month + '/' + date + '/' + year + '\n' + hours + ':' + min + ' ' + AMPM });
                       this.setState({dateWrite: day_string[day] +  '\t'  + month + '/' + date + '/' + year + '\t' + hours + ':' + min + ' ' + AMPM });
//                       this.localExport(); //This uploads to a local data.csv file.

                       var formData = new FormData();
                       formData.append(fieldNames.Timestamp, this.state.curTime);
                       formData.append(fieldNames.Weight, '' + this.state.weight);
                       formData.append(fieldNames.SubjectID, this.state.subjectID);
//                       SheetsExport(formData); //This uploads to the internet.

                    },1000)
                DeviceEventEmitter.addListener('onServiceStarted', this.onServiceStarted, this);
                DeviceEventEmitter.addListener('onServiceStopped', this.onServiceStopped,this);
                DeviceEventEmitter.addListener('onDeviceAttached', this.onUsbAttached, this);
                DeviceEventEmitter.addListener('onDeviceDetached', this.onUsbDetached, this);
                DeviceEventEmitter.addListener('onDeviceNotSupported', this.onUsbNotSupported, this);
                DeviceEventEmitter.addListener('onError', this.onError, this);
                DeviceEventEmitter.addListener('onConnected', this.onConnectedDevice, this);
                DeviceEventEmitter.addListener('onDisconnected', this.onDisconnectedDevice, this);

                DeviceEventEmitter.addListener('onReadDataFromPort', (data)=>this.onReadData(data), this);

//                 Added listeners
                 RNSerialport.setAutoConnect(true); ///Making it autoconnect true allows very quick readings back on the Arduino.
                 RNSerialport.startUsbService();
        }
    //Make sure to unmount the Arduino SerialPort everytime else it will absolutely fail
    componentWillUnmount() {
        DeviceEventEmitter.removeAllListeners();
        RNSerialport.stopUsbService();
        clearInterval(this.myInterval);
    }
    static navigationOptions = {
            header:null
          };
    checkPassword = () => {
          numTaps = this.state.tapsPassword;
          if(numTaps >= 5){
              this.setState({taps:0})
              this.props.navigation.navigate('OperatorPassword');
          }
          else{
              this.setState({tapsPassword: numTaps+1})
          }
      }
    checkComment = async () => {
        numTaps = this.state.tapsComment;
          if(numTaps >= 5){
              this.setState({tapsComment:0})
              this.props.navigation.navigate('OperatorComment');
          }
          else{
              this.setState({tapsComment: numTaps+1})
          }


    }
    localExport = () => {

        // construct csvString
        const csvString = this.state.subjectID + ',' + this.state.dateWrite + ',' +this.state.weight + ',' + 'Logging the Weight' + '\n';
        // pathToWrite /storage/emulated/0/Download/data.csv
        RNFetchBlob.fs.appendFile(pathToWrite, csvString, 'utf8')

    }

//    //Does an HTTPS update to a Google Forms. Plans to do afetch to Google Sheets API v4 later
//    //With proper authentication
//    sheetsExport = (formData) => {
//
//    	fetch(formURI, {
//    		method: 'POST',
//    		body: formData,
//    	}).then(response => {
//    		if(response.ok){
//    			return response.text();
//    		}else{
//    			console.log(response);
//    			throw new Error('Request failed');
//    		}
//    	}).then(responseBody => {
//    		if(responseBody.indexOf('Your response has been recorded.') === -1){
//    			throw new Error('Unexpected response');
//    		}else{
//    			ToastAndroid.show('Data uploaded!', 3000);
//    		}
//    	}).catch(exception => {
//    		console.error('Error while submitting data', exception);
//    		ToastAndroid.show('Error while submitting data: ' + exception);
//    	});
//    }
    onSelect = data => {
        this.setState(data);
      };

      onPress = () => {
        this.props.navigate("OperatorComment", { onSelect: this.onSelect });
      };

	render() {
	    const {navigate} = this.props.navigation;
	    const connected_test = this.props.navigation.getParam('connected_test', 0)
        const curWeight = this.props.navigation.getParam('curWeight', 0)
        const displayType = this.props.navigation.getParam('displayType', 0)
        const commentOutput = this.props.navigation.getParam('commentOutput', '');
		return (
			<View style={styles.container}>

                <Text style={styles.value}>{this.displayScreenMessage(displayType)}</Text>

                {/*This allows the researcher to go back to the Developer Screen*/}
                <View style={styles.invisViewLeft}>
                    <TouchableHighlight style={styles.invisButton} onPress={this.checkPassword}><Text></Text></TouchableHighlight>
                </View>

                {/*This allows the researcher to input a comment to upload'*/}
                <View style={styles.invisViewRight}>
                    <TouchableHighlight style={styles.invisButton} onPress={this.checkComment}><Text></Text></TouchableHighlight>
                </View>

			</View>
		);
	}

	//This will check through all the current display types, and pick the way to display the information
	displayScreenMessage = (displayType) =>{
            if(displayType == 'Baseline'){
                return <Text style={styles.value}>{this.state.date}</Text>

            } else if (displayType == 'Numeric'){
                return <Text style={styles.value}>{displayType} {"\n"}{this.state.weight} {"\n"} {this.state.curTime}</Text>

            } else if (displayType == 'Metaphoric'){
                return <Text style={styles.value}>{displayType} {"\n"} Something metaphorical </Text>

            } else if (displayType == 'Ambient'){
                return <Text style={styles.value}>{displayType} {"\n"} Something ambient </Text>

            } else {


                return <Text style={styles.value}>{displayType} {"\n"} {this.state.weight} {"\n"} {this.state.curTime}</Text>
            }
        }

}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'column',
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
		fontSize: 60,
		textAlign: 'center',
		fontWeight: 'bold'
//		margin: 3,
//		flexGrow:1,
	},
	button: {
    	    height: "13%",
    //	    padding: 10,
    	    margin: 1,
            elevation: 2,
            width: "40%",
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'black',
    //        flexDirection: 'column',
          },
    invisViewLeft: {
              position: 'absolute',
              top: "90%",
              right: "90%",
              zIndex: 50,
              backgroundColor: '#fff',
              height: "100%",
              width: "100%",
              },
    invisViewRight: {
                  position: 'absolute',
                  top: "90%",
                  left: "90%",
                  zIndex: 50,
                  backgroundColor: '#fff',
                  height: "100%",
                  width: "100%",
                  },
    invisButton: {
              height: "100%",
              padding: 0,
              margin: 0,
              elevation: 0,
              width: "100%",
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#F5FCFF',
              },
});
