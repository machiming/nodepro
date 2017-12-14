var app = angular.module('myApp', []);
app.controller('siteCtrl', function($scope, $http) {
  $scope.tijiao = function () {
      $http({
        method: 'POST',
        data: {"name":$scope.value,"title":$scope.title,"content":$scope.content},
        headers: { 'Content-Type': 'Content-type:application/x-www-form-urlencoded' },
        transformRequest: function(obj) {
          var str = [];
          for (var p in obj) {
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
          }
          return str.join("&");
        },
        url: 'https://api.miaodiyun.com/20150822/industrySMS/sendSMS',
      }).then(function successCallback(response) {
          console.log(response)
        },
        function errorCallback(response) {
          console.log(response)
        })
  }
})
