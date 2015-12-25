package com.prisonerfitness.snapshot;

import android.app.Activity;
import android.graphics.Bitmap;
import android.view.View;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.io.File;
import java.io.FileOutputStream;

/**
 * Created by guguyanhua on 12/25/15.
 */
public class RNSnapshotMoudle extends ReactContextBaseJavaModule {

    private final Activity activity;

    public RNSnapshotMoudle(ReactApplicationContext reactContext, Activity activity) {
        super(reactContext);
        this.activity = activity;
    }

    @Override
    public String getName() {
        return "SnapshotAndroid";
    }

    public int getStatusBarHeight() {
        int result = 0;
        int resourceId = activity.getResources().getIdentifier("status_bar_height", "dimen", "android");
        if (resourceId > 0) {
            result = activity.getResources().getDimensionPixelSize(resourceId);
        }
        return result;
    }

    @ReactMethod
    public void saveSnapshotToPath(int reactTag/*ignore .. 暂时只能全屏*/, String path, Callback callback) {
        try {
            int statusBarHeight = getStatusBarHeight();
            View tempView = activity.getWindow().getDecorView();
            //View tempView = button; //获取 Button 的截图
            tempView.setDrawingCacheEnabled(true);

            Bitmap bitmap = tempView.getDrawingCache();
            tempView.setDrawingCacheEnabled(false);
            //获得除掉 StatusBar 的 Bitmap
            bitmap = Bitmap.createBitmap(bitmap, 0, statusBarHeight, bitmap.getWidth(),
                    bitmap.getHeight() - statusBarHeight, null, true);

            File f = new File(path);
            if (f.exists()) {
                f.delete();
            }

            FileOutputStream out = new FileOutputStream(f);
            bitmap.compress(Bitmap.CompressFormat.PNG, 100, out);
            out.flush();
            out.close();
            callback.invoke(true);
        } catch (Exception e) {
            callback.invoke(false);
        }
    }
}
