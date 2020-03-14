#include <SoftwareSerial.h>
#include <HX711_ADC.h>
#include "PIRSensor.h"

HX711_ADC loadCell(2, 3); // DT, SCK
long lastLoadCellUpdate = 0l;

PIRSensor motionSensor(4);

int ledPin = 11;
long ledOnTime = 0l;

SoftwareSerial bluetoothSerial(9, 8); // RX, TX

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

	if(motionSensor.update()){
		if(motionSensor.state && ledOnTime == 0l){
			bluetoothSerial.println("m");
			Serial.println("Motion detected!");
		}
		digitalWrite(ledPin, HIGH);
		ledOnTime = currentTime;
	}
	loadCell.update();

	if (currentTime > lastLoadCellUpdate + 1000l) {
		float i = loadCell.getData();
		float v = loadCell.getCalFactor();

		bluetoothSerial.print("w");
		bluetoothSerial.println(i);
   
		Serial.print("Sending weight: ");
		Serial.println(i);

		lastLoadCellUpdate = currentTime;
	}
        
	if(ledOnTime > 0l && currentTime > ledOnTime + 1000l){
		ledOnTime = 0l;
		Serial.println("Disabling LED");
		digitalWrite(ledPin, LOW);
	}
}
