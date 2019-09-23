
import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Component } from 'react';
import DevOptions from './DevOptions';
import { Button, Alert, AppRegistry } from 'react-native';
//import {createStacknavigator} from 'react-navigation';


console.warn('Loaded Homescreen');
export default class HomeScreen extends Component {
    constructor(){
        super();
        this.isDeveloper='This is the Homescreen'
        this.state = {displayType:'Welcome'}
//        this.paramstest = props.navigation.state.params.displayType
    }
    // Somehow the title screen is read from navigationOptions
    //Difference of having navigations inside or outside render options?
      static navigationOptions = {
        title: 'Welcome'
      };

  render() {
    const {navigate} = this.props.navigation;
//    displayType=this.props.navigation.state.params.displayType ? this.props.navigation.state.params.displayType :'No Value Passed'//This is how we can access display types
    displayType = this.state.paramstest
    const connected_test = this.props.navigation.getParam('connected_test', 0)
//    console.warn('Test2')
//    console.warn('Trying displayType')
//    console.warn(displayType)
    return (
    //Buttons should be placed in Views so that they can be more modular
    <View>

      <Button
        title='I guess not'
        onPress={()=> navigate('DevOptions', {displayType:'Test', connected_test})}
      />
      <Text>connected_test: {JSON.stringify(connected_test)}</Text>
      </View>
    );
  }
}

