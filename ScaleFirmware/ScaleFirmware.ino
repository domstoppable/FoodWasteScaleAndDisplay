#include <SoftwareSerial.h>
#include "HX711_ADC.h"
#include "PIRSensor.h"

HX711_ADC loadCell(2, 3); // DT, SCK
long lastLoadCellUpdate = 0l;

PIRSensor motionSensor(4);

int ledPin = 11;
long ledOnTime = 0l;
float curWeight = 0;
float calibrationFactor = -5096;
String inputString = "";
SoftwareSerial bluetoothSerial(8, 9); // RX, TX

void setup() {
	Serial.begin(9600);
	Serial.println("Initializing...");
  
	pinMode(ledPin, OUTPUT);

	digitalWrite(ledPin, HIGH);
  	delay(100);
	digitalWrite(ledPin, LOW);

	bluetoothSerial.begin(9600);

	loadCell.begin();
	loadCell.start(2000);
	loadCell.setCalFactor(696.0); // user set calibration factor (float)

	motionSensor.begin();

	for(int i=0; i<3; i++){
		digitalWrite(ledPin, HIGH);
		delay(100);
		digitalWrite(ledPin, LOW);
		delay(100);
	}

	Serial.println("Setup complete! Starting loop...");
}

void loop(){
	long currentTime = millis();

	//if(motionSensor.update()){
	//	if(motionSensor.state && ledOnTime == 0l){
//			bluetoothSerial.println("m");
//      Serial.print("m");
//			Serial.println("Motion detected!");
		///}
		//digitalWrite(ledPin, HIGH);
		//ledOnTime = currentTime;
	//}
	loadCell.update();

	if (currentTime > lastLoadCellUpdate + 1000) {
		curWeight = loadCell.getData()*453.592;
    float i =  int(curWeight); //grams //float(int(curWeight/10))/100; //kg
		float v = loadCell.getCalFactor();

		bluetoothSerial.print("w");
		bluetoothSerial.println(i);
   Serial.print("Calibration Factor: ");
   Serial.print(calibrationFactor);
   Serial.print("Sending weight: ");
   Serial.println(i);
//		Serial.print("Sending weight: ");
//		Serial.println(i);

		lastLoadCellUpdate = currentTime;
	}
        
//	if(ledOnTime > 0l && currentTime > ledOnTime + 1000){
//		ledOnTime = 0l;
//		Serial.println("Disabling LED");
//		digitalWrite(ledPin, LOW);
//	}
 if(bluetoothSerial.available()>0)
  {
//    bluetoothSerial.println("P");
    char temp = bluetoothSerial.read();
    Serial.println(temp);
    if(temp == 't'){
      loadCell.tare(); //Reset the scale to 0
      bluetoothSerial.println("R");
    }
    else if(temp == 'a'){
      calibrationFactor += 500;
      loadCell.setCalFactor(calibrationFactor);
      bluetoothSerial.println("A");
    }
    else if(temp == 'z'){
      calibrationFactor -= 500;
      loadCell.setCalFactor(calibrationFactor);
      bluetoothSerial.println("Z");
    }
    else if(temp == 's'){
      calibrationFactor += 50;
      loadCell.setCalFactor(calibrationFactor);
      bluetoothSerial.println("A");
    }
    else if(temp == 'x'){
      calibrationFactor -= 50;
      loadCell.setCalFactor(calibrationFactor);
      bluetoothSerial.println("Z");
    }
    else if(temp=='g'){
      bluetoothSerial.print('g');
      bluetoothSerial.println(calibrationFactor);
      
    }
    else if(temp=='h'){
      delay(1000);
      float temp2 = bluetoothSerial.parseInt();
      
//      while(bluetoothSerial.available()>0){
//        delay(100);
//        char inChar = bluetoothSerial.read();
//        Serial.println(inChar);
//        inputString += inChar; 
//      }
////      float temp3 = bluetoothSerial.parseInt();
//      Serial.println(inputString);
//      inputString = "";
      calibrationFactor = float(temp2);
//      bluetoothSerial.println(temp2);
      Serial.println(calibrationFactor);
      loadCell.setCalFactor(calibrationFactor);
    }
      
      
      
  }
}
