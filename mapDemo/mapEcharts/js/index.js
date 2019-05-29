
// 加载
$(function() {
   
    var map_options = {
        minZoom : 0,
        maxZoom : 18,
        mapType : BMAP_NORMAL_MAP
    }
    var map = new BMap.Map("map", map_options);
    // 创建点坐标
    var point = new BMap.Point(116.403958, 39.915049);
    map.centerAndZoom(point, 5);
    map.enableScrollWheelZoom(); // 启用滚轮放大缩小，默认禁用
    map.enableContinuousZoom(); // 启用地图惯性拖拽，默认禁用
    map.addControl(new BMap.NavigationControl()); // 添加默认缩放平移控件
    map.addControl(new BMap.OverviewMapControl()); // 添加默认缩略地图控件
   
});

// 初始化百度在线地图
/*globalVariable.initMapBaidu = function(datamap) {
    var data = datamap.baseinfo;
    var geoCoordMap = datamap.pointinfo;
    var myChart = echarts.init(document.getElementById("map"));
    var convertData = function(data) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
            var geo = data[i].name;

            var geoCoord = geoCoordMap[i][data[i].name];

            if (geoCoord) {
                res.push({
                    // name: data[i].name,
                    value : geoCoord.concat(data[i].value, data[i].workshopid),
                    tooltip : data[i].name + '<br>' + '1'
                            + ':' + data[i].value
                });
            }
        }
        return res;
    };
    
    myChart.setOption(option, true)
}*/
