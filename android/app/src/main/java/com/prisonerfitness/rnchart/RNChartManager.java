package com.prisonerfitness.rnchart;

import android.graphics.Color;

import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.uimanager.ReactProp;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.github.mikephil.charting.charts.RadarChart;
import com.github.mikephil.charting.components.Legend;
import com.github.mikephil.charting.components.XAxis;
import com.github.mikephil.charting.components.YAxis;
import com.github.mikephil.charting.data.Entry;
import com.github.mikephil.charting.data.RadarData;
import com.github.mikephil.charting.data.RadarDataSet;

import java.util.ArrayList;

/**
 * Created by guguyanhua on 11/25/15.
 */
public class RNChartManager extends SimpleViewManager<RadarChart> {

    @ReactProp(name = "webLineWidth")
    public void setWebLineWidth(RadarChart radarChart, float webLineWidth) {
        radarChart.setWebLineWidth(webLineWidth);
        radarChart.invalidate();
    }
    @ReactProp(name = "drawWeb")
    public void setDrawFilled(RadarChart radarChart, boolean drawWeb){
        radarChart.setDrawWeb(drawWeb);
        radarChart.invalidate();
    }

    @ReactProp(name = "data")
    public void setData(RadarChart radarChart, ReadableMap json) {

        ArrayList<Entry> yVals1 = new ArrayList<>();
        ArrayList<String> xVals1 = new ArrayList<>();

        ReadableArray x = json.getArray("x");
        ReadableArray y = json.getArray("y");
        String dataColor = json.getString("dataColor");

        // IMPORTANT: In a PieChart, no values (Entry) should have the same
        // xIndex (even if from different DataSets), since no values can be
        // drawn above each other.
        for (int i = 0; i < y.size(); i++) {
            yVals1.add(new Entry((float) y.getDouble(i), i));
        }

        for (int i = 0; i < x.size(); i++) {
            xVals1.add(x.getString(i));
        }
        radarChart.setSkipWebLineCount(x.size() + 1);  //TODO skip all center line
        radarChart.setWebColor(Color.argb(125, 255, 255, 255));
        XAxis xAxis = radarChart.getXAxis();
        //TODO export
        xAxis.setTextSize(15f);
        xAxis.setTextColor(Color.WHITE);
        //export end

//        xAxis.setDrawAxisLine(false);
//        xAxis.setDrawGridLines(false);
//        xAxis.setDrawLabels(false);
//        xAxis.setDrawLimitLinesBehindData(true);


        RadarDataSet set1 = new RadarDataSet(yVals1, "Set 1");
//        set1.setDrawValues(false);
//        set1.setDrawHighlightIndicators(false);
//        set1.setDrawHorizontalHighlightIndicator(false);
//        set1.setDrawVerticalHighlightIndicator(false);
        set1.setColor(Color.parseColor(dataColor));

        //TODO disable draw fill
        set1.setDrawFilled(false);


        ArrayList<RadarDataSet> sets = new ArrayList<>();
        sets.add(set1);

        RadarData data = new RadarData(xVals1, sets);
        data.setValueTextSize(8f);
        data.setDrawValues(false);

        radarChart.setData(data);
//        radarChart.setBackgroundColor(Color.RED);

        radarChart.invalidate();
    }


    @Override
    public String getName() {
        return "RCTChart";
    }

    @Override
    protected RadarChart createViewInstance(ThemedReactContext reactContext) {
        RadarChart mChart = new RadarChart(reactContext);

        mChart.setDescription("");

        mChart.setWebLineWidth(1.5f);
        mChart.setWebLineWidthInner(0.75f);
        mChart.setWebAlpha(100);

        XAxis xAxis = mChart.getXAxis();
        xAxis.setTextSize(9f);

        YAxis yAxis = mChart.getYAxis();
        yAxis.setLabelCount(5, false);
        yAxis.setTextSize(9f);
        yAxis.setStartAtZero(true);

        Legend l = mChart.getLegend();
        l.setEnabled(false);
        return mChart;
    }
}
