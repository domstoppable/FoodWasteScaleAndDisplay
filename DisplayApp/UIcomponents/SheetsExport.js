//import React, {Component} from 'react';
//import RNFetchBlob from 'rn-fetch-blob';
import React, {Component} from 'react';
import RNFetchBlob from 'rn-fetch-blob';
import {ToastAndroid } from 'react-native';

//Does an HTTPS update to a Google Forms. Plans to do afetch to Google Sheets API v4 later
//With proper authentication
export const SheetsExport = (formData) => {
        const formURI = 'https://docs.google.com/forms/d/1bdTauz1McigC98QHIEo_4jvB75s0sQBC3SdQrE30xuQ/formResponse';

    	fetch(formURI, {
    		method: 'POST',
    		body: formData,
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
};


