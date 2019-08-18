#include <HX711_ADC.h>
#include "PIRSensor.h"

HX711_ADC loadCell(3, 2); // DT, SCK
PIRSensor motionSensor(4);
long lastLoadCellUpdate = 0l;

void setup() {
	Serial.begin(9600);

	loadCell.begin();
	loadCell.start(2000);
	loadCell.setCalFactor(696.0); // user set calibration factor (float)

	motionSensor.begin();
}

void loop(){
	long currentTime = millis();

	if(motionSensor.update()){
		if(motionSensor.state){
			Serial.println("m");
		}
	}
	loadCell.update();

	if (currentTime > lastLoadCellUpdate + 1000) {
		float i = loadCell.getData();
		float v = loadCell.getCalFactor();
		Serial.print("w");
		Serial.println(i);
		lastLoadCellUpdate = currentTime;
	}
}