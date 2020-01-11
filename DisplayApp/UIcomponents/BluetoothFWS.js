import BluetoothSerial from 'react-native-bluetooth-serial';
import { Buffer } from 'buffer';
global.Buffer = Buffer;

receiveDataFromDevice = async () => {
const response = await BluetoothSerial.readFromDevice();
return response;
}

