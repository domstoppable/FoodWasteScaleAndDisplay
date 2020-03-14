#include <HX711_ADC.h>
#include "PIRSensor.h"

HX711_ADC loadCell(2, 3); // DT, SCK
long lastLoadCellUpdate = 0l;

PIRSensor motionSensor(4);

int ledPin = 11;
long ledOnTime = 0l;

void setup() {
	Serial.begin(9600);

	loadCell.begin();
	loadCell.start(2000);
	loadCell.setCalFactor(696.0); // user set calibration factor (float)

	pinMode(ledPin, OUTPUT);
	motionSensor.begin();
}

void loop(){
	long currentTime = millis();

	if(motionSensor.update()){
		if(motionSensor.state){
			Serial.println("m");
		}
    digitalWrite(ledPin, HIGH);
    ledOnTime = currentTime;
	}
	loadCell.update();

	if (currentTime > lastLoadCellUpdate + 1000l) {
		float i = loadCell.getData();
		float v = loadCell.getCalFactor();
		Serial.print("w");
		Serial.println(i);
		lastLoadCellUpdate = currentTime;
	}
        
	if(ledOnTime > 0l && currentTime > ledOnTime + 1000l){
		ledOnTime = 0l;
		digitalWrite(ledPin, LOW);
	}
}
