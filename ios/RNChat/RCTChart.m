//
//  RCTChartDemo.m
//  PrisonerFitness
//
//  Created by guguyanhua on 11/24/15.
//  Copyright © 2015 Facebook. All rights reserved.
//

#import "RCTChart.h"

@implementation RCTChart

/*
// Only override drawRect: if you perform custom drawing.
// An empty implementation adversely affects performance during animation.
- (void)drawRect:(CGRect)rect {
    // Drawing code
@property (nonatomic)  (nonatomic)  (nonatomic) */


- (instancetype)initWithFrame:(CGRect)frame withChart:(RadarChartView*) chart
{
  self = [super initWithFrame:frame];
  if (self) {
    _chartView = chart;
    [self addSubview:_chartView];
  }
  return self;
}

-(void) setWebLineWidth:(double) webLineWidth{
  _webLineWidth = webLineWidth;
  _chartView.webLineWidth = webLineWidth;
}

-(void) setData:(RadarChartData *)data{
  _chartView.data = data;
}


@end
