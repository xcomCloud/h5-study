
//åŽ†å²æ•°æ®
var chnNumChar = ["æ—¥","ä¸€","äºŒ","ä¸‰","å››","äº”","å…­","ä¸ƒ","å…«","ä¹"]
var chnUnitSection = ["","ä¸‡","äº¿","ä¸‡äº¿","äº¿äº¿"]
var chnUnitChar = ["","å","ç™¾","åƒ"]

function NumberToChinese(num){
    var unitPos = 0;
    var strIns = '', chnStr = '';
    var needZero = false;

    if(num === 0){
        return chnNumChar[0];
    }

    while(num > 0){
        var section = num % 10000;
        if(needZero){
            chnStr = chnNumChar[0] + chnStr;
        }
        strIns = SectionToChinese(section);
        strIns += (section !== 0) ? chnUnitSection[unitPos] : chnUnitSection[0];
        chnStr = strIns + chnStr;
        needZero = (section < 1000) && (section > 0);
        num = Math.floor(num / 10000);
        unitPos++;
    }

    return chnStr;
}
function SectionToChinese(section){
    var strIns = '', chnStr = '';
    var unitPos = 0;
    var zero = true;
    while(section > 0){
        var v = section % 10;
        if(v === 0){
            if(!zero){
                zero = true;
                chnStr = chnNumChar[v] + chnStr;
            }
        }else{
            zero = false;
            strIns = chnNumChar[v];
            strIns += chnUnitChar[unitPos];
            chnStr = strIns + chnStr;
        }
        unitPos++;
        section = Math.floor(section / 10);
    }
    return chnStr;
}
function  formatDate(dateLong) {
    var date = new Date(dateLong);
    var m=add(date.getMonth(),1),d=date.getDate(),h=date.getHours(),mm=date.getMinutes();
    if(m<10)m="0"+m;
    if(d<10)d="0"+d;
    if(h<10)h="0"+h;
    if(mm<10)mm="0"+mm;
    return 'æ˜ŸæœŸ'+NumberToChinese(date.getDay())+' '+m+'/'+d+' '+h+':'+mm;
}
function lssj(data,lotteryVersion) {
    var str = '';
    $.each(data, function(index, value) {
        str += '<tr>';
        str += '<td>' + value.qiHao + '</td>'
        str += '<td>' + formatDate(value.endTime) + '</td>'
        str += '<td class="hide-icon-text">';
        var arr = value.haoMa.split(",");
        for(var i = 0; i < arr.length; ++i) {
            str += '<span class="icon bj'+arr[i]+'"></span>';
        }
        str += '</td>';
        str += '<td>'+Pk10_Auto(arr,1,lotteryVersion)+'</td>';
        str += '<td>'+Pk10_Auto(arr,2,lotteryVersion)+'</td>';
        str += '<td>'+Pk10_Auto(arr,3,lotteryVersion)+'</td>';
        str += '<td>'+Pk10_Auto(arr,4,lotteryVersion)+'</td>';
        str += '<td>'+Pk10_Auto(arr,5,lotteryVersion)+'</td>';
        str += '<td>'+Pk10_Auto(arr,6,lotteryVersion)+'</td>';
        str += '<td>'+Pk10_Auto(arr,7,lotteryVersion)+'</td>';
        str += '<td>'+Pk10_Auto(arr,8,lotteryVersion)+'</td>';
        str += '</tr>';
    });
    $("#shuju5 table tbody").html(str);
}

//ç»‡çººå›¾
function zhifang(data) {

    // åŸºäºŽå‡†å¤‡å¥½çš„domï¼Œåˆå§‹åŒ–echartså®žä¾‹
    var myChart2 = echarts.init(document.getElementById('main2'));
    // æŒ‡å®šå›¾è¡¨çš„é…ç½®é¡¹å’Œæ•°æ®
    var subtext = "";
    if(data.length > 0) {
        subtext += " ç¬¬" + data[0].qiHao + 'æœŸ ~ ' + "ç¬¬" + data[data.length - 1].qiHao + 'æœŸ';
    }
    var option = {
        title: {
            text: "ç›´æ–¹å›¾",
            subtext: subtext,
            x: 'center'
        },
        dataZoom: {
            show: true,
            realtime: true,
            start: 0,
            end: 60
        },
        grid: {
            left: '1%',
            right: '2%',
            containLabel: true,
            y2: 120
        },
        tooltip: {
            show: true,
            trigger: 'axis',
            //show: true,   //default true
            showDelay: 0, //æ˜¾ç¤ºå»¶æ—¶ï¼Œæ·»åŠ æ˜¾ç¤ºå»¶æ—¶å¯ä»¥é¿å…é¢‘ç¹åˆ‡æ¢
            hideDelay: 50, //éšè—å»¶æ—¶
            transitionDuration: 0, //åŠ¨ç”»å˜æ¢æ—¶é•¿
            backgroundColor: 'rgba(0,0,0,0.7)', //èƒŒæ™¯é¢œè‰²ï¼ˆæ­¤æ—¶ä¸ºé»˜è®¤è‰²ï¼‰
            borderRadius: 8, //è¾¹æ¡†åœ†è§’
            padding: 10, // [5, 10, 15, 20] å†…è¾¹è·
            position: function(p) {
                // ä½ç½®å›žè°ƒ
                // console.log && console.log(p);
                return [p[0] + 10, p[1] - 10];
            },
            formatter: function(params, ticket, callback) {
                var res = "åŸºæœ¬å·ç " + ' : ' + params[0].name;
                for(var i = 0, l = params.length; i < l; i++) {
                    res += '<br/>' + params[i].seriesName + ' : ' + params[i].value; //é¼ æ ‡æ‚¬æµ®æ˜¾ç¤ºçš„å­—ç¬¦ä¸²å†…å®¹
                }
                return res;
            }
        },
        xAxis: {
            type: 'category',
            axisTick: {
                alignWithLabel: true
            },
            data: []
        },
        yAxis: [{
            type: 'value',
            splitNumber: 10,
            triggerEvent: true,
        }],
        series: [{
            name: 'å‡ºçŽ°æ¬¡æ•°',
            type: 'bar',
            data: [],
            legendHoverLink: true,
            label: {
                normal: {
                    show: true,
                    position: 'top',
                    textStyle: {
                        color: '#000'
                    }
                }
            },
            markPoint: {
                symbol: 'pin',
                symbolSize: 50,
                silent: true,
                animation: true,
            },
            barWidth: '27px',
            barGap: '30%',
            //            barCategoryGap:'30%',
            markArea: {
                //              silent:true
            },
            itemStyle: {
                normal: {
                    color: ['#6DB8FF']
                }
            }
        }]
    };
    var yData = [];
    for(var i = 1; i <= 10; ++i) {
        yData[i - 1] = 0;
        option.xAxis.data.push(i);
    }

    $.each(data, function(index, value) {
        var haoMa = value.haoMa;
        var arr = haoMa.split(",");

        for(var i = 0; i < arr.length; ++i) {
            //                console.log(Tools.parseInt(arr[i]));
            yData[Tools.parseInt(arr[i] - 1)]++;
        }
    });

    option.series[0].data = yData;

    // ä½¿ç”¨åˆšæŒ‡å®šçš„é…ç½®é¡¹å’Œæ•°æ®æ˜¾ç¤ºå›¾è¡¨ã€‚
    myChart2.setOption(option);
}

//Kçº¿å›¾
function kxian(data) {
    // åŸºäºŽå‡†å¤‡å¥½çš„domï¼Œåˆå§‹åŒ–echartså®žä¾‹
    var myChart1 = echarts.init(document.getElementById('main1'));

    // æŒ‡å®šå›¾è¡¨çš„é…ç½®é¡¹å’Œæ•°æ®
    var subtext = "";
    if(data.length > 0) {
        subtext += " ç¬¬" + data[0].qiHao + 'æœŸ ~ ' + "ç¬¬" + data[data.length - 1].qiHao + 'æœŸ';
    }
    var option = {
        title: {
            text: "Kçº¿å›¾",
            subtext: subtext,
            x: 'center'
        },
        xAxis: [{
            axisLabel: {
                rotate: -60,
            },
            type: 'category',
            boundaryGap: false,
            data: []
        }],
        tooltip: {
            trigger: 'axis',
            formatter: function(params) {
                var haoMa = params[0].data.haoMa;

                var res = '';
                res += 'æ•°å€¼ï¼š' + Tools.parseInt(haoMa.split(",")[0]);
                res += '<br/>æœŸæ•°ï¼š' + params[0].name;
                res += '<br/><font class="red">å¥–å·ï¼š' + haoMa + "</font>";
                return res;
            }
        },
        yAxis: [{
            type: 'value'
        }],
        grid: {
            left: '1%',
            right: '2%',
            bottom: '8%',
            containLabel: true
        },
        series: [{
            symbol: 'circle', //å›¾æ ‡å½¢çŠ¶
            symbolSize: 6, //å›¾æ ‡å°ºå¯¸
            type: 'line',
            stack: '',
            itemStyle: {
                normal: {
                    color: "#6DB8FF",
                    lineStyle: {
                        color: '#6DB8FF'
                    }
                }
            },
            label: {
                normal: {
                    show: true,
                    position: 'top',
                    textStyle: {
                        color: '#000'
                    }
                }
            },
            areaStyle: {
                normal: {
                    textStyle: {
                        fontSize: 20,
                        color: 'red'
                    }
                }
            },
            data: [],
        }]
    };
    $.each(data, function(index, value) {
        option.xAxis[0].data.push(value.qiHao);
        option.series[0].data.push({
            value: Tools.parseInt(value.haoMa.split(",")[0]),
            haoMa: value.haoMa
        });
    });

    myChart1.setOption(option);
}

//èµ°åŠ¿å›¾
function zhexian(data) {
    var str = '';
    //console.log("dataçš„é•¿åº¦",data.length)
    for(var i = 0; i < data.length; i++) {
        // qihao
        str += '<div class="cl-30 clean">';
        str += '<div class="left cl-31 number">' + data[i].qiHao + '</div>';
        str += '<div class="left cl-32 openCode" style="width:200px">' + data[i].haoMa + '</div>';
        var kjData = data[i].haoMa.split(",");

        for(var j = 0; j < kjData.length; ++j) {
            var haoma = kjData[j];
            var bc1 = 0;
            var Left = 0;

            str += '<div class="cl-35 cl-36">';
            if(i < data.length - 1) {
                bc1 = (data[i].haoMa.split(",")[j]) - (data[i + 1].haoMa.split(",")[j]);
            }

            if(bc1 > 0) {
                Left = (bc1) * (-20);
            } else if(bc1 < 0) {
                bc1 = -bc1;
            }
            for(var k = 0; k < 10; ++k) {
                str += '<var class="' + (j % 2 == 0 ? 'bg-1' : 'bg-2') + ' i_' + j + "_" + k + '">';
                if(k == haoma - 1) {
                    str += '<i data-num="' + k + '" class="' + (j % 2 == 0 ? 'bg-4' : 'bg-5') + '">';
                    str += k + 1;
                    str += '<canvas class="zhexian" id="canvas' + i + j + '" width="' + (bc1 + 1) * 20 + '" height="32px" style="z-index: 10; left:' + Left + 'px; display: none;"></canvas>';
                    str += '</i>';
                } else {
                    str += '<i></i>';
                }
                str += '</var>';
            }

            str += '</div>';
        }
        str += '</div>';
    }
    $("#zhexianData").html(str);

    for(var i = 0; i < data.length - 1; ++i) {
        for(var j = 0; j < 10; ++j) {
            bc1 = Tools.parseInt(data[i].haoMa.split(',')[j]) - Tools.parseInt(data[i + 1].haoMa.split(',')[j]);
            var Left = 0;
            if(bc1 < 0) {
                bc1 = -bc1;
                Left = (bc1) * (-20);
            }
            var canvas = document.getElementById("canvas" + i + j);
            var context = canvas.getContext("2d");
            var bc1 = (data[i].haoMa.split(',')[j]) - data[i + 1].haoMa.split(',')[j];
            if(bc1 < 0) {
                context.moveTo(17, 13);
                context.lineTo(canvas.width - 13, canvas.height - 8);
            } else if(bc1 > 0) {
                context.moveTo(canvas.width - 13, 13);
                context.lineTo(8, canvas.height - 5);
            } else {
                context.moveTo(10, 12);
                context.lineTo(10, 30);
            }
            if(j % 2 != 0) {
                context.strokeStyle = "#cc0000";
            }
            context.stroke();
        }
    }
    if($("#checkboxZhexian").is(":checked")) {
        $(".zhexian").show();
    } else {
        $(".zhexian").hide();
    }

    // é—æ¼
    renderYilou(data);

    if($("#checkboxYlsj").is(":checked")) {
        $(".transparent").addClass("not-transparent");
    } else {
        $(".transparent").removeClass("not-transparent");
    }
}

// é—æ¼ç»Ÿè®¡
//***
function renderYilou(data) {
    // é—æ¼ç»Ÿè®¡
    var yilou = [];
    for(var i = 0; i < 10; ++i) {
        yilou[i] = [];
        for(var j = 0; j < 10; ++j) {
            yilou[i][j] = {
                cxCs: 0, // å‡ºçŽ°æ¬¡æ•°
                maxLcCs: 0, // æœ€å¤§è¿žå‡ºæ¬¡æ•°
                ylArr: [] // é—æ¼æ¬¡æ•°
            };
        }
    }

    for(var i = 0; i < 10; ++i) {
        for(var j = 0; j < 10; ++j) {
            var obj = yilou[i][j];

            var tmpYlCs = 0; // è¿žç»­é—æ¼æ¬¡æ•°
            var tmpLcCs = 0; // è¿žå‡ºæ¬¡æ•°
            $.each(data, function(index, value) {
                var openCodeArr = value.haoMa.split(",");
                var tmpValue = Tools.parseInt(openCodeArr[i]);

                if(tmpValue != j + 1) { // é—æ¼
                    tmpYlCs++;
                    if(tmpLcCs > obj.maxLcCs) {
                        obj.maxLcCs = tmpLcCs;
                    }
                    tmpLcCs = 0;
                } else { // ä¸­
                    obj.cxCs++;
                    tmpLcCs++;

                    obj.ylArr.push(tmpYlCs);
                    tmpYlCs = 0;
                }
            });
        }
    }

    var str1 = '',
        str2 = '',
        str3 = '',
        str4 = '';
    for(var i = 0; i < 10; ++i) {
        for(var j = 0; j < 10; ++j) {
            var obj = yilou[i][j];
            // å‡ºçŽ°æ¬¡æ•°
			
			// str1即为需要的真实数据
			
            str1 += '<var><i>' + obj.cxCs + '</i></var>';

            // å¹³å‡é—æ¼å€¼&æœ€å¤§é—æ¼å€¼
            var maxYl = 0;
            if(obj.ylArr.length > 0) {
                var sumYl = 0;
                $.each(obj.ylArr, function(index, value) {
                    sumYl += value;
                    maxYl = value > maxYl ? value : maxYl;
                });
                str2 += '<var><i>' + Math.floor(sumYl / obj.ylArr.length) + '</i></var>';
                str3 += '<var><i>' + maxYl + '</i></var>';
            } else {
                str2 += '<var><i>0</i></var>';
                str3 += '<var><i>0</i></var>';
            }

            // æœ€å¤§è¿žå‡ºå€¼
            str4 += '<var><i>' + obj.maxLcCs + '</i></var>';
        }
    }

    $("#cxzcs").html(str1);
    $("#pjylz").html(str2);
    $("#zdylz").html(str3);
    $("#zdlcz").html(str4);

    var str5 = '';
    for(var i = 0; i < 3; ++i) {
        for(var j = 0; j < 10; ++j) {
            str5 += '<tr>';
            if(j == 0) {
                if(i == 0) {
                    str5 += '<td rowspan="10">ç™¾ä½</td>';
                } else if(i == 1) {
                    str5 += '<td rowspan="10">åä½</td>';
                } else if(i == 2) {
                    str5 += '<td rowspan="10">ä¸ªä½</td>';
                }
            }

            str5 += '<td>' + (j + 1) + '</td>';

            var obj = yilou[i][j];
            // å‡ºçŽ°æ¬¡æ•°
            str5 += '<td>' + obj.cxCs + '</td>';

            // å¹³å‡é—æ¼å€¼&æœ€å¤§é—æ¼å€¼
            var maxYl = 0;
            if(obj.ylArr.length > 0) {
                var sumYl = 0;
                $.each(obj.ylArr, function(index, value) {
                    sumYl += value;
                    maxYl = value > maxYl ? value : maxYl;
                });
                str5 += '<td>' + Math.floor(sumYl / obj.ylArr.length) + '</td>';
                str5 += '<td>' + maxYl + '</td>';
            } else {
                str5 += '<td>0</td>';
                str5 += '<td>0</td>';
            }

            // æœ€å¤§è¿žå‡ºå€¼
            str5 += '<td>' + obj.maxLcCs + '</td>';
            str5 += '</tr>';
        }
    }
    $("#shuju4 table tbody").html(str5);

    // é—æ¼æ•°æ®
    for(var i = 0; i < 10; ++i) {
        for(var j = 0; j < 10; ++j) {
            var tmpCount = 0;
            var obj = $(".i_" + i + "_" + j + " i");
            $(obj).each(function() {
                if(typeof $(this).data('num') == 'undefined') {
                    tmpCount = tmpCount + 1;
                    $(this).html(tmpCount).addClass("transparent");
                } else {
                    tmpCount = 0;
                }
            });
            var r_size = obj.size()-1;
            tmpCount = 0;
            $(obj).each(function(k) {
            	var small_block = $(obj)[r_size-k];
                if(typeof $(small_block).data('num') == 'undefined') {
                    tmpCount = tmpCount + 1;
                    $(small_block).html(tmpCount);
                } else {
                    tmpCount = 0;
                }
            });
        }
    }

    // é—æ¼åˆ†å±‚
    for(var i = 0; i < 10; ++i) {
        for(var j = 0; j < 10; ++j) {
            var tmpCount = 0;
            var obj = $(".i_" + i + "_" + j + " i");
            for(var k = obj.length - 1; k >= 0; --k) {
                var tmpObj = $(obj).eq(k);
                if(typeof $(tmpObj).data('num') == 'undefined') {
                    $(tmpObj).parent().addClass("ylfc")
                } else {
                    break;
                }
            }
        }
    }
}
