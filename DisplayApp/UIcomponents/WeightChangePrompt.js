

import * as React from 'react';
import { Text, View, StyleSheet , TextInput, TouchableHighlight} from 'react-native';
import { Component } from 'react';
import DevOptions from './DevOptions';
import { Button, Alert, AppRegistry } from 'react-native';
//import {createStacknavigator} from 'react-navigation';
import RNFS from 'react-native-fs';
import {SheetsExport} from './SheetsExport';

const fieldNames = {
    'Timestamp': 'entry.1812376040',
    'Weight': 'entry.21551981',
    'SubjectID': 'entry.757893397',
    'Comments': 'entry.1385450040',
    'formURI' : 'https://docs.google.com/forms/d/1bdTauz1McigC98QHIEo_4jvB75s0sQBC3SdQrE30xuQ/formResponse',

    };
const pathToWrite = `${RNFS.ExternalStorageDirectoryPath}/Download/WeightOutput.csv`;
export default class WeightChangePrompt extends Component {
    constructor(){
        super();
        this.isDeveloper='This is the OperatorPassword'
        this.state = {displayType:'Welcome',
                      input_password: '',
                      myTimeout: null,
                      maxTime: 10000,}//10 seconds timeout after no action

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
  checkYes = () => {

      const {navigation} = this.props;
      navigation.goBack();
      const weight = this.props.navigation.getParam('curWeight', 0)
      const oldWeight = this.props.navigation.getParam('oldWeight', 0)
      const curOffset = this.props.navigation.getParam('curOffset', 0)
      const weightVector = this.props.navigation.getParam('weightVector', 0)
//      console.warn(weightVector)
       weightVector.sort((a, b) => a - b);
       medianWeight = (weightVector[(weightVector.length - 1) >> 1] + weightVector[weightVector.length >> 1]) / 2
//        console.warn(medianWeight)
      //If true, do nothing.
       //Do something
       const csvString = this.state.subjectID + ',' + this.state.dateWrite + ',' + this.state.curTime + ',' + Number(weight + curOffset) + + ',Intentional' + '\n';
       RNFS.appendFile(pathToWrite, csvString, 'utf8');
//      this.props.navigation.navigate('ProcessArduino2', {commentOutput:curPass});
        var formData = new FormData();
        formData.append(fieldNames.Timestamp, this.state.curTime);
        formData.append(fieldNames.Weight, '' + (weight + curOffset));
        formData.append(fieldNames.SubjectID, this.state.subjectID);
        formData.append(fieldNames.Comments, 'Intentional')
        SheetsExport(fieldNames.formURI,formData);
//       navigation.state.params.onSelect({weightOffset: Number(oldWeight)-Number(weight)+Number(curOffset)})
        navigation.state.params.onSelect({weightOffset: Number(medianWeight)-Number(weight)+Number(curOffset)})

  }
  checkNo = () => {
        const {navigation} = this.props;
        navigation.goBack();
        const curOffset = this.props.navigation.getParam('curOffset', 0)
        const weight = this.props.navigation.getParam('curWeight', 0)
        //If false, ??? something about adding back weight
        //Do something
        const csvString = this.state.subjectID + ',' + this.state.dateWrite + ',' + this.state.curTime + ',' + Number(weight+ curOffset) + + ',Accidental' + '\n';
        RNFS.appendFile(pathToWrite, csvString, 'utf8');
//      this.props.navigation.navigate('ProcessArduino2', {commentOutput:curPass});
        var formData = new FormData();
        formData.append(fieldNames.Timestamp, this.state.curTime);
        formData.append(fieldNames.Weight, '' + (weight+curOffset));
        formData.append(fieldNames.SubjectID, this.state.subjectID);
        formData.append(fieldNames.Comments, 'Accidental')
        SheetsExport(fieldNames.formURI,formData);

        navigation.state.params.onSelect({weightOffset: curOffset})

  }
//  setTimeout(function(){that.setState({timePassed: true})}, 1000);
   componentDidMount(){
    this.myTimeout = setTimeout( () => {
//                      this.props.navigation.goBack()
                      this.checkNo()},60000)
    RNFS.exists(RNFS.DocumentDirectoryPath + '/configSubjectName.txt')
                .then((exists) => {
                    if(exists){
                        RNFS.readFile(RNFS.DocumentDirectoryPath + '/configSubjectName.txt', 'utf8')
                             .then((result) => {this.setState({subjectID: result})
                                               })
                    }
                    else{
                        RNFS.appendFile(RNFS.DocumentDirectoryPath + '/configSubjectName.txt', 'Subject1', 'utf8')
                        ToastAndroid.show('No file exists', 10)
                    }
            })
  }
  componentDidUpdate(prevProps, prevState, snapshot){

//    if (prevProps.data !== this.props.data) {
        clearTimeout(this.myTimeout);
        this.myTimeout = setTimeout( () => {
//                              this.props.navigation.goBack()
                              this.checkNo()},60000)
//      }

   }
   componentWillUnmount() {
        clearTimeout(this.myTimeout);
   }
  render() {
    const {navigate} = this.props.navigation;
    const {goBack} = this.props.navigation;
    displayType = this.state.paramstest;
    const connected_test = this.props.navigation.getParam('connected_test', 0);
    const curWeight = this.props.navigation.getParam('curWeight', 0);
//    const input_password = '';
    return (
    //Buttons should be placed in Views so that they can be more modular
    <View style={styles2.container}>
        <Text style={styles2.value}> We detected a weight reduction, {"\n"}
            please select the following: </Text>
            <TouchableHighlight style={styles2.button}  onPress={()=> this.checkYes()}>
                        <Text style={{color:'white'}}>Emptying the trash</Text>
                      </TouchableHighlight>
              <TouchableHighlight style={styles2.button}  onPress={()=> this.checkNo()}>
                                  <Text style={{color:'white'}}>Accident</Text>
                                </TouchableHighlight>
      </View>
    );
  }
}

const styles2 = StyleSheet.create({
//	container: {
//		flex: 3,
//		justifyContent: 'center',
//		alignItems: 'center',
//		backgroundColor: '#F5FCFF',
//	},
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF',
//		flexWrap: 'wrap',
        flexDirection: 'column'
	},
	containerrow: {
            flex: 1,
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
    	    height: "20%",
    	    padding: 10,
    	    margin: 20,
            elevation: 10,
            width: "20%",
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'black',
//            flexDirection: 'row',
          },

});


