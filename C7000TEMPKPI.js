var C7000TempMeasure;

var customStoreC7000Temp = new DevExpress.data.CustomStore({
    load: function (loadOptions) {
        var d = $.Deferred();
        $.getJSON('http://localhost:3000/c7000temp').done(function (data) {
            d.resolve(data.c7000temp, { totalCount: data.c7000temp.length });
            C7000TempMeasure = data.c7000temp[data.c7000temp.length - 1].value;
        });
        return d.promise();
    }
});

setInterval(function () {
    customStoreC7000Temp.load();

    $("#C7000TempChart").dxChart({
        dataSource: customStoreC7000Temp,
        commonSeriesSettings: {
            argumentField: 'measuredatetime'
        },
        series: [
            { name: 'CISCO Temp', valueField: 'value', showInLegend: false }
        ],
        argumentAxis: {
            label: {
                overlappingBehavior: {
                    mode: "rotate",
                    rotationAngle: 270
                }
            }
        },
    });

    $("#C7000TempChartcircularGauge").dxCircularGauge({
        title: {
            text: 'C7000 TEMP',
            font: {
                size: 30,
                weight: 400
            },
            subtitle: {
                text: 'Mb',
                font: {
                    size: 15,
                    weight: 100
                }
            }
        },
        scale: {
            startValue: 0,
            endValue: 100
        },
        value: Number(C7000TempMeasure),
        subvalues: [70, 100],
        valueIndicator: { type: 'rangeBar' },
        //subvalueIndicator: {type: 'textCloud'},
        rangeContainer: {
            ranges: [
                { startValue: 0, endValue: 40, color: 'green' },
                { startValue: 60, endValue: 100, color: 'red' }
            ]
        }
    });

}, 5000);
