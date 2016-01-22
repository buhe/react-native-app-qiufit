//
//  RCTConvert+RNChart.h
//  PrisonerFitness
//
//  Created by guguyanhua on 11/25/15.
//  Copyright © 2015 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "RCTConvert.h"
#if defined (EN)
#import "PrisonerFitnessEn-Swift.h"
#else
#import "PrisonerFitness-Swift.h"
#endif

@interface RCTConvert(RadarChartView)
+ (RadarChartData*)RadarChartData:(id)json;
@end
