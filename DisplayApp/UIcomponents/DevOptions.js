
import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Component } from 'react';
import { Button, Alert, AppRegistry } from 'react-native';
import {TouchableHighlight} from 'react-native';
import HomeScreen from './HomeScreen'
import ProcessArduino from './ProcessArduino';
//import {createStacknavigator} from 'react-navigation';

export default class DevOptions extends Component {
    constructor(){
        super();
        this.devText='Dev options';
//        this.state = {displayType: 'Baseline'}
    }

    //NavigationOptions somehow gets read into the screen
  static navigationOptions = {
    title: 'This is now the Developer screen!!',
  };

  render() {
    //The master app container contains the navigation object. We need to access that to change to the next screen
    const {navigate} = this.props.navigation;
    const connected_test = this.props.navigation.getParam('connected_test', 0)
    return (
    //Buttons should be placed in Views to make it more modular
    <View style={{flex:1}}>
      <TouchableHighlight onPress={()=> navigate('HomeScreen', {displayType:'Baseline', connected_test})}>
        <Text> ={'Ayy'} </Text>

      </TouchableHighlight>
      <Button
              title={'Numeric'}
              onPress={()=> navigate('HomeScreen', {displayType:'uh', connected_test})}

        />
        <Button
                title={'Ambient'}
                onPress={()=> navigate('HomeScreen', {name:'uh', connected_test})}

              />
      <Button
              title={'Metaphoric'}
              onPress={()=> navigate('HomeScreen', {name:'uh', connected_test})}

            />

      <Button
                    title={'Arduino Values'}
                    onPress={()=> navigate('ProcessArduino', {name:'uh', connected_test})}

                  />
      </View>
    );
  }
}