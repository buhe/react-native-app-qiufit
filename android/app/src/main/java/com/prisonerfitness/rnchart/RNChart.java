package com.prisonerfitness.rnchart;


import android.content.Context;
import android.view.View;

import com.github.mikephil.charting.charts.RadarChart;
import com.github.mikephil.charting.data.RadarData;

/**
 * Created by guguyanhua on 11/26/15.
 */
public class RNChart extends View {
    private final RadarChart radarChart;

    public RNChart(Context context,RadarChart radarChart) {
        super(context);
        this.radarChart = radarChart;
    }

    public void setWebLineWidth(float webLineWidth){
        radarChart.setWebLineWidth(webLineWidth);
        radarChart.invalidate();
    }

    public void setData(RadarData data){
        radarChart.setData(data);
        radarChart.invalidate();
    }
}
