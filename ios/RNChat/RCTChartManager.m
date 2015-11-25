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
#import "RCTMap.h"

@implementation RCTChartManager
RCT_EXPORT_MODULE()
RCT_EXPORT_VIEW_PROPERTY(webLineWidth, double);
RCT_CUSTOM_VIEW_PROPERTY(region, MKCoordinateRegion, RCTMap)
{
  [view setRegion:json ? [RCTConvert MKCoordinateRegion:json] : defaultView.region animated:YES];
}
- (UIView *)view
{
  return [[RCTChartDemo alloc] initWithFrame:CGRectMake(0, 0, 300, 300)];
}
@end
