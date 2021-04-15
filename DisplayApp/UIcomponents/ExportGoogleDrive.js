//const fs = require('fs');
//const readline = require('readline');
//const {google} = require('googleapis');
//
//// If modifying these scopes, delete token.json.
//const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
//// The file token.json stores the user's access and refresh tokens, and is
//// created automatically when the authorization flow completes for the first
//// time.
//const TOKEN_PATH = 'token.json';
//
//// Load client secrets from a local file.
//fs.readFile('credentials.json', (err, content) => {
//  if (err) return console.log('Error loading client secret file:', err);
//  // Authorize a client with credentials, then call the Google Sheets API.
//  authorize(JSON.parse(content), listMajors);
//});
//
///**
// * Create an OAuth2 client with the given credentials, and then execute the
// * given callback function.
// * @param {Object} credentials The authorization client credentials.
// * @param {function} callback The callback to call with the authorized client.
// */
//function authorize(credentials, callback) {
//  const {client_secret, client_id, redirect_uris} = credentials.installed;
//  const oAuth2Client = new google.auth.OAuth2(
//      client_id, client_secret, redirect_uris[0]);
//
//  // Check if we have previously stored a token.
//  fs.readFile(TOKEN_PATH, (err, token) => {
//    if (err) return getNewToken(oAuth2Client, callback);
//    oAuth2Client.setCredentials(JSON.parse(token));
//    callback(oAuth2Client);
//  });
//}
//
///**
// * Get and store new token after prompting for user authorization, and then
// * execute the given callback with the authorized OAuth2 client.
// * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
// * @param {getEventsCallback} callback The callback for the authorized client.
// */
//function getNewToken(oAuth2Client, callback) {
//  const authUrl = oAuth2Client.generateAuthUrl({
//    access_type: 'offline',
//    scope: SCOPES,
//  });
//  console.log('Authorize this app by visiting this url:', authUrl);
//  const rl = readline.createInterface({
//    input: process.stdin,
//    output: process.stdout,
//  });
//  rl.question('Enter the code from that page here: ', (code) => {
//    rl.close();
//    oAuth2Client.getToken(code, (err, token) => {
//      if (err) return console.error('Error while trying to retrieve access token', err);
//      oAuth2Client.setCredentials(token);
//      // Store the token to disk for later program executions
//      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
//        if (err) return console.error(err);
//        console.log('Token stored to', TOKEN_PATH);
//      });
//      callback(oAuth2Client);
//    });
//  });
//}
//
///**
// * Prints the names and majors of students in a sample spreadsheet:
// * @see https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
// * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
// */
//let values = [['I AM WRITTEN!', 'wooo']];
//  // [END_EXCLUDE]
//  const resource = {
//    values,
//  };
//
//
//async function listMajors(auth) {
//  const sheets = google.sheets({version: 'v4', auth});
//  sheets.spreadsheets.values.append({spreadsheetId: '1BMGvVbHVg1vUN6WrfTKmq-n_vGwaHRtgNwh0yAxTZ3k',
//                                         range: 'Sheet1!A19',
//                                         valueInputOption:"USER_ENTERED",
//                                         resource,
//                                         })
//  sheets.spreadsheets.values.get({
//    spreadsheetId: '1BMGvVbHVg1vUN6WrfTKmq-n_vGwaHRtgNwh0yAxTZ3k',
//    range: 'Sheet1!A2:E',
//  }, (err, res) => {
//    if (err) return console.log('The API returned an error: ' + err);
//    const rows = res.data.values;
//    if (rows.length) {
//      console.log('Name, Major:');
//      // Print columns A and E, which correspond to indices 0 and 4.
//      rows.map((row) => {
//        console.log(`${row[0]}, ${row[4]}`);
//      });
//    } else {
//      console.log('No data found.');
//    }
//  });
//}
//
import GDrive from "react-native-google-drive-api-wrapper";

import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Component } from 'react';
import DevOptions from './DevOptions';
import { Button, Alert, AppRegistry, TouchableHighlight } from 'react-native';

//import {createStacknavigator} from 'react-navigation';

console.warn('Loaded Homescreen');
export default class ExportGoogleDrive extends Component {
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
    componentDidMount() {
        console.warn('test')
//         GDrive.init();
//          console.warn(GDrive.isInitialized());
    }
  render() {
    const {navigate} = this.props.navigation;
//    const {google} = require('googleapis');

    displayType = this.state.paramstest
    const connected_test = this.props.navigation.getParam('connected_test', 0)
    return (
    //Buttons should be placed in Views so that they can be more modular
    <View style={styles2.container}>

        <View style={styles2.container_col}>
            <TouchableHighlight style={styles2.button} onPress={()=> navigate('HomeScreen', {displayType:'', connected_test})}>
                        <Text>Go back home</Text>
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

