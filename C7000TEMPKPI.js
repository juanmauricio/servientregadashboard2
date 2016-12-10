var C7000TempMeasure;

var customStoreC7000Temp = new DevExpress.data.CustomStore({
    load: function (loadOptions) {
        var d = $.Deferred();
        $.getJSON('http://localhost:3000/ciscotemp/').done(function (data) {
            d.resolve(data, { totalCount: data.length });
            C7000TempMeasure = data[data.length-1].value;
        });
        return d.promise();
    }
});

setInterval(function(){
  customStoreSQLHDD.load();

  $("#C7000TempChart").dxChart({
      dataSource: customStoreC7000Temp,
      commonSeriesSettings: {
          argumentField: 'measuredatetime'
      },
      series: [
          { name: 'SQL HDD', valueField: 'value', showInLegend: false }
      ]
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
    subvalues: [70,100],
    valueIndicator: {type: 'rangeBar'},
    //subvalueIndicator: {type: 'textCloud'},
    rangeContainer: {
        ranges: [
            { startValue: 0, endValue: 40,  color: 'green' },
            { startValue: 60,   endValue: 100, color: 'red' }
        ]
    }
});

}, 5000);
