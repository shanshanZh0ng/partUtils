/**
 * Created by che on 2016/9/10.
 */
$.fn.addSvgClass = function(className) {
    return this.each(function() {
        var attr = $(this).attr('class')
        if (attr) {
            if (attr.indexOf(className) < 0) {
                $(this).attr('class', attr + ' ' + className)
            }
        } else {
            $(this).attr('class', className)
        }
    })
};
$.fn.removeSvgClass = function(className) {
    return this.each(function() {
        var attr = $(this).attr('class')
        attr = attr.replace(' ' + className, '')
        $(this).attr('class', attr)
    })
};
$(document).ready(function () {
    var itemMap = {
        "46020000FG-FW-1104": "测试项目备案1",
        "46020000GT-FW-0610": "测试项目备案2",
        "46020000GT-FW-0611": "测试项目备案3",
        "46020000GH-XK-0201": "测试项目备案4",
        "46020000HB-FW-0303": "测试项目备案5",
        "46020400HB-XK-0703": "测试项目备案6",
        "46020000GQ-XK-0102": "测试项目备案7",
        "46020000RF-XK-0201": "测试项目备案8",
        "46020000RF-XK-0203": "测试项目备案9",
        "46020000RF-XK-0301": "测试项目备案10",
        "46020000RF-XK-0306": "测试项目备案11",
        "46020000JS-FW-1101": "测试项目备案12",
        "46020000DZ-XK-0103": "测试项目备案13",
        "46020000QX-XK-0116": "测试项目备案14",
        "46020000GH-XK-0502": "测试项目备案15",
        "46020000RF-XK-0204": "测试项目备案16",
        "46020000FG-XK-0402": "测试项目备案17",
        "46020000GX-XK-0102": "测试项目备案18",
        "46020000GT-XK-0101": "测试项目备案19",
        "46020000GH-XK-0101": "测试项目备案20",
        "46020000FG-XK-0501": "测试项目备案21",
        "46020000GH-XK-0202": "测试项目备案22",
        "46020000GT-XK-0201": "测试项目备案23",
        "46020000SL-XK-0407": "测试项目备案24",
        "46020000GH-XK-0701": "测试项目备案25",
        "46020000RF-XK-0205": "测试项目备案26",
        "46020000QX-XK-0104": "测试项目备案27",
        "46020000QX-XK-0201": "测试项目备案28",
        "46020000QX-XK-0202": "测试项目备案29",
        "46020000XF-XK-0101": "测试项目备案30",
        "46020000XF-FW-0301": "测试项目备案31",
        "46020000FG-XK-0602": "测试项目备案32",
        "46020000FG-XK-0701": "测试项目备案33",
        "46020000FG-XK-0802": "测试项目备案34",
        "46020000JS-FW-0701": "测试项目备案35",
        "46020000JS-FW-0602": "测试项目备案36",
        "46020000JS-XK-3402": "测试项目备案37",
        "46020000JS-XK-1501": "测试项目备案38",
        "46020000GH-XK-0401": "测试项目备案39",
        "46020000JS-XK-2513": "测试项目备案40",
        "46020000JS-XK-2304": "测试项目备案41",
        "46020000RF-XK-0307": "测试项目备案42",
        "46020000RF-XK-0403": "测试项目备案43",
        "46020000YL-XK-0501": "测试项目备案44",
        "46020000YL-XK-0502": "测试项目备案45",
        "46020000YL-XK-0503": "测试项目备案46",
        "46020000SL-XK-0505": "测试项目备案47",
        "46020000GQ-XK-0104": "测试项目备案48",
        "46020000JS-FW-0101": "测试项目备案49",
        "46020400ZJ-FW-0101": "测试项目备案50",
        "46020400ZJ-FW-0201": "测试项目备案51",
        "46020000QX-XK-0301": "测试项目备案52",
        "46020000XF-FW-0303": "测试项目备案53",
        "46020000XF-XK-0102": "测试项目备案54",
        "46020000GH-XK-0301": "测试项目备案55",
        "46020400HB-XK-0301": "测试项目备案56",
        "46020000HB-XK-0001": "测试项目备案57",
        "46020000HY-XK-0301": "测试项目备案58",
        "46020000HY-XK-0401": "测试项目备案59"
    };
    //加载状态
    //todo 一个环节下可以有多个
    //todo 这时需要根据项目名称来分类
    var banjianList;
    var dialog = null;
    $.ajax({
        url: "../json/data.json",
        type:"GET",
        dataType: 'json',
        // cache: false,
        success: function (result) {
            if (result.status != 0) {
                alert(result.error);
                return;
            }
            banjianList = result.data;
            console.log(banjianList)
            for (var i = 0; i < banjianList.banjians.length; i++) {
                var banjian = banjianList.banjians[i];

                var done = false;
                if (banjian.sxbm == null || !banjian.sxbm.trim()) {
                    continue;
                }
                var $el = $('.' + banjian.sxbm + '');

                if (banjian.sxbm.substr(0,2)=='zj') {//中介
                    if (banjian.status == "办结" || banjian.status == "完成") {
                        done = true;
                        $el.removeSvgClass('doing').addSvgClass('success');
                    } else if (banjian.status == "办理中") {
                        $el.addSvgClass('doing');
                    }else if (banjian.status == "不涉及") {
                        $el.addSvgClass('null');
                    }
                } else {//办件
                    if (banjian.infos.length > 0) {
                        for (var j = 0; j < banjian.infos.length; j++) {
                            var info = banjian.infos[j];
                            // console.log(info)
                            if (info.endTime) {
                                done = true;
                                break;
                            }

                        }
                        if (done || $el.hasClass('success')) {
                            $el.removeSvgClass('doing').addSvgClass('success');
                        } else if (banjian.status == "不涉及") {
                            $el.addSvgClass('null');
                        } else if (banjian.status == "承诺") {
                            $el.addSvgClass('permit');
                        } else {
                            $el.addSvgClass('doing');
                        }
                    } else {
                        if (banjian.status == "不涉及") {
                            $el.addClass('null');
                        } else if (banjian.status == "承诺") {
                            $el.addClass('permit');
                        }else if (banjian.status == "办结" || banjian.status == "完成") {
                            done = true;
                            $el.removeSvgClass('doing').addClass('success');
                        }else if (banjian.status == "办理中") {
                            $el.addClass('doing');
                        }
                    }
                }

            }

        },
        error: function () {
            alert("加载项目信息失败！")
        }
    });

    $('.item').click(function () {
        var _this = $(this);
        var item = _this.attr('item');
        if (!item) {
            return;
        }
        var items = item.split('|');
        var html = '';
        //todo 办件为空的不显示查看申报信息
        for (var i = 0; i < items.length; i++) {
            html += "<div class='sx-item' item='" + items[i] + "'><div class='title' style='line-height: 30px;height: 30px;font-size: 20px;'>" + itemMap[items[i]] + "</div><div class='btns'><a class='apply'>申报</a>";
            if (_this.is('.doing') || _this.is('.success')) {

                html += " <a class='banjian'>查看申报信息</a> ";
            }
            html += "<a class='bszn'>查看办事指南</a></div></div>";
        }

        if (dialog) {
            dialog.close();
        }
        var pos = 'bottom';
        var offset = {
            top: -40,
            left: 0,
            right: 0,
            bottom: 0
        };
        if (_this.position().left < 300) {
            pos = 'right-top';
            offset = {
                top: -40,
                left: 0,
                right: 0,
                bottom: 0
            };
        }
        if (_this.position().top > $('body').height() / 2) {
            pos = 'top';
            offset = {
                top: 0,
                left: 0,
                right: 0,
                bottom: 0
            };
        }
        dialog = jDialog.tip(html, {
            target: _this,
            position: pos,
            trianglePosFromStart: 0,
            padding: '10px 5px',
            autoClose: 1000,
            offset: offset
        });
    });

    $('body').delegate('.bszn', 'click', function () {
        var item = $(this).parents('.sx-item').attr('item');
        if (!item) {
            return;
        }
        window.open('url' + item);
    }).delegate('.banjian', 'click', function () {
        var item = $(this).parents('.sx-item').attr('item');
        if (!item) {
            return;
        }
        window.open(url + 'project/banjian.do?id=' + id + '&sxbm=' + item);
    }).delegate('.apply', 'click', function () {
        var item = $(this).parents('.sx-item').attr('item');
        if (!item) {
            return;
        }
        //先材料检测
        window.open(url + 'apply/getApply.do?id=' + id + '&sxbm=' + item);
    });
});