//
//  RCTChartDemo.h
//  PrisonerFitness
//
//  Created by guguyanhua on 11/24/15.
//  Copyright © 2015 Facebook. All rights reserved.
//

#import "PrisonerFitness-Swift.h"

@interface RCTChartDemo : UIView
{
@protected
  NSArray *months;
  NSArray *parties;
}
@property RadarChartView *chartView;
@property double webLineWidth;
@property RadarChartData *data;
@end
