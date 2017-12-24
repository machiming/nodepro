var app = angular.module('myApp', []);
app.controller('siteCtrl', function($scope, $http) {
  /*获取验证码*/
  $scope.huoqu = function () {
    $http({
      method: 'POST',
      headers: { 'Content-Type':'application/x-www-form-urlencoded' },
      transformRequest: function(obj) {
        var str = [];
        for (var p in obj) {
          str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }
        return str.join("&");
      },
      url: 'http://localhost:3000/phone/send',
    }).then(function successCallback(response) {
        console.log(response)
      },
      function errorCallback(response) {
        console.log(response)
      })
  };
  /*比较验证码*/
  $scope.tijiao = function () {
      $http({
        method: 'POST',
        data: {"code":$scope.code},
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        transformRequest: function(obj) {
          var str = [];
          for (var p in obj) {
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
          }
          return str.join("&");
        },
        url: 'http://localhost:3000/phone/tijiao',
      }).then(function successCallback(response) {
          console.log(response)
        },
        function errorCallback(response) {
          console.log(response)
        })
  }
});
