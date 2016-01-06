//
//  RCTConvert+RNChart.m
//  PrisonerFitness
//
//  Created by guguyanhua on 11/25/15.
//  Copyright © 2015 Facebook. All rights reserved.
//

#import "RCTConvert+RadarChartView.h"

@implementation RCTConvert(RadarChartView)
+ (RadarChartData*)RadarChartData:(id)json
{

  NSArray *originY = json[@"y"];
  NSMutableArray *yVals2 = [[NSMutableArray alloc] init];
  
  for (int i = 0; i < originY.count; i++)
  {
    [yVals2 addObject:[[ChartDataEntry alloc] initWithValue:((NSNumber*)originY[i]).doubleValue xIndex:i]];
  }
  
  RadarChartDataSet *set2 = [[RadarChartDataSet alloc] initWithYVals:yVals2 label:@"Y"];
  [set2 setColor:[UIColor whiteColor]];
  set2.drawFilledEnabled = NO;
  set2.lineWidth = 1.0;
  
  
  RadarChartData *data = [[RadarChartData alloc] initWithXVals:json[@"x"] dataSets:@[set2]];
  [data setValueFont:[UIFont fontWithName:@"HelveticaNeue-Light" size:8.f]];
  [data setDrawValues:NO];

  return data;
}
@end
