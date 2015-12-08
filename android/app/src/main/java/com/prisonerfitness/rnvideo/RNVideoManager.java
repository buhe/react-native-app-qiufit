package com.prisonerfitness.rnvideo;

import android.net.Uri;
import android.view.MotionEvent;
import android.view.View;
import android.widget.VideoView;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.ReactProp;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.events.RCTEventEmitter;

/**
 * Created by guguyanhua on 12/4/15.
 */
public class RNVideoManager extends SimpleViewManager<VideoView> {

    @ReactProp(name = "url")
    public void setUrl(VideoView player, String url) {
        VideoUrl videoUrl = new VideoUrl();
        videoUrl.setFormatName("720P");
//        videoUrl1.setFormatUrl(url);
        videoUrl.setFormatUrl("http://7xkbzx.com1.z0.glb.clouddn.com/SampleVideo_1080x720_10mb.mp4");

        if (videoUrl.isOnlineVideo()) {
            player.setVideoPath(videoUrl.getFormatUrl());
        } else {
            Uri uri = Uri.parse(videoUrl.getFormatUrl());
            player.setVideoURI(uri);
        }
        player.setVisibility(View.VISIBLE);
        player.start();
    }


    @ReactProp(name = "paused")
    public void setPaused(VideoView videoView, boolean paused) {
        if(paused) {
            videoView.pause();
        }else{
            videoView.start();
        }
    }

    public void setMuted(VideoView videoView,boolean muted) {
        if(muted){
        }
    }

    @Override
    public String getName() {
        return "RCTVideo";
    }

    @Override
    protected VideoView createViewInstance(final ThemedReactContext reactContext) {
        final VideoView videoView = new VideoView(reactContext);
        videoView.setOnTouchListener(new View.OnTouchListener() {
            @Override
            public boolean onTouch(View v, MotionEvent event) {
//                WritableMap nativeEvent = Arguments.createMap();
//                nativeEvent.putString("message", "MyMessage");
//                reactContext.getJSModule(RCTEventEmitter.class).receiveEvent(
//                        videoView.getId(),
//                        "topPress",
//                        nativeEvent);
                if(event.getAction() == MotionEvent.ACTION_DOWN){
                    WritableMap nativeEvent = Arguments.createMap();
                    nativeEvent.putString("type", "touch");
                    reactContext.getJSModule(RCTEventEmitter.class).receiveEvent(
                            videoView.getId(),
                            "topChange",
                            nativeEvent);
                    return true;
                }else{
                    return false;
                }

            }
        });
        videoView.requestFocus();
        return videoView;
    }

}
