//
//  RCTChartManager.m
//  PrisonerFitness
//
//  Created by guguyanhua on 11/24/15.
//  Copyright © 2015 Facebook. All rights reserved.
//

#import "RCTChartManager.h"

#if defined (EN)
#import "PrisonerFitnessEn-Swift.h"
#else
#import "PrisonerFitness-Swift.h"
#endif

#import "RCTChart.h"
#import "RCTConvert+RadarChartView.h"


@implementation RCTChartManager
RCT_EXPORT_MODULE()
RCT_EXPORT_VIEW_PROPERTY(webLineWidth, double);
RCT_CUSTOM_VIEW_PROPERTY(data, RadarChartData, RCTChart)
{
  RadarChartData *data = json ? [RCTConvert RadarChartData:json] : nil;
  view.data = data;
  
}
- (UIView *)view
{
  RadarChartView *chartView =  [[RadarChartView alloc] initWithFrame:CGRectMake(0, 0, 300, 300)];
  chartView.descriptionText = @"";
  chartView.webLineWidth = .75;
  chartView.innerWebLineWidth = 0.375;
  chartView.webAlpha = 1.0;
  chartView.userInteractionEnabled = NO;
//  BalloonMarker *marker = [[BalloonMarker alloc] initWithColor:[UIColor colorWithWhite:180/255. alpha:1.0] font:[UIFont systemFontOfSize:12.0] insets: UIEdgeInsetsMake(8.0, 8.0, 20.0, 8.0)];
//  marker.minimumSize = CGSizeMake(80.f, 40.f);
//  chartView.marker = marker;
  
  ChartXAxis *xAxis = chartView.xAxis;
  xAxis.labelFont = [UIFont fontWithName:@"HelveticaNeue-Light" size:12.f];
  xAxis.labelTextColor = [UIColor whiteColor];
  
  ChartYAxis *yAxis = chartView.yAxis;
  yAxis.labelFont = [UIFont fontWithName:@"HelveticaNeue-Light" size:9.f];
  yAxis.labelCount = 11;
  yAxis.forceLabelsEnabled = YES;
  yAxis.customAxisMax = 10;
  yAxis.customAxisMin = 0;
  yAxis.drawLabelsEnabled = NO;
  yAxis.startAtZeroEnabled = YES;

  
  ChartLegend *l = chartView.legend;
  l.enabled = NO;
  
  
  RCTChart *chartViewWarpper =  [[RCTChart alloc] initWithFrame:CGRectMake(0, 0, 300, 300) withChart:chartView];
  return chartViewWarpper;
}
@end
