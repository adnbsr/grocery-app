//
//  LocaleManager.m
//  Sepetim
//
//  Created by Adnan Basar on 20/05/2017.
//  Copyright © 2017 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "LocaleManager.h"
#import <React/RCTLog.h>


@implementation LocaleManager

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(setLocale: (NSString *) locale){
  
  NSUserDefaults *userDefaults = [NSUserDefaults standardUserDefaults];
  [userDefaults setObject: locale forKey: @"locale"];
  [userDefaults synchronize];
  
}

RCT_EXPORT_METHOD(getCurrentLocale: (RCTResponseSenderBlock)callback){
  
  NSUserDefaults *userDefaults = [NSUserDefaults standardUserDefaults];
  NSString *currentLocale = [userDefaults valueForKey:@"locale"];
  
  callback(@[[NSNull null] , currentLocale]);
  
}

- (NSString *) getCurrentLocale {
  NSUserDefaults *userDefaults = [NSUserDefaults standardUserDefaults];
  NSString *currentLocale = [userDefaults valueForKey:@"locale"];
  return currentLocale == nil ? @"en": currentLocale;
}

- (NSDictionary *) constantsToExport
{
  return @{ @"locale": [self getCurrentLocale]};
}


@end
