package com.prisonerfitness;

import android.app.Activity;
import cn.reactnative.modules.jpush.JPushPackage;
import android.content.Intent;
import android.os.Bundle;
import android.view.KeyEvent;

import com.brentvatne.react.ReactVideoPackage;
import com.facebook.appevents.AppEventsLogger;
import com.facebook.react.LifecycleState;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactRootView;
import com.facebook.react.modules.core.DefaultHardwareBackBtnHandler;
import com.facebook.react.shell.MainReactPackage;
import com.heng.wechat.WeChatPackage;
import com.i18n.reactnativei18n.ReactNativeI18n;
import com.magus.fblogin.FacebookLoginPackage;
import com.prisonerfitness.rnchart.RNChartPackage;
import com.prisonerfitness.snapshot.RNSnapshotPackage;
import com.rnfs.RNFSPackage;
import com.umeng.analytics.MobclickAgent;

public class MainActivity extends Activity implements DefaultHardwareBackBtnHandler {

    private ReactInstanceManager mReactInstanceManager;
    private ReactRootView mReactRootView;
    private FacebookLoginPackage mFacebookLoginPackage;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        mReactRootView = new ReactRootView(this);
        mFacebookLoginPackage = new FacebookLoginPackage(this);

        mReactInstanceManager = ReactInstanceManager.builder()
                .setApplication(getApplication())
                .setBundleAssetName("index.android.bundle")
                .setJSMainModuleName("index.android")
                .addPackage(new MainReactPackage())
                .addPackage(new JPushPackage())
                .addPackage(new RNChartPackage())
                .addPackage(new ReactVideoPackage())
                .addPackage(new WeChatPackage())
                .addPackage(new RNSnapshotPackage(this))
                .addPackage(new RNFSPackage())
                .addPackage(new ReactNativeI18n())
                .addPackage(mFacebookLoginPackage)
                .setUseDeveloperSupport(BuildConfig.DEBUG)
                .setInitialLifecycleState(LifecycleState.RESUMED)
                .build();

        mReactRootView.startReactApplication(mReactInstanceManager, "PrisonerFitness", null);

        setContentView(mReactRootView);
    }

    @Override
    public boolean onKeyUp(int keyCode, KeyEvent event) {
        if (keyCode == KeyEvent.KEYCODE_MENU && mReactInstanceManager != null) {
            mReactInstanceManager.showDevOptionsDialog();
            return true;
        }
        return super.onKeyUp(keyCode, event);
    }

    @Override
    public void onBackPressed() {
        if (mReactInstanceManager != null) {
            mReactInstanceManager.onBackPressed();
        } else {
            super.onBackPressed();
        }
    }

    @Override
    public void invokeDefaultOnBackPressed() {
        super.onBackPressed();
    }

    @Override
    protected void onPause() {
        super.onPause();
        MobclickAgent.onPause(this);
        AppEventsLogger.deactivateApp(this);
        if (mReactInstanceManager != null) {
            mReactInstanceManager.onPause();
        }
    }

    @Override
    protected void onResume() {
        super.onResume();
        MobclickAgent.onResume(this);
        AppEventsLogger.activateApp(this);
        if (mReactInstanceManager != null) {
            mReactInstanceManager.onResume(this,this);
        }
    }

    @Override
    public void onActivityResult(final int requestCode, final int resultCode, final Intent data) {
        super.onActivityResult(requestCode, resultCode, data);

        // handle onActivityResult
        mFacebookLoginPackage.handleActivityResult(requestCode, resultCode, data);
    }
}
