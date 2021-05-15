

import * as React from 'react';
import { Text, View, StyleSheet , TextInput, TouchableHighlight} from 'react-native';
import { Component } from 'react';
import DevOptions from './DevOptions';
import { Button, Alert, AppRegistry } from 'react-native';
//import {createStacknavigator} from 'react-navigation';
import HomeScreen from './HomeScreen'
import ProcessArduino2 from './ProcessArduino2';
export default class OperatorPassword extends Component {
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
  checkOperatorPass = () => {
      curPass = this.state.input_password
      const displayType = this.props.navigation.getParam('displayType', 0)
      const connected_test = this.props.navigation.getParam('connected_test', 0)
      if(curPass == 'A' && displayType == 0){
        this.setState({input_password:''})
        this.props.navigation.navigate('DevOptions', {displayType: 'HomeScreen'});
        }
      else if(curPass == 'Sal' && displayType == 'HomeScreen'){
        this.setState({input_password:''})
        this.props.navigation.navigate('HomeScreen', {displayType:'HomeScreen', connected_test})
      }
      else if(curPass == 'Baseline' && displayType == 'Baseline'){
        this.setState({input_password:''})
        clearTimeout(this.myTimeout);
        this.props.navigation.navigate('ProcessArduino2', {displayType:'Baseline', connected_test})

      }
      else if(curPass == 'Cyber' && displayType == 'Numeric'){
        this.setState({input_password:''})
        clearTimeout(this.myTimeout);
        this.props.navigation.navigate('ProcessArduino2', {displayType:'Numeric', connected_test})
      }
      else if(curPass == 'Punk' && displayType == 'Ambient'){
        this.setState({input_password:''})
        clearTimeout(this.myTimeout);
        this.props.navigation.navigate('ProcessArduino2', {displayType:'Ambient', connected_test})
      }
      else if(curPass == '2077' && displayType == 'Metaphoric'){
        this.setState({input_password:''})
        clearTimeout(this.myTimeout);
        this.props.navigation.navigate('ProcessArduino2', {displayType:'Metaphoric', connected_test})
      }
      else{
        this.setState({input_password:''})
//        console.warn('Wrong password')
      }

  }
//  setTimeout(function(){that.setState({timePassed: true})}, 1000);
   componentDidMount(){
    this.myTimeout = setTimeout( () => {
                      this.props.navigation.goBack()
                      },60000)
  }
  componentDidUpdate(prevProps, prevState, snapshot){

//    if (prevProps.data !== this.props.data) {
//        clearTimeout(this.myTimeout);
//        this.myTimeout = setTimeout( () => {
//                              this.props.navigation.goBack()
//                              },10000)
////      }

  }
  componentWillUnmount() {
        clearTimeout(this.myTimeout);
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
        <Text style={styles2.value}> Enter Password </Text>
        <TextInput style={{height: 45,width: "50%",borderColor: "gray",borderWidth: 2, textAlign:'center', margin: 10}}
//           placeholder="Password"
//           placeholderTextColor="#9a73ef"
           returnKeyType='go'
           secureTextEntry
           autoCorrect={false}
           contextMenuHidden={true}
           disableFullscreenUI={true}
           onChangeText={(value) => this.setState({input_password: value})}
           value={this.state.input_password}
        />
        <View style={styles2.containerrow}>

        <TouchableHighlight style={styles2.button}  onPress={this.checkOperatorPass}>
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


