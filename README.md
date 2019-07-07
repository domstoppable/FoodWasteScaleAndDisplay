# Food waste scale and display

## Firmware
Build and upload with Arduino

## Display app
### Building
* Install [`react-native`](https://facebook.github.io/react-native/docs/getting-started)
* Install the Android SDK
* Make sure the `ANDROID_HOME` environment variable is set appropriately
* Build and test the app
	```bash
	cd ScaleDisplayApp
	npm install
	npm run-android
	```
* Make a native release build and install it ([signing key required](https://facebook.github.io/react-native/docs/signed-apk-android))
	```bash
	cd ScaleDisplayApp/android
	./gradlew assembleRelease
	adb install build/outputs/apk/release/app-release.apk
	cd ..
	```
