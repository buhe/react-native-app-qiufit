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

    @ReactProp(name = "data")
    public void setData(RadarChart radarChart, ReadableMap json) {
//        RadarDataSet dataSet = new RadarDataSet();
        System.out.println(json);

        ArrayList<Entry> yVals1 = new ArrayList<>();
        ArrayList<String> xVals1 = new ArrayList<>();

        ReadableArray x = json.getArray("x");
        ReadableArray y = json.getArray("y");

        // IMPORTANT: In a PieChart, no values (Entry) should have the same
        // xIndex (even if from different DataSets), since no values can be
        // drawn above each other.
        for (int i = 0; i < y.size(); i++) {
            yVals1.add(new Entry((float) y.getDouble(i), i));
        }

        for (int i = 0; i < x.size(); i++) {
            xVals1.add(x.getString(i));
        }

        RadarDataSet set1 = new RadarDataSet(yVals1, "Set 1");
        set1.setColor(Color.rgb(192, 255, 140));
        set1.setDrawFilled(true);
        set1.setLineWidth(2f);


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
        l.setPosition(Legend.LegendPosition.RIGHT_OF_CHART);
        l.setXEntrySpace(7f);
        l.setYEntrySpace(5f);
        return mChart;
    }
}
