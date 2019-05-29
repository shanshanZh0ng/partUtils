var chartConfig = {};

chartConfig.colorObj = {
    //     中心点 、商务订单 、生产中心 、设计中心
    "point": {
        "center": "rgba(233,34,210,1)",
        "business": "rgba(20,255,252,1)",
        "production": "rgba(255,243,17,1)",
        "design": "rgba(24,215,43,1)"
    },
    "pointBorder": {
        "center": "rgba(233,34,210,1)",
        "business": "rgba(20,255,252,1)",
        "production": "rgba(255,243,17,1)",
        "design": "rgba(24,215,43,1)"
    },

    //与商务订单为相近色
    "lineA": "rgba(20,255,252,.3)",
    "lineAEffect": "rgba(20,255,252,.7)",

    //与生产中心为相近色
    "lineB": "rgba(255,243,17,.3)",
    "lineBEffect": "rgba(255,243,17,.7)",

    //与设计中心为相近色
    "lineC": "rgba(24,215,43,.3)",
    "lineCEffect": "rgba(24,215,43,.7)",

    "mapBorder": "#1ba9b6",
    "mapEmphasisArea": "#0F253D",
    "mapArea": "#18304d",
    "mapCityBorder": "#386089"

};

chartConfig.paramsObj = {
    "effectSymbolSize": 10,//线上图案大小
    "rippleEffectScale": 3//点上圈范围
};

chartConfig.position = {"top": "5%", "bottom": "2%", "left": "2%", "right": "5%", "zoom": "1"};

chartConfig.planePath = 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z';
// var planePath = 'arrow';

//    经纬度
var geoCoordMap = {
    "南昌": [115.892151, 28.676493],
    "杭州": [120.153576, 30.287459],
    "深圳": [114.085947, 22.547],
    "深圳观澜": [116.085947, 24.547],
    "成都": [104.065735, 30.659462],

    "北京": [116.405285, 39.904989],
    "上海": [121.472644, 31.231706],
    "台北": [121.538753,25.080558],

    "美国": [-95.712891, 37.09024],
    "英国": [-3.435973, 55.378051],
    "德国": [10.451526, 51.165691],
    "南非": [22.937506, -30.559482],
    "埃及": [30.802498, 26.820553],
    "印度": [77.826776,23.982357],
    "印度诺伊达": [77.385241,28.850663]
};

function getGlobalOption() {
    var option = {
        geo: {
            name: '底图',
            type: 'map',
            map: 'world',
            zoom: chartConfig.position.zoom,
            top: chartConfig.position.top,
//            bottom: chartConfig.position.bottom,
            left: chartConfig.position.left,
//            right: chartConfig.position.right,
            itemStyle: {
                normal: {
                    borderColor: chartConfig.colorObj.mapBorder,
                    borderWidth: 3
                },
                emphasis: {
                    areaColor: chartConfig.colorObj.mapEmphasisArea
                }
            },
//            roam: true,
            label: {
                emphasis: {
                    show: false
                }
            }
        },
        series: [
            {
                name: '浮图',
                id: 'map',
                type: 'map',
                mapType: 'world',
                zoom: chartConfig.position.zoom,
                top: chartConfig.position.top,
//            bottom: chartConfig.position.bottom,
                left: chartConfig.position.left,
//            right: chartConfig.position.right,
                itemStyle: {
                    normal: {
                        areaColor: chartConfig.colorObj.mapArea,
                        borderColor: chartConfig.colorObj.mapCityBorder
                    },
                    emphasis: {
                        label: {
                            show: true,
                            color: '#fff'
                        },
                        areaColor: chartConfig.colorObj.mapEmphasisArea
                    }
                }
            }, {
                name: '线-商务订单',
                type: 'lines',
                zlevel: 2,
                effect: {
                    show: true,
                    period: 6,
                    trailLength: 0.1,
                    color: chartConfig.colorObj.lineAEffect,
                    symbol: chartConfig.planePath,
                    symbolSize: chartConfig.paramsObj.effectSymbolSize
                },
                lineStyle: {
                    normal: {
                        color: chartConfig.colorObj.lineA,
                        width: 1,
                        opacity: 0.6,
                        curveness: 0.2
                    }
                },
                data: formtGCData(geoCoordMap, chartData.business, chartData.center)
            }, {
                name: '线-生产中心',
                type: 'lines',
                zlevel: 3,
                effect: {
                    show: true,
                    period: 6,
                    trailLength: 0.1,
                    color: chartConfig.colorObj.lineBEffect,
                    symbol: chartConfig.planePath,
                    symbolSize: chartConfig.paramsObj.effectSymbolSize
                },
                lineStyle: {
                    normal: {
                        color: chartConfig.colorObj.lineB,
                        width: 1,
                        opacity: 0.6,
                        curveness: 0.2
                    }
                },
                data: formtGCData(geoCoordMap, chartData.center, chartData.production)
            }, {
                name: '线-设计中心',
                type: 'lines',
                zlevel: 4,
                effect: {
                    show: true,
                    period: 6,
                    trailLength: 0.1,
                    color: chartConfig.colorObj.lineCEffect,
                    symbol: chartConfig.planePath,
                    symbolSize: chartConfig.paramsObj.effectSymbolSize
                },
                lineStyle: {
                    normal: {
                        color: chartConfig.colorObj.lineC,
                        width: 1,
                        opacity: 0.6,
                        curveness: 0.2
                    }
                },
                data: formtGCData(geoCoordMap, chartData.center, chartData.design)
            }, {
                name: '点',
                type: 'effectScatter',
                coordinateSystem: 'geo',
                zlevel: 4,
                rippleEffect: {
                    period: 4,
                    scale: chartConfig.paramsObj.rippleEffectScale,
                    brushType: 'stroke'
                },
                label: {
                    normal: {
                        show: true,
                        position: 'right',
                        formatter: '{b}',
                        textStyle: {
                            fontSize: 14,
                            fontWeight: 'normal'
                        }
                    }
                },
                data: formtVData(geoCoordMap, chartData)
            }
        ]
    };
    return option;
}

function formtGCData(geoData, dataA, dataB) {
    var tGeoDt = [];
    var lenA = dataA.length, lenB = dataB.length;
    var centerPoint = '';
    if (lenA > lenB) {
        for (var i = 0; i < lenA; i++) {
            centerPoint = geoData[dataB[0].name];
            tGeoDt.push({
                coords: [geoData[dataA[i].name], centerPoint]
            });
        }
    } else {
        for (var i = 0; i < lenB; i++) {
            centerPoint = geoData[dataA[0].name];
            tGeoDt.push({
                coords: [centerPoint, geoData[dataB[i].name]]
            });
        }
    }
    return tGeoDt;
}

function formtVData(geoData, data) {
    var tGeoDt = [];
    for (var category in data) {
        for (var i = 0, len = data[category].length; i < len; i++) {
            var tNam = data[category][i].name;
            tGeoDt.push({
                name: tNam,
                value: geoData[tNam],
                symbolSize: data[category][i].value / 7,
                itemStyle: {
                    normal: {
                        color: chartConfig.colorObj.point[category],
                        borderColor: chartConfig.colorObj.pointBorder[category]
                    }
                }
            });
        }
    }
    return tGeoDt;
}