//
//  RCTChartDemo.h
//  PrisonerFitness
//
//  Created by guguyanhua on 11/24/15.
//  Copyright © 2015 Facebook. All rights reserved.
//

#import "PrisonerFitness-Swift.h"

@interface RCTChart : UIView
{
@protected
  NSArray *months;
  NSArray *parties;
}
@property RadarChartView *chartView;
@property (nonatomic) double webLineWidth;
@property (nonatomic) RadarChartData *data;

- (instancetype)initWithFrame:(CGRect)frame withChart:(RadarChartView*) chart;
@end
