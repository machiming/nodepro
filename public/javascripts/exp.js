var app = angular.module('myApp', []);
app.controller('siteCtrl', function($scope, $http) {
  $scope.exp_code='';
  $scope.select='';
  $scope.expname='';
  $scope.result='';
  $scope.LogisticCode = '';
  $scope.Traces = '';
  $scope.reason = '';
  $scope.exp={
  "SF":"顺丰速运",
  "HTKY":"百世快递",
  "ZTO":"中通快递",
  "STO":"申通快递",
  "YTO":"圆通速递",
  "YD":"韵达速递",
  "YZPY":"邮政快递包裹",
  "HHTT":"天天快递",
  "JD":"京东物流",
  "QFKD":"全峰快递",
  "GTO":"国通快递",
  "UC":"优速快递",
  "DBL":"德邦",
  "FAST":"快捷快递",
   "MAZON":"亚马逊",
   "ZJS" :"宅急送"
  };

  $scope.cg = function (obj) {
      $scope.exp_code=obj;
  };
  $scope.tijiao = function () {
      $http({
        method: 'POST',
        data: {"exp_code":$scope.exp_code,"No":$scope.value,},
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        transformRequest: function(obj) {
          var str = [];
          for (var p in obj) {
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
          }
          return str.join("&");
        },
        url: 'http://localhost:3000/exp/send',
      }).then(function successCallback(response) {
          //返回结果
          $scope.result=response.data;
           //订单号
           $scope.LogisticCode=$scope.result.LogisticCode;
          //快递公司
          $scope.expname = $scope.exp[$scope.result['ShipperCode']];
          if($scope.result.State==0){
            $scope.Traces='';
            $scope.reason = $scope.result.Reason;
          }else if($scope.result.Traces.length>0){
             $scope.Traces=$scope.result.Traces;
            $scope.reason='';
             console.log($scope.Traces)
          }
        },
        function errorCallback(response) {
          console.log(response)
        })
  };
  app.filter('dealdata', function() {
    const RE_DATE=/(0?[1-9]|1[0-2])-(31|30|((1|2)[0-9])|(0?[1-9]))/;
    return function(text) {
      return RE_DATE.exec(text);
    }
  });

  app.filter('reverse', function() {
    return function(text) {
      return text.split("").reverse().join("");
    }
  });
});
