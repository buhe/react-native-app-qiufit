//
//  RCTChartDemo.m
//  PrisonerFitness
//
//  Created by guguyanhua on 11/24/15.
//  Copyright © 2015 Facebook. All rights reserved.
//

#import "RCTChartDemo.h"

@implementation RCTChartDemo

/*
// Only override drawRect: if you perform custom drawing.
// An empty implementation adversely affects performance during animation.
- (void)drawRect:(CGRect)rect {
    // Drawing code
@property (nonatomic)  (nonatomic)  (nonatomic) */


- (instancetype)initWithFrame:(CGRect)frame
{
  self = [super initWithFrame:frame];
  if (self) {
    months = @[
               @"Jan", @"Feb", @"Mar", @"Apr", @"May", @"Jun", @"Jul", @"Aug", @"Sep",
               @"Oct", @"Nov", @"Dec"
               ];
    
    parties = @[
                @"Party A", @"Party B", @"Party C", @"Party D", @"Party E", @"Party F",
                @"Party G", @"Party H", @"Party I", @"Party J", @"Party K", @"Party L",
                @"Party M", @"Party N", @"Party O", @"Party P", @"Party Q", @"Party R",
                @"Party S", @"Party T", @"Party U", @"Party V", @"Party W", @"Party X",
                @"Party Y", @"Party Z"
                ];
    _chartView = [[RadarChartView alloc]initWithFrame:CGRectMake(0, 0, 300, 300)];
    _chartView.descriptionText = @"";
    _chartView.webLineWidth = _webLineWidth ? _webLineWidth : .75;
    _chartView.innerWebLineWidth = 0.375;
    _chartView.webAlpha = 1.0;
    
    BalloonMarker *marker = [[BalloonMarker alloc] initWithColor:[UIColor colorWithWhite:180/255. alpha:1.0] font:[UIFont systemFontOfSize:12.0] insets: UIEdgeInsetsMake(8.0, 8.0, 20.0, 8.0)];
    marker.minimumSize = CGSizeMake(80.f, 40.f);
    _chartView.marker = marker;
    
    ChartXAxis *xAxis = _chartView.xAxis;
    xAxis.labelFont = [UIFont fontWithName:@"HelveticaNeue-Light" size:9.f];
    
    ChartYAxis *yAxis = _chartView.yAxis;
    yAxis.labelFont = [UIFont fontWithName:@"HelveticaNeue-Light" size:9.f];
    yAxis.labelCount = 5;
    yAxis.startAtZeroEnabled = YES;
    
    ChartLegend *l = _chartView.legend;
    l.position = ChartLegendPositionRightOfChart;
    l.font = [UIFont fontWithName:@"HelveticaNeue-Light" size:10.f];
    l.xEntrySpace = 7.0;
    l.yEntrySpace = 5.0;
    
//    [self setData0];
    [self addSubview:_chartView];
  }
  return self;
}

- (void)setData0
{
  double mult = 150.f;
  int count = 9;
  
  NSMutableArray *yVals1 = [[NSMutableArray alloc] init];
  NSMutableArray *yVals2 = [[NSMutableArray alloc] init];
  
  for (int i = 0; i < count; i++)
  {
    [yVals1 addObject:[[ChartDataEntry alloc] initWithValue:(arc4random_uniform(mult) + mult / 2) xIndex:i]];
    [yVals2 addObject:[[ChartDataEntry alloc] initWithValue:(arc4random_uniform(mult) + mult / 2) xIndex:i]];
  }
  
  NSMutableArray *xVals = [[NSMutableArray alloc] init];
  
  for (int i = 0; i < count; i++)
  {
    [xVals addObject:parties[i % parties.count]];
  }
  
  RadarChartDataSet *set1 = [[RadarChartDataSet alloc] initWithYVals:yVals1 label:@"Set 1"];
  [set1 setColor:ChartColorTemplates.vordiplom[0]];
  set1.drawFilledEnabled = YES;
  set1.lineWidth = 2.0;
  
  RadarChartDataSet *set2 = [[RadarChartDataSet alloc] initWithYVals:yVals2 label:@"Set 2"];
  [set2 setColor:ChartColorTemplates.vordiplom[4]];
  set2.drawFilledEnabled = YES;
  set2.lineWidth = 2.0;
  
  RadarChartData *data = [[RadarChartData alloc] initWithXVals:xVals dataSets:@[set1, set2]];
  [data setValueFont:[UIFont fontWithName:@"HelveticaNeue-Light" size:8.f]];
  [data setDrawValues:NO];
  
  _chartView.data = data;
}

-(void) setWebLineWidth:(double) webLineWidth{
  _webLineWidth = webLineWidth;
  _chartView.webLineWidth = webLineWidth;
}

-(void) setData:(RadarChartData *)data{
  _chartView.data = data;
}


@end
