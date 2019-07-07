class PIRSensor{
	public:
		int state = LOW;
		int pin = -1;

		PIRSensor(int pin){
			this->pin = pin;
		}

		void begin(){
			pinMode(pin, INPUT);
		}

		bool update(){
			int val = digitalRead(pin);
			bool changed = state != val;
			state = val;

			return changed;
		}
};