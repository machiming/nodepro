function echarts2(obj,obj2) {
    var myChart = echarts.init(document.getElementById('main'));
    // 指定图表的配置项和数据
    var option = {
        title: {
            text: '金额汇总'
        },
        tooltip: {},
        legend: {
            data:['金额']
        },
        xAxis: {
            data: obj2
        },
        yAxis: {},
        series: [{
            name: '金额',
            type: 'bar',
            data: obj
        }]
    };
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
}



var app = angular.module('myApp', []);
app.controller('siteCtrl', function($scope, $http) {

    $http({
        method: 'GET',
        url: 'http://localhost:3000/users'
    }).then(function successCallback(response)
    {
        var array=new Array()
        var array2=new Array()
        $scope.names = response.data;
        for(let i of $scope.names){
            array.push(i.money);
            array2.push(i.name)
        }
        echarts2(array,array2)
    },  function errorCallback(response) {
        // 请求失败执行代码
    })
    $scope.tijiao = function () {
        $http({
            method: 'POST',
            data: {"name":$scope.value},
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            transformRequest: function(obj) {
                var str = [];
                for (var p in obj) {
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                }
                return str.join("&");
            },
            url: 'http://localhost:3000/users/a',
        }).then(function successCallback(response) {
                $scope.sum=0;
                var array = new Array();
                var array2 = new Array();
                $scope.names = response.data;
                for (let i of $scope.names) {
                    $scope.sum+=i.money
                    array.push(i.money);
                    array2.push(i.name)
                }
                console.log($scope.sum)
                echarts2(array, array2)
            },
            function errorCallback(response) {
                console.log(response)
            })
    }
})