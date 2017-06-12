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
#import <Parse/Parse.h>

#if defined(__IPHONE_10_0) && __IPHONE_OS_VERSION_MAX_ALLOWED >= __IPHONE_10_0
@import UserNotifications;
#endif

// Implement UNUserNotificationCenterDelegate to receive display notification via APNS for devices
// running iOS 10 and above.
#if defined(__IPHONE_10_0) && __IPHONE_OS_VERSION_MAX_ALLOWED >= __IPHONE_10_0
@interface AppDelegate () <UNUserNotificationCenterDelegate>
@end
#endif

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  
  [[UIApplication sharedApplication] setStatusBarStyle: UIStatusBarStyleLightContent];
  
  [Parse initializeWithConfiguration: [ParseClientConfiguration configurationWithBlock:^(id<ParseMutableClientConfiguration>  _Nonnull configuration) {
    
    [configuration setApplicationId: @"taT6ySwwyza3B2MJucucqWz9pMqBZ00Pd7w7hoZf"];
    [configuration setClientKey: @"qn4pWF8ISiGpQgBC93MrwP2shFFo5Mbx1OkGLGNb"];
    [configuration setServer: @"https://parseapi.back4app.com/"];
    
    [configuration setLocalDatastoreEnabled: YES];
    
    
    
  }]];
  
  
  // Register for remote notifications. This shows a permission dialog on first run, to
  // show the dialog at a more appropriate time move this registration accordingly.
  if (floor(NSFoundationVersionNumber) <= NSFoundationVersionNumber_iOS_7_1) {
    // iOS 7.1 or earlier. Disable the deprecation warnings.
#pragma clang diagnostic push
#pragma clang diagnostic ignored "-Wdeprecated-declarations"
    UIRemoteNotificationType allNotificationTypes =
    (UIRemoteNotificationTypeSound |
     UIRemoteNotificationTypeAlert |
     UIRemoteNotificationTypeBadge);
    [application registerForRemoteNotificationTypes:allNotificationTypes];
#pragma clang diagnostic pop
  } else {
    // iOS 8 or later
    // [START register_for_notifications]
    if (floor(NSFoundationVersionNumber) <= NSFoundationVersionNumber_iOS_9_x_Max) {
      UIUserNotificationType allNotificationTypes =
      (UIUserNotificationTypeSound | UIUserNotificationTypeAlert | UIUserNotificationTypeBadge);
      UIUserNotificationSettings *settings =
      [UIUserNotificationSettings settingsForTypes:allNotificationTypes categories:nil];
      [[UIApplication sharedApplication] registerUserNotificationSettings:settings];
    } else {
      // iOS 10 or later
#if defined(__IPHONE_10_0) && __IPHONE_OS_VERSION_MAX_ALLOWED >= __IPHONE_10_0
      // For iOS 10 display notification (sent via APNS)
      [UNUserNotificationCenter currentNotificationCenter].delegate = self;
      UNAuthorizationOptions authOptions =
      UNAuthorizationOptionAlert
      | UNAuthorizationOptionSound
      | UNAuthorizationOptionBadge;
      [[UNUserNotificationCenter currentNotificationCenter] requestAuthorizationWithOptions:authOptions completionHandler:^(BOOL granted, NSError * _Nullable error) {
        
        if (granted) {
          NSLog(@"[application registerForRemoteNotifications]");
          [application registerForRemoteNotifications];
        }
        
      }];
#endif
    }
    
  }
  
  NSURL *jsCodeLocation;
  
  [GMSServices provideAPIKey:@"AIzaSyA60tMrYYvbPzI2edj_OWPFMzpqLQXjzU4"];
  

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

/*
  Registration and Configuration for Parse Push Notification!
 */

-(void)application:(UIApplication *)application didRegisterUserNotificationSettings:(UIUserNotificationSettings *)notificationSettings {

  [RCTPushNotificationManager didRegisterUserNotificationSettings: notificationSettings];
  
}

-(void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken {

  [RCTPushNotificationManager didRegisterForRemoteNotificationsWithDeviceToken: deviceToken];
  
  PFInstallation *currentInstallation = [PFInstallation currentInstallation];
  [currentInstallation setDeviceTokenFromData:deviceToken];
  [currentInstallation setObject: @"from native" forKey: @"osPlatform"];
  [currentInstallation saveInBackgroundWithBlock:^(BOOL succeeded, NSError * _Nullable error) {
    if (succeeded) {
      NSLog(@"ParseSDK is ok!");
    }else {
      NSLog(@"Error: %@", error);
    }
  }];
  
}

-(void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo{
  
  NSLog(@"%@", userInfo);
  NSLog(@"didReceiveRemoteNotification");
  
  [RCTPushNotificationManager didReceiveRemoteNotification:userInfo];
}

-(void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo fetchCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler {
  
  NSLog(@"%@", userInfo);
  
  [RCTPushNotificationManager didReceiveRemoteNotification: userInfo fetchCompletionHandler: completionHandler];
}

- (void)application:(UIApplication *)application didFailToRegisterForRemoteNotificationsWithError:(NSError *)error {
  [RCTPushNotificationManager didFailToRegisterForRemoteNotificationsWithError: error];
}

- (void)application:(UIApplication *)application didReceiveLocalNotification:(UILocalNotification *)notification {
  NSLog(@"didReceiveLocalNotification");
  [RCTPushNotificationManager didReceiveLocalNotification: notification];
}

-(void)userNotificationCenter:(UNUserNotificationCenter *)center willPresentNotification:(UNNotification *)notification withCompletionHandler:(void (^)(UNNotificationPresentationOptions))completionHandler{
  NSLog(@"willPresentNotification");
  completionHandler(UNNotificationPresentationOptionBadge);
}

-(void)userNotificationCenter:(UNUserNotificationCenter *)center didReceiveNotificationResponse:(UNNotificationResponse *)response withCompletionHandler:(void (^)())completionHandler{
  
  NSDictionary *userInfo = response.notification.request.content.userInfo;

  
  NSLog(@"userInfo: %@", userInfo);
}

@end
