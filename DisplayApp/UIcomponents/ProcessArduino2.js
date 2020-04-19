import React, {Component} from 'react';
import {Picker, StyleSheet, Text, View, Button, TouchableHighlight} from 'react-native';
import HomeScreen from './HomeScreen.js';
import DevOptions from './DevOptions';
import WeightChangePrompt from './WeightChangePrompt';
import {RNSerialport, definitions, actions} from 'react-native-serialport';
import {DeviceEventEmitter} from 'react-native';
import {Image} from 'react-native';
import GLOBAL from './Globals'
//import RNFetchBlob from 'rn-native-fetch-blob';
import GoogleSheet, { batchGet, append } from 'react-native-google-sheet';
import ExportGoogleSheets from './ExportGoogleSheets'
import {ToastAndroid } from 'react-native';
import {SheetsExport} from './SheetsExport';
import RNBluetoothClassic, { BTEvents } from 'react-native-bluetooth-classic';
import RNFS from "react-native-fs";

const landfillDir = '../Landfill2/';
const spreadsheetId = '1hLF01Bkc8HvhI3VE3bKnMK-MFCzOwic2s9h36uOPV3Y'
const formURI = 'https://docs.google.com/forms/d/1bdTauz1McigC98QHIEo_4jvB75s0sQBC3SdQrE30xuQ/formResponse';
const sheetsURI = 'https://sheets.googleapis.com/v4/spreadsheets/' + spreadsheetId + ':append';
// write the current list of answers to a local csv file
//const pathToWrite = `${RNFS.DocumentDirectoryPath}/A3.csv`;
const pathToWrite = '/storage/emulated/0/Download/' + '/A4.csv';
//const fieldNames = GLOBAL.fieldNames;
const fieldNames = {
    'Timestamp': 'entry.1812376040',
    'Weight': 'entry.21551981',
    'SubjectID': 'entry.757893397',
    'Comments': 'entry.1385450040',
    'formURI' : 'https://docs.google.com/forms/d/1bdTauz1McigC98QHIEo_4jvB75s0sQBC3SdQrE30xuQ/formResponse'

    };

const fieldNames_Totals = {
    'Timestamp': 'entry.216516471',
    'Date': 'entry.216516471',
    'Weight': 'entry.1993824366',
    'SubjectID': 'entry.1508379772',
    'Comments': 'name="entry.1955302934"',
    'formURI': 'https://docs.google.com/forms/d/e/1FAIpQLSeTDymPxm1ImYeMFVAtduGSDAq8sf9VpwZa737BCtRHqzFFzA/formResponse'};

const threshWeight = 400/454; //100 grams/s. Arduino is parsing every 1s
const midnight = "0:00:00";
//const garbage_vec = [-10, 0, 0.25, 0.5, 1, 1.5, 2, 2.5, 3, 4, 5, 10];
const garbage_vec = [-1, 0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1];
const imageVec = [require(landfillDir + '/1.png'),
                  require(landfillDir + '/2.png'),
                  require(landfillDir + '/3.png'),
                  require(landfillDir + '/4.png'),
                  require(landfillDir + '/5.png'),
                  require(landfillDir + '/6.png'),
                  require(landfillDir + '/7.png'),
                  require(landfillDir + '/8.png'),
                  require(landfillDir + '/9.png'),
                  require(landfillDir + '/10.png'),
                  require(landfillDir + '/11.png')];

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
                weightCheckInterval: 0,
                curTime: '',
                tapsPassword:0,
                tapsComment:0,
                tapsTare:0,
                myInterval:null,
                date: '',
                dateWrite: '',
                subjectID: 'Subject 1',
                weightOffset: 0,
                toResetWeight: 1,
                garbagePicture: require(landfillDir + '/1.png'),
                oldGarbagePicture: require(landfillDir + '/1.png'),
                // If modifying these scopes, delete token.json.
                SCOPES: ['https://www.googleapis.com/auth/spreadsheets'],
                // The file token.json stores the user's access and refresh tokens, and is
                // created automatically when the authorization flow completes for the first
                // time.
                TOKEN_PATH: 'token.json',
                //BTdeviceID: '00:14:03:06:2F:D9',
                BTdeviceID: '00:14:03:06:32:6E',

            };
            this.buffer = '';
        }



        onReadData = (data)=>{
            data = data.data;

            oldWeight = this.state.weight;
    		this.processData(data)
    		newWeight = this.state.weight;
    		//Checking on a slope of 10g/s
    		var checkmin = new Date().getMinutes(); //Current Minutes
            var checksec = new Date().getSeconds(); //Current Seconds
            var checkTime = checkmin*60 + checksec;
            var diffTime = checkTime - this.state.lastChange;

    		if((newWeight - oldWeight) < -threshWeight && diffTime > 10){ //&& this.lastChange > 30s theoretically
    		    console.warn('Significant weight change detected')
    		    //Prompt the user to press a button to indicate whether this weight change was intentional
    		    this.props.navigation.navigate('WeightChangePrompt', {onSelect: this.onSelect, curWeight: this.state.weight});
                ///Something will be done in WeightChangePrompt to the weight. In reality we will be fixing the weight state
                this.setState({lastChange: checkTime})
    		}
            for(i = 0; i < 11; i++){
                if(newWeight > garbage_vec[i] & newWeight < garbage_vec[i+1]){
                    this.setState({garbagePicture: imageVec[i+1]})
                    this.setState({oldGarbagePicture: imageVec[i]})
                    break;
                }
            }

        }

        processData = (data)=>{
    //		console.log('processing data');
            if(data[0] === 'w'){
                this.setState({weight: data.substring(1)})

            }else if(data[0] === 'm'){
//                console.warn('test');//wakeUpApp();
            }else if(data[0] === 'R'){
                ToastAndroid.show('Successfully Tared!', 500);

            }else if(data[0] === 'A'){
                         ToastAndroid.show('Successfully Increased!', 100);
            }else if(data[0] === 'Z'){
                         ToastAndroid.show('Successfully Decreased!', 100);
            }
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

                this.setState({lastChange: min*60+sec})
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

//                       var formData = new FormData();
//                       formData.append(fieldNames.Timestamp, this.state.curTime);
//                       formData.append(fieldNames.Weight, '' + this.state.weight);
//                       formData.append(fieldNames.SubjectID, this.state.subjectID);
//                       SheetsExport(formData); //This uploads to the internet.

                    },1000)

                this.localUploadInterval = setInterval( () => {this.localExport,5000});
//                this.sheetsUploadInterval = setInterval( () => {
//                   var formData = new FormData();
//                   formData.append(fieldNames.Timestamp, this.state.curTime);
//                   formData.append(fieldNames.Weight, '' + this.state.weight);
//                   formData.append(fieldNames.SubjectID, this.state.subjectID);
//                   SheetsExport(fieldNames.formURI, formData)
//
//                   }, 10000);

                 RNBluetoothClassic.disconnect();
                 RNBluetoothClassic.connect(this.state.BTdeviceID)
                       .then(() => {
                         // Success code
                         ToastAndroid.show('Bluetooth Connected!', 1500);
                       })
                       .catch((error) => {
                         // Failure code
                         console.warn(error);
                       });
                 this.onRead = RNBluetoothClassic.addListener(BTEvents.READ, (data)=>this.onReadData(data), this);

                 this.resetFunc();
        }
    //Make sure to unmount the Arduino SerialPort everytime else it will absolutely fail
    componentWillUnmount() {
        clearInterval(this.myInterval);
        clearInterval(this.localUploadInterval);
        clearInterval(this.sheetsUploadInterval);
        this.onRead.remove();//
        RNBluetoothClassic.disconnect();
    }
    static navigationOptions = {
            header:null
          };

    tareWeights = () =>{

        numTaps = this.state.tapsTare;
          if(numTaps >= 10){
              RNBluetoothClassic.write('t')
              this.setState({tapsTare:0})
          }
          else{
              this.setState({tapsTare: numTaps+1})
          }
    }
    checkPassword = () => {
          numTaps = this.state.tapsPassword;
          if(numTaps >= 5){
              this.setState({tapsPassword:0})
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
        RNFS.appendFile(pathToWrite, csvString, 'utf8')

    }

    //This is called every midnight
    resetFunc = () => {
         var now = new Date();
         var night = new Date(
                     now.getFullYear(),
                     now.getMonth(),
                     now.getDate() + 1,0,0,0);
         var msToMidnight = night.getTime() - now.getTime();
         if(msToMidnight >= 0 && msToMidnight <= 1000){
            console.warn('reset function called')
            this.setState({weightOffset: this.state.weight});
         }


    }
    resetAtMidnight = () =>{
        var now = new Date();
        //Need to figure out how to properly get the next night
        var night = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate() + 1,0,0,0);
        var msToMidnight = night.getTime() - now.getTime();
        setTimeout(() => {
            this.resetFunc();
            this.resetAtMidnight();
            }, msToMidnight);
    }




    test = () =>{
    //    device. =

        RNBluetoothClassic.connect(this.state.BTdeviceID)
          .then(() => {
            // Success code
            console.warn('Connected');
          })
          .catch((error) => {
            // Failure code
    //        const readCharacteristic =  device.readCharacteristicForService(deviceID);
            console.warn(error);
          });
    //    const readCharacteristic = await device.readCharacteristicForService(deviceID); // assuming the device is already connected
    //     const heightInCentimeters = Buffer.from(readCharacteristic.value, 'base64').readUInt16LE(0);
      }
      testChange = () => {

        this.props.navigation.navigate('WeightChangePrompt', {onSelect: this.onSelect})
      }
      testDisconnect = () =>{

        RNBluetoothClassic.disconnect()
        .then(() => {
                    // Success code
                    console.warn('Disconnected');
                  })
                  .catch((error) => {
                    // Failure code
            //        const readCharacteristic =  device.readCharacteristicForService(deviceID);
                    console.warn(error);
                  });

      }

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
        const weightChangeDecision = this.props.navigation.getParam('weightChangeDecision', 0)
		return (
			<View style={styles.container}>
                {this.displayScreenMessage(displayType)}


                {/*This allows the researcher to go back to the Developer Screen*/}
                <View style={styles.invisViewLeft}>
                    <TouchableHighlight style={styles.invisButton} onPress={this.checkPassword}><Text></Text></TouchableHighlight>
                </View>

                {/*This allows the researcher to input a comment to upload'*/}
                <View style={styles.invisViewRight}>
                    <TouchableHighlight style={styles.invisButton} onPress={this.checkComment}><Text></Text></TouchableHighlight>
                </View>

                {/*This allows the user to tare the weights. Should ask for verification first*/}
                <View style={styles.invisViewTopLeft}>
                                    <TouchableHighlight style={styles.invisButton} onPress={this.tareWeights}><Text></Text></TouchableHighlight>
                </View>

                {/*This allows the user to have a debug button*/}
                <View style={styles.invisViewTopRight}>
                                    <TouchableHighlight style={styles.invisButton} onPress={this.testChange}><Text></Text></TouchableHighlight>
                </View>
			</View>
		);
	}

	//This will check through all the current display types, and pick the way to display the information
	displayScreenMessage = (displayType) =>{
            if(displayType == 'Baseline'){
                return <Text style={styles.value}>{this.state.date}</Text>

            } else if (displayType == 'Numeric'){
                return <Text style={styles.value}>{"\n"}{Number(this.state.weight)- this.state.weightOffset} {"\n"} {this.state.curTime}</Text>

            } else if (displayType == 'Metaphoric'){
                return <Image style={styles.garbageImage} fadeDuration={1} source={this.state.garbagePicture} defaultSource={this.state.oldGarbagePicture}/>

            } else if (displayType == 'Ambient'){
                return <Image style={styles.garbageImage}  source={{uri:'../Landfill/Untitled.png'}}/>

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

    invisViewTopRight: {
              position: 'absolute',
              bottom: "90%",
              left: "90%",
              zIndex: 50,
              backgroundColor: '#fff',
              height: "100%",
              width: "100%",
              },
    invisViewTopLeft: {
              position: 'absolute',
              bottom: "90%",
              right: "90%",
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
    garbageImage: {
            height: "100%",
            width: "100%",
            position:'absolute',
            backfaceVisibility:'hidden',
            },
});
