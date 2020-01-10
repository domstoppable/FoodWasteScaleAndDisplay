import {PermissionsAndroid} from 'react-native';

export async function requestAppPermissions() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'Write',
        message: 'Write permissions to log',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.warn('You can write');
    } else {
      console.warn('Write External');
      console.warn(granted);
    }

  } catch (err) {
   console.warn('Write External');
    console.warn(err);
  }
  try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera',
          message: 'Camera Permissions Test',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.warn('You can use the camera');
      } else {
        console.warn('Camera')
        console.warn(granted);
      }
    } catch (err) {
      console.warn('Camera')
      console.warn(err);
    }
  try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          {
            title: 'Read',
            message: 'Read permissions to log',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.warn('Read access Get');
        } else {
          console.warn('External Storage');
          console.warn(granted);
        }
      } catch (err) {
        console.warn('External Storage');
        console.warn(err);
      }
}