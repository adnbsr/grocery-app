package com.sebetim.android;

import android.content.Context;
import android.content.SharedPreferences;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Nullable;

/**
 * Created by adnanbasar on 20/05/2017.
 */

public class LocaleManagerModule extends ReactContextBaseJavaModule {

    private static final String LOCALE = "locale";

    public LocaleManagerModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "LocaleManager";
    }

    private SharedPreferences getSharedPrefs(){
        SharedPreferences sharedPreferences = getReactApplicationContext().getSharedPreferences(getName(), Context.MODE_PRIVATE);
        return sharedPreferences;
    }

    private String getCurrentLocale(){
        return getSharedPrefs().getString(LOCALE, "en");
    }


    @Nullable
    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        constants.put(LOCALE, getCurrentLocale());
        return constants;
    }

    @ReactMethod
    public void setLocale(String locale){
        SharedPreferences preferences = getSharedPrefs();
        SharedPreferences.Editor editor = preferences.edit();
        editor.putString(LOCALE, locale);
        editor.commit();
    }
}
