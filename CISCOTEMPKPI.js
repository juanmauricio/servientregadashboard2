var CISCOTempMeasure;

var customStoreCISCOTemp = new DevExpress.data.CustomStore({
    load: function (loadOptions) {
        var d = $.Deferred();
        $.getJSON('http://localhost:3000/ciscotemp/').done(function (data) {
            d.resolve(data.ciscotemp, { totalCount: data.ciscotemp.length });
            CISCOTempMeasure = data.ciscotemp[data.ciscotemp.length - 1].value;
        });
        return d.promise();
    }
});

setInterval(function () {
    customStoreCISCOTemp.load();

    $("#CISCOTempChart").dxChart({
        dataSource: customStoreCISCOTemp,
        commonSeriesSettings: {
            argumentField: 'measuredatetime'
        },
        series: [
            { name: 'SQL HDD', valueField: 'value', showInLegend: false }
        ],
        argumentAxis: {
            label: {
                overlappingBehavior: {
                    mode: "rotate",
                    rotationAngle: 270
                }
            }
        },
        valueAxis: [
            {
                constantLines: [
                    {
                        color: "#FF0000",
                        value: 20,
                        label: {
                            text: 20,
                            visible: true,
                            position: "inside",
                            horizontalAlignment: "right"
                        }
                    }
                ]
            }
        ]
    });

    $("#CISCOTempChartcircularGauge").dxCircularGauge({
        title: {
            text: 'CISCO TEMP',
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
        value: Number(CISCOTempMeasure),
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
