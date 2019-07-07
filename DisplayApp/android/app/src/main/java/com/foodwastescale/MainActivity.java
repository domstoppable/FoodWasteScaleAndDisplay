package com.foodwastescale;

import android.os.Bundle;
import com.facebook.react.ReactActivity;
import io.raks.wakeupapp.RNWakeUpApp;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "FoodWasteScale";
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        RNWakeUpApp.sendEvent(savedInstanceState);
    }
}
