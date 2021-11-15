
import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Component } from 'react';
import { Button, Alert, AppRegistry } from 'react-native';
import {TouchableHighlight} from 'react-native';
import HomeScreen from './HomeScreen'
import OperatorPassword from './OperatorPassword'
import ProcessArduino2 from './ProcessArduino2';
import RNFS from "react-native-fs";

export default class DevOptions extends Component {
    constructor(){
        super();
        this.devText='Dev options';
        this.state = { subjectID: 'Subject1'}

    }

    //NavigationOptions somehow gets read into the screen
  static navigationOptions = {
          header:null
        };

    componentDidMount() {
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
  render() {
    //The master app container contains the navigation object. We need to access that to change to the next screen
    const {navigate} = this.props.navigation;
    const connected_test = this.props.navigation.getParam('connected_test', 0)
    const displayType = this.props.navigation.getParam('displayType', 0)
    return (

        //Buttons should be placed in Views to make it more modular
        <View style={styles.container}>
          <Text style={{fontWeight: 'bold', fontSize:25}}> Select Condition </Text>
          <Text> Subject Name: {this.state.subjectID} </Text>

          <TouchableHighlight style={styles.button}  onPress={()=> navigate('OperatorPassword', {displayType:'HomeScreen', connected_test})}>
              <Text style={styles.buttonText}>Homescreen</Text>
            </TouchableHighlight>

          <TouchableHighlight style={styles.button}  onPress={()=> navigate('OperatorPassword', {displayType:'Baseline', connected_test})}>
              <Text style={styles.buttonText}>B</Text>
          </TouchableHighlight>

           <TouchableHighlight style={styles.button}  onPress={()=> navigate('OperatorPassword', {displayType:'Numeric', connected_test})}>
                 <Text style={styles.buttonText}>N</Text>
             </TouchableHighlight>
           <TouchableHighlight style={styles.button}  onPress={()=> navigate('OperatorPassword', {displayType:'Ambient', connected_test})}>
             <Text style={styles.buttonText}>A</Text>
         </TouchableHighlight>
          <TouchableHighlight style={styles.button}  onPress={()=> navigate('OperatorPassword', {displayType:'Metaphoric', connected_test})}>
                        <Text style={styles.buttonText}>M</Text>
            </TouchableHighlight>
            {/*
          <TouchableHighlight style={styles.button}  onPress={()=> navigate('ProcessArduino2', {displayType:'Debug', connected_test})}>
                        <Text style={styles.buttonText}>Debug</Text>
                    </TouchableHighlight>
                    */}
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
//		flexWrap: 'wrap',
        flexDirection: 'column'
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
	button: {
	    height: "13%",
//	    padding: 10,
	    margin: 1,
        elevation: 2,
        width: "40%",
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
        borderRadius: 20,
//        flexDirection: 'column',
      },

	buttonText: {
		fontSize: 20,
		textAlign: 'center',
		color: 'white',
		fontWeight: 'bold',
		fontFamily:'Roboto',
	},
});
