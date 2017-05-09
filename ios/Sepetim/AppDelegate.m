/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import "AppDelegate.h"

#import <React/RCTRootView.h>
#import <React/RCTBundleURLProvider.h>
#import "RCCManager.h"
#import <GoogleMaps/GoogleMaps.h>
#import "RCTPushNotificationManager.h"

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  
  [[UIApplication sharedApplication] setStatusBarStyle: UIStatusBarStyleLightContent];
  
  NSURL *jsCodeLocation;
  
  [GMSServices provideAPIKey:@"AIzaSyDNHnkJkLt3XSQBeeor_qtuBmF_otQHsZo"];
  

#ifdef DEBUG
  jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index.ios" fallbackResource:nil];
#else
  jsCodeLocation = [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  self.window.backgroundColor = [UIColor whiteColor];
  [[RCCManager sharedIntance] initBridgeWithBundleURL:jsCodeLocation];
  
  
  return YES;
}

-(void)application:(UIApplication *)application didRegisterUserNotificationSettings:(UIUserNotificationSettings *)notificationSettings {

  [RCTPushNotificationManager didRegisterUserNotificationSettings: notificationSettings];
  
}

-(void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken {

  [RCTPushNotificationManager didRegisterForRemoteNotificationsWithDeviceToken: deviceToken];
  
}

-(void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo fetchCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler {

  [RCTPushNotificationManager didReceiveRemoteNotification: userInfo fetchCompletionHandler: completionHandler];
}

- (void)application:(UIApplication *)application didFailToRegisterForRemoteNotificationsWithError:(NSError *)error {
  [RCTPushNotificationManager didFailToRegisterForRemoteNotificationsWithError: error];
}

- (void)application:(UIApplication *)application didReceiveLocalNotification:(UILocalNotification *)notification {
  [RCTPushNotificationManager didReceiveLocalNotification: notification];
}

@end
