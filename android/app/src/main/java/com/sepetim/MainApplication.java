package com.sepetim;

import android.support.annotation.Nullable;

import com.airbnb.android.react.maps.MapsPackage;
import com.azendoo.reactnativesnackbar.SnackbarPackage;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;
import com.oblador.vectoricons.VectorIconsPackage;
import com.reactnativenavigation.NavigationApplication;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends NavigationApplication {

    @Nullable
    @Override
    public List<ReactPackage> createAdditionalReactPackages() {
        return Arrays.<ReactPackage>asList(
                new VectorIconsPackage(),
                new SnackbarPackage(),
                new MapsPackage()
        );
    }

    @Override
    public boolean isDebug() {
        return BuildConfig.DEBUG;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        SoLoader.init(this, /* native exopackage */ false);
    }
}
