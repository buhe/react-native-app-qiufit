//
//  RCTConvert+RNChart.h
//  PrisonerFitness
//
//  Created by guguyanhua on 11/25/15.
//  Copyright © 2015 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "RCTConvert.h"
#import "PrisonerFitness-Swift.h"

@interface RCTConvert(RadarChartView)
+ (RadarChartData*)RadarChartData:(id)json;
@end
