//package com.prisonerfitness;
//
//import android.app.Activity;
//import android.content.Intent;
//import android.os.Bundle;
//import android.os.Handler;
//
//import com.facebook.react.ReactInstanceManager;
//
///**
// * Created by guguyanhua on 12/10/15.
// */
//public class Splash extends Activity {
//
//    /**
//     * Duration of wait
//     **/
//    private final int SPLASH_DISPLAY_LENGTH = 1000;
//    public static ReactInstanceManager mReactInstanceManager;
//
//    /**
//     * Called when the activity is first created.
//     */
//    @Override
//    public void onCreate(Bundle icicle) {
//        super.onCreate(icicle);
//        setContentView(R.layout.splashscreen);
//        new Handler().postDelayed(new Runnable() {
//
//            @Override
//            public void run() {
//                Intent i = new Intent(Splash.this, MainActivity.class);
//                startActivity(i);
//                finish();
//            }
//        }, SPLASH_DISPLAY_LENGTH);
//    }
//
//
//}
