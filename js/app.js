// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('app', ['ionic', 'ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
app.controller('GautamCtrl', function($scope, $cordovaBarcodeScanner, $cordovaFlashlight, $cordovaDeviceMotion){
    document.addEventListener("deviceready", function () {
    $scope.codeData = 'Not Scanned';
    $scope.scanCode = function(){
        $cordovaBarcodeScanner.scan()
        .then(function(barcodeData){
            $scope.codeData = barcodeData;
        }, function(error){
            $scope.codeData = 'Error Scanning';
        })
    }
    $scope.flashSwitch = function(){
        $cordovaFlashlight.toggle()
        .then(function(success){
            //Success
        }, function(error){
            //Error
        })
    }
    var options = {frequency: 100};
    $scope.xAxis = 'un-Sensored';
    $scope.yAxis = 'un-Sensored';
    $scope.zAxis = 'un-Sensored';
    var watch = $cordovaDeviceMotion.watchAcceleration(options);
        watch.then(null, function(error){
            $scope.xAxis = 'Error Sensing';
            $scope.yAxis = 'Error Sensing';
            $scope.zAxis = 'Error Sensing';
        }, function(result){
        $scope.xAxis = result.x;
        $scope.yAxis = result.y;
        $scope.zAxis = result.z; 
    })
    }, false);
})
