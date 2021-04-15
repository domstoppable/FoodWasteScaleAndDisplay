
import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Component } from 'react';
import DevOptions from './DevOptions';
import { Button, Alert, AppRegistry, TouchableHighlight } from 'react-native';

//import {createStacknavigator} from 'react-navigation';

console.warn('Loaded Homescreen');
export default class HomeScreen extends Component {
    constructor(){
        super();
        this.isDeveloper='This is the Homescreen'
        this.state = {displayType:'Welcome', taps:0}
//        this.paramstest = props.navigation.state.params.displayType
    }
    // Somehow the title screen is read from navigationOptions
    //Difference of having navigations inside or outside render options?
      static navigationOptions = {
        header:null
      };

    //Only allow operator password screen once tapped 5 times
    checkTaps = () => {
        numTaps = this.state.taps;
        if(numTaps >= 5){
            this.setState({taps:0})
            this.props.navigation.navigate('OperatorPassword');
        }
        else{
            this.setState({taps: numTaps+1})
        }
    }

  render() {
    const {navigate} = this.props.navigation;
    displayType = this.state.paramstest
    const connected_test = this.props.navigation.getParam('connected_test', 0)
    return (
    //Buttons should be placed in Views so that they can be more modular
    <View style={styles2.container}>
        <View style={styles2.container_col}>
            <Text style={styles2.value}> Welcome to the Food Waste Scale </Text>
            <TouchableHighlight style={styles2.button} onPress={()=> navigate('DevOptions', {displayType:'', connected_test})}>
            			<Text>Pick Display Type</Text>
            </TouchableHighlight>



        </View>
        <View style={styles2.container_col}>
            <TouchableHighlight style={styles2.button} onPress={()=> navigate('ExportGoogleDrive', {displayType:'', connected_test})}>
                        <Text>Debug Export</Text>
            </TouchableHighlight>
        </View>

        <View style={styles2.container_col}>
            <TouchableHighlight style={styles2.button} onPress={()=> navigate('CalibrationMenu', {displayType:'', connected_test})}>
                        <Text>Calibrations</Text>
            </TouchableHighlight>



        </View>
        {/*Button in the bottom left. Need to tap 6 times to open*/}
        <View style={styles2.invisView}>
            <TouchableHighlight style={styles2.invisButton} onPress={this.checkTaps}>
                        <Text> Test </Text>
            </TouchableHighlight>
        </View>
    </View>

    );
  }
}

const styles2 = StyleSheet.create({
    container_row: {
            flex:2,
    		flexDirection: 'row',
    		justifyContent: 'flex-start',
    		alignItems: 'center',
    		backgroundColor: '#F5FCFF',
    	},
    container_col: {
                flex:1,
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#F5FCFF',
            },
	container: {
		flex: 5,
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
		margin: 1,

	},
	button: {
    	    height: "20%",
    	    padding: 20,
    	    margin: 1,
            elevation: 10,
            width: "100%",
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#fff',
//            flexDirection: 'row',
          },
    invisView: {
            position: 'absolute',
            top: "90%",
            right: "90%",
            zIndex: 50,
            backgroundColor: '#F5FCFF',
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

