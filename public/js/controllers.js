'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('AppCtrl', function ($scope, socket) {
    socket.on('send:name', function (data) {
      $scope.name = data.name;
    });
  }).
  controller('MyCtrl1', function ($scope, socket) {
    socket.on('send:time', function (data) {
      $scope.time = data.time;
      parseGeo(data.geojson);
    });
  }).
  controller('MyCtrl2', function ($scope) {
    socket.on('send:geom', function (data) {
      parseGeo(data);
    });
  });
