//
//  RCTChartManager.m
//  PrisonerFitness
//
//  Created by guguyanhua on 11/24/15.
//  Copyright © 2015 Facebook. All rights reserved.
//

#import "RCTChartManager.h"
#import "PrisonerFitness-Swift.h"
#import "RCTChartDemo.h"
#import "RCTConvert+RadarChartView.h"


@implementation RCTChartManager
RCT_EXPORT_MODULE()
RCT_EXPORT_VIEW_PROPERTY(webLineWidth, double);
RCT_CUSTOM_VIEW_PROPERTY(data, RadarChartData, RCTChartDemo)
{
  RadarChartData *data = json ? [RCTConvert RadarChartData:json] : nil;
  view.data = data;
  
}
- (UIView *)view
{
//  RadarChartView *chartView =  [[RadarChartView alloc] initWithFrame:CGRectMake(0, 0, 300, 300)];
//  chartView.descriptionText = @"";
//  chartView.webLineWidth = .75;
//  chartView.innerWebLineWidth = 0.375;
//  chartView.webAlpha = 1.0;
//  
//  BalloonMarker *marker = [[BalloonMarker alloc] initWithColor:[UIColor colorWithWhite:180/255. alpha:1.0] font:[UIFont systemFontOfSize:12.0] insets: UIEdgeInsetsMake(8.0, 8.0, 20.0, 8.0)];
//  marker.minimumSize = CGSizeMake(80.f, 40.f);
//  chartView.marker = marker;
//  
//  ChartXAxis *xAxis = chartView.xAxis;
//  xAxis.labelFont = [UIFont fontWithName:@"HelveticaNeue-Light" size:9.f];
//  
//  ChartYAxis *yAxis = chartView.yAxis;
//  yAxis.labelFont = [UIFont fontWithName:@"HelveticaNeue-Light" size:9.f];
//  yAxis.labelCount = 5;
//  yAxis.startAtZeroEnabled = YES;
//  
//  ChartLegend *l = chartView.legend;
//  l.position = ChartLegendPositionRightOfChart;
//  l.font = [UIFont fontWithName:@"HelveticaNeue-Light" size:10.f];
//  l.xEntrySpace = 7.0;
//  l.yEntrySpace = 5.0;
//  
//  return chartView;
  
  
  RCTChartDemo *chartView =  [[RCTChartDemo alloc] initWithFrame:CGRectMake(0, 0, 300, 300)];
  return chartView;
}
@end
