
import React, {Component} from 'react';
import {Picker, StyleSheet, Text, View, Button, TouchableHighlight} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import {ToastAndroid } from 'react-native';

const fieldNames = {
    'Timestamp': 'entry.1812376040',
    'Weight': 'entry.21551981',
    'SubjectID': 'entry.757893397',
    'Comments': 'entry.1385450040',
    };
export default function TestGETForm() {

  function _onPressButton() {
        console.warn('Pressed first')
        var formData = new FormData();
        formData.append(fieldNames.Comments, '')
        const formURI = 'https://docs.google.com/forms/d/1bdTauz1McigC98QHIEo_4jvB75s0sQBC3SdQrE30xuQ/formResponse';

    	fetch(formURI, {
    		method: 'GET',
    		data: formData,
    	}).then(response => {
    		if(response.ok){
    			return response.text();
    		}else{
    			console.log(response);
    			throw new Error('Request failed');
    		}
    	}).then(responseBody => {
    		if(responseBody.indexOf('Your response has been recorded.') === -1){
    			throw new Error('Unexpected response');
    		}else{
    			ToastAndroid.show('Data uploaded!', 3000);
    		}
    	}).catch(exception => {
    		console.error('Error while submitting data', exception);
    		ToastAndroid.show('Error while submitting data: ' + exception);
    	});
  }
  return (

    <View>
      <TouchableHighlight style={{alignItems:'center', margin:10, height:"100%"}} onPress={_onPressButton}>
        <Text>Get Data! Oops...</Text>

      </TouchableHighlight>
    </View>
  )
}