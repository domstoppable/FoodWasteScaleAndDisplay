

import * as React from 'react';
import { Text, View, StyleSheet , TextInput, TouchableHighlight} from 'react-native';
import { Component } from 'react';
import DevOptions from './DevOptions';
import { Button, Alert, AppRegistry } from 'react-native';
//import {createStacknavigator} from 'react-navigation';


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


      //If true, do nothing.
       //Do something
       navigation.state.params.onSelect({weightOffset: this.state.weight})

  }
  checkNo = () => {
        const {navigation} = this.props;
        navigation.goBack();


        //If false, ??? something about adding back weight
        //Do something
        navigation.state.params.onSelect({weightOffset: 0})
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
        <View style={styles2.containerrow}>
        <Text style={styles2.value}> We detected a weight reduction, {"\n"}
        please select the following: </Text>
        <TouchableHighlight style={styles2.button}  onPress={()=> this.checkYes()}>
                    <Text style={{color:'white'}}>Emptying the trash</Text>
                  </TouchableHighlight>
          <TouchableHighlight style={styles2.button}  onPress={()=> this.checkNo()}>
                              <Text style={{color:'white'}}>Removing item from trash</Text>
                            </TouchableHighlight>
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


