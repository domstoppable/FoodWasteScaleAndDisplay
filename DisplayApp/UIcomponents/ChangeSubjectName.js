
import * as React from 'react';
import { Text, View, StyleSheet , TextInput, TouchableHighlight} from 'react-native';
import { Component } from 'react';
import DevOptions from './DevOptions';
import { Button, Alert, AppRegistry } from 'react-native';
import RNFS from 'react-native-fs';
import {SheetsExport} from './SheetsExport';
import {ToastAndroid } from 'react-native';

//const pathToWrite = `${RNFetchBlob.fs.dirs.DownloadDir}/A3.csv`;
export default class ChangeSubjectName extends Component {
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
    saveSubjectName = () => {
      result = this.state.input_password
      RNFS.writeFile(RNFS.DocumentDirectoryPath + '/configSubjectName.txt', result, 'utf8')
      ToastAndroid.show('Saved subject name: ' + result, 50);
      this.props.navigation.goBack();
    }
  checkOperatorComment = () => {
      curComment = this.state.input_password
      RNFS.appendFile(pathToWrite, curComment, 'utf8');
      this.props.navigation.goBack();

  }
//  setTimeout(function(){that.setState({timePassed: true})}, 1000);
   componentDidMount(){
    this.myTimeout = setTimeout( () => {
                      this.props.navigation.goBack()
                      },10000)
  }
  componentDidUpdate(prevProps, prevState, snapshot){

//    if (prevProps.data !== this.props.data) {
        clearTimeout(this.myTimeout);
        this.myTimeout = setTimeout( () => {
                              this.props.navigation.goBack()
                              },10000)
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
        <Text style={styles2.value}> Enter Subject Name </Text>
        <TextInput style={{height: 45,width: "50%",borderColor: "gray",borderWidth: 2, textAlign:'center', margin: 10}}
//           placeholder="Password"
//           placeholderTextColor="#9a73ef"
           returnKeyType='go'
           autoCorrect={false}
           contextMenuHidden={true}
           disableFullscreenUI={true}
           onChangeText={(value) => this.setState({input_password: value})}
           value={this.state.input_password}
        />
        <View style={styles2.containerrow}>

        <TouchableHighlight style={styles2.button}  onPress={this.saveSubjectName}>
                    <Text style={{color:'white'}}>Ok</Text>
                  </TouchableHighlight>
          <TouchableHighlight style={styles2.button}  onPress={()=> goBack()}>
                              <Text style={{color:'white'}}>Cancel</Text>
                            </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles2 = StyleSheet.create({
	container: {
		flex: 1,
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
    	    height: "50%",
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


