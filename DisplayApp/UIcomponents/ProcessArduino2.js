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
import ExportGoogleDrive from './ExportGoogleDrive'
import {ToastAndroid } from 'react-native';
import {SheetsExport} from './SheetsExport';
import RNBluetoothClassic, { BTEvents } from 'react-native-bluetooth-classic';
import RNFS from "react-native-fs";

const landfillDir = '../Landfill2/';
const spreadsheetId = '1hLF01Bkc8HvhI3VE3bKnMK-MFCzOwic2s9h36uOPV3Y'
const formURI = 'https://docs.google.com/forms/d/1bdTauz1McigC98QHIEo_4jvB75s0sQBC3SdQrE30xuQ/formResponse';
const sheetsURI = 'https://sheets.googleapis.com/v4/spreadsheets/' + spreadsheetId + ':append';
// write the current list of answers to a local csv file
//const pathToWrite = `${RNFS.DocumentDirectoryPath}/WeightOutput2.csv`;
const pathToWrite = `${RNFS.ExternalStorageDirectoryPath}/Download/WeightOutput.csv`;
//const pathToWrite = '/storage/emulated/0/Download/' + '/WeightOutput.csv';
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

const threshWeight = 400; //100 grams/s. Arduino is parsing every 1s
const midnight = "0:00:00";
//const garbage_vec = [-10, 0, 0.25, 0.5, 1, 1.5, 2, 2.5, 3, 4, 5, 10];
const garbage_vec = [-1000000, 1, 25, 50, 75, 100, 150, 200, 250, 300, 350, 422, 100000];
const imageVec = [require(landfillDir + '/0.png'),
                  require(landfillDir + '/1.png'),
                  require(landfillDir + '/2.png'),
                  require(landfillDir + '/3.png'),
                  require(landfillDir + '/4.png'),
                  require(landfillDir + '/5.png'),
                  require(landfillDir + '/6.png'),
                  require(landfillDir + '/7.png'),
                  require(landfillDir + '/8.png'),
                  require(landfillDir + '/9.png'),
                  require(landfillDir + '/10.png'),
                  require(landfillDir + '/11.png'),
                  require(landfillDir + '/11.png')];
const ambientVec = ['#05ab31','#fc9d03','#8a241d'];
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
                garbagePicture: require(landfillDir + '/0.png'),
                oldGarbagePicture: require(landfillDir + '/0.png'),
                ambientColor: '#F5FCFF',
                ambientCheck: 0,
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

    		//Check for colors on garbage and ambient
            for(i = 0; i < 12; i++){
                if(newWeight > garbage_vec[i] & newWeight < garbage_vec[i+1]){
                    this.setState({garbagePicture: imageVec[i]})
                    this.setState({oldGarbagePicture: imageVec[i]})
                    if(this.state.ambientCheck == 1){
                        // App specifically looks for weight ranges to change colors
                        if(i < 7){
                            this.setState({ambientColor: ambientVec[0]})
                        } else if(i >=7 & i <11){
                            this.setState({ambientColor: ambientVec[1]})
                        } else {
                            this.setState({ambientColor: ambientVec[2]})
                        }
                    }else{
                        this.setState({ambientColor: '#F5FCFF'})
                    }
                    break;
                }
            }

        }

        processData = (data)=>{
    //		console.log('processing data');
            if(data[0] === 'w'){
                this.setState({weight: Number(data.substring(1)).toFixed(2)})
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
            const displayType = this.props.navigation.getParam('displayType', 0)

            if(displayType == 'Ambient'){
                console.warn('Selected ambient')
                this.setState({ambientCheck:1});
            }
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

                        var min = ('0'+ new Date().getMinutes()).slice(-2); //Current Minutes
                        var sec = ('0'+ new Date().getSeconds()).slice(-2);//new Date().getSeconds(); //Current Seconds


                       this.setState({date: day_string[day] +  ', ' + month + '/' + date + '/' + year + '\n' + hours + ':' + min + ' ' + AMPM });
                       this.setState({dateWrite: day_string[day] +  ' '  + month + '/' + date + '/' + year + ' ' + hours + ':' + min + ':' + sec  + AMPM });
//                       this.localExport(); //This uploads to a local data.csv file.
//                        console.warn(pathToWrite)

                        // Midnight counter
                        if(hours == 0 && min == '00' && sec == '00'){
                            var formData = new FormData();
                            formData.append(fieldNames_Totals.Timestamp, this.state.curTime);
                            formData.append(fieldNames_Totals.Weight, '' + this.state.weight);
                            formData.append(fieldNames_Totals.SubjectID, this.state.subjectID);
                            SheetsExport(fieldNames_Totals.formURI, formData)
                            this.setState({weightOffset: this.state.weight});
                        }

                        // Hourly counter
                        if((min == '30' || min == '00') && sec == '00'){
                            var formData = new FormData();
                            formData.append(fieldNames.Timestamp, this.state.curTime);
                            formData.append(fieldNames.Weight, '' + this.state.weight);
                            formData.append(fieldNames.SubjectID, this.state.subjectID);
                            SheetsExport(fieldNames.formURI, formData)
                        }
                        // 10 second counter
                        if(new Date().getSeconds() % 10 == 0){
                            this.localExport();
                        }

                    },1000)
//                this.localExportInterval = setInterval( () => {
////                    console.warn(pathToWrite)
//                    this.localExport(); //This uploads to a local data.csv file.
//                }, 10000)

//                this.localUploadInterval = setInterval( () => {this.localExport,5000});
//                this.sheetsUploadInterval = setInterval( () => {
//
//
//                   }, 1000*3600); //Upload every hour

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
//                 this.resetFunc();

        }
    //Make sure to unmount the Arduino SerialPort everytime else it will absolutely fail
    componentWillUnmount() {
        clearInterval(this.myInterval);
//        clearInterval(localExportInterval);
//        clearInterval(this.localUploadInterval);
//        clearInterval(this.sheetsUploadInterval);
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
          if(numTaps >= 2){
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
        const csvString = this.state.subjectID + ',' + this.state.dateWrite + ',' + this.state.curTime + ',' + this.state.weight + '\n';
        if(!RNFS.exists(pathToWrite)){
            console.warn('Does not exist!!!')
            RNFS.write(pathToWrite, csvString, 'utf8')
        }
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
            var formData = new FormData();
            formData.append(fieldNames_Totals.Timestamp, this.state.curTime);
            formData.append(fieldNames_Totals.Weight, '' + this.state.weight);
            formData.append(fieldNames_Totals.SubjectID, this.state.subjectID);
            SheetsExport(fieldNames_Totals.formURI, formData)
            this.resetFunc();
            this.resetAtMidnight();


            }, msToMidnight);
    }



//
//    test = () =>{
//    //    device. =
//
//        RNBluetoothClassic.connect(this.state.BTdeviceID)
//          .then(() => {
//            // Success code
//            console.warn('Connected');
//          })
//          .catch((error) => {
//            // Failure code
//    //        const readCharacteristic =  device.readCharacteristicForService(deviceID);
//            console.warn(error);
//          });
//    //    const readCharacteristic = await device.readCharacteristicForService(deviceID); // assuming the device is already connected
//    //     const heightInCentimeters = Buffer.from(readCharacteristic.value, 'base64').readUInt16LE(0);
//      }
//      testChange = () => {
//
//        this.props.navigation.navigate('WeightChangePrompt', {onSelect: this.onSelect})
//      }
//      testDisconnect = () =>{
//
//        RNBluetoothClassic.disconnect()
//        .then(() => {
//                    // Success code
//                    console.warn('Disconnected');
//                  })
//                  .catch((error) => {
//                    // Failure code
//            //        const readCharacteristic =  device.readCharacteristicForService(deviceID);
//                    console.warn(error);
//                  });
//
//      }

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
        const colorStyles = {backgroundColor: this.state.ambientColor };// '#F5FCFF'
        {/*You CANNOT use // to comment inside of <View> or it will error */}
		return (
			<View style={[styles.container, colorStyles]}>
                {this.displayScreenMessage(displayType)}


                {/*This allows the researcher to go back to the Developer Screen*/}
                <View style={styles.invisViewLeft}>
                    <TouchableHighlight style={[styles.invisButton, colorStyles]} onPress={this.checkPassword}><Text></Text></TouchableHighlight>
                </View>

                {/*This allows the researcher to input a comment to upload'*/}
                <View style={styles.invisViewRight}>
                    <TouchableHighlight style={[styles.invisButton, colorStyles]} onPress={this.checkComment}><Text></Text></TouchableHighlight>
                </View>

                {/*This allows the user to tare the weights. Should ask for verification first*/}
                <View style={styles.invisViewTopLeft}>
                                    <TouchableHighlight style={[styles.invisButton, colorStyles]} onPress={this.tareWeights}><Text></Text></TouchableHighlight>
                </View>

                {/*This allows the user to have a debug button*/}
                <View style={styles.invisViewTopRight}>
                                    <TouchableHighlight style={[styles.invisButton, colorStyles]} onPress={this.testChange}><Text></Text></TouchableHighlight>
                </View>
			</View>
		);
	}

	//This will check through all the current display types, and pick the way to display the information
	displayScreenMessage = (displayType) =>{
            if(displayType == 'Baseline'){
                return <Text style={styles.value}>{this.state.date}</Text>

            } else if (displayType == 'Numeric'){
                return <Text style={styles.value}>{"\n"}{Number(this.state.weight)- Number(this.state.weightOffset).toFixed(2)} {"\n"} {this.state.curTime}</Text>

            } else if (displayType == 'Metaphoric'){
                return (<View style={styles.garbageContainer}>

                            <Image style={styles.garbageImage} fadeDuration={1} source={this.state.garbagePicture} defaultSource={this.state.oldGarbagePicture}/>
                            <Text style={styles.value}>{"\n"}{Number(this.state.weight)- this.state.weightOffset} {"\n"}</Text>
                       </View>)

            } else if (displayType == 'Ambient'){
                return <Text style={styles.value}>{"\n"}{Number(this.state.weight)- Number(this.state.weightOffset).toFixed(2)}</Text>


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
		//backgroundColor: '#F5FCFF',
	},
	garbageContainer: {
		flex: 4,
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
              //backgroundColor: '#F5FCFF',
              },
    garbageImage: {
            height: "100%",
            width: "100%",
            position:'absolute',
            backfaceVisibility:'hidden',
            },
});
