

import React, {Component} from 'react';
import {Picker, StyleSheet, Text, View, Button, TouchableHighlight} from 'react-native';
//import RNFetchBlob from 'rn-fetch-blob';
import {ToastAndroid } from 'react-native';
import {Device, BleManager} from 'react-native-ble-plx';
import RNBluetoothClassic, { BTEvents } from 'react-native-bluetooth-classic';
//import {ble} from '../index';
const fieldNames = {
    'Timestamp': 'entry.1812376040',
    'Weight': 'entry.21551981',
    'SubjectID': 'entry.757893397',
    'Comments': 'entry.1385450040',
    };

 const userDataServiceUUID = '0000181C-0000-1000-8000-00805F9B34FB'; // assigned number 0x2A8E to the base specification UUID
 const heightCharacteristicUUID = '00002A8E-0000-1000-8000-00805F9B34FB'; // assigned number 0x2A8E to the base specification UUID

//1) Need to scan for devices
//2) Need to connect to said device
//3) Need to start reading the data
//device = {'name': 'DSD TECH HC-05', 'id': '00-14-03-06-2F-D9'}
deviceID = '00:14:03:06:2F:D9'
//deviceID = '00:1B:68:30:7F:C3'
//let ble = RNBluetoothClassic()
//console.log("Manager 1", ble)
//ble.destroy()
//ble = new BleManager()
export default function BluetoothClassicReader() {
  function test(){
//    device. =

    RNBluetoothClassic.connect(deviceID)
      .then(() => {
        // Success code
        console.warn('Connected');
      })
      .catch((error) => {
        // Failure code
//        const readCharacteristic =  device.readCharacteristicForService(deviceID);
        console.warn(error);
      });
//    const readCharacteristic = await device.readCharacteristicForService(deviceID); // assuming the device is already connected
//     const heightInCentimeters = Buffer.from(readCharacteristic.value, 'base64').readUInt16LE(0);
  }
  function _stopScans(){
    ble.stopDeviceScan();

  }
  async function getData(){
    console.warn('Getting Data')
//    let message1 = await RNBluetoothClassic.readFromDevice();
//    console.warn(message1);
    let message2 = await RNBluetoothClassic.readUntilDelimiter('\n');
    console.warn(message2);
    console.warn('Is this really async')
  }
  function scanAndConnect() {
      ble.startDeviceScan(null, null, (error, device) => {
          if (error) {
              // Handle error (scanning will be stopped automatically)
              return;
          }

          // Check if it is a device you are looking for based on advertisement data
          // or other criteria.
          console.warn(device.name);
          console.warn(device.id);
          console.warn(device);
          if (device.id === '00:14:03:06:2F:D9' ||
              device.name === 'SensorTag') {
              console.warn('found the device!!!')
              // Stop scanning as it's not necessary if you are scanning for one device.
              ble.stopDeviceScan();
            ble.connect(device, {
                autoconnect: true,})
              // Proceed with connection.
          }
      });
  }
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
//    componentDidMount() {
//      this.onRead = RNBluetoothClassic.addListener(BTEvents.READ, this.handleRead, this);
//    }
//
//    componentWillUnmount() {
//      this.onRead.remove();
//    }
  return (

    <View>

      <TouchableHighlight style={{alignItems:'center', margin:10, height:"30%"}} onPress={scanAndConnect}>
        <Text>Scan devices</Text>
        </TouchableHighlight>


        <TouchableHighlight style={{alignItems:'center', margin:10, height:"30%"}} onPress={getData}>
                <Text>GET DATA</Text>
      </TouchableHighlight>


      <TouchableHighlight style={{alignItems:'center', margin:10, height:"30%"}} onPress={test}>
              <Text>Attempt to connect</Text>

            </TouchableHighlight>
    </View>
  )
}


