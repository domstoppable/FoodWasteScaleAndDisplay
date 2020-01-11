package com.foodwastescale;

import android.app.Application;

import com.facebook.react.ReactApplication;
//import com.rusel.RCTBluetoothSerial.RCTBluetoothSerialPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.reactnativecommunity.webview.RNCWebViewPackage;
import org.wonday.orientation.OrientationPackage;
import com.RNFetchBlob.RNFetchBlobPackage;
//import io.raks.wakeupapp.ReactNativeWakeUpAppPackage;
import com.melihyarikkaya.rnserialport.RNSerialportPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
//            new RCTBluetoothSerialPackage(),
            new RNGestureHandlerPackage(),
            new RNCWebViewPackage(),
            new OrientationPackage(),
            new RNFetchBlobPackage(),
            //new ReactNativeWakeUpAppPackage(),
            new RNSerialportPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
